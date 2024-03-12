import { fromEvent, bufferCount, interval } from 'rxjs';

//official description:
//Collects values from the past as an array, and emits that array only when its size reaches bufferSize.
export class BufferCountSamples {
  //bufferCount
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const buffered = clicks.pipe(bufferCount(2));
    buffered.subscribe((x) => console.log(x));
  }

  //bufferCount's second parameter, startBufferEvery
  public sample2() {
    const clicks = fromEvent(document, 'click');
    const buffered = clicks.pipe(bufferCount(2, 1));
    buffered.subscribe((x) => console.log(x));
  }

  //bufferCount's second parameter, startBufferEvery
  public sample3() {
    const intervalEvents = interval(1000);
    const result = intervalEvents.pipe(bufferCount(3, 1));
    result.subscribe((x) => console.log(x));
  }
}
