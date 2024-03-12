import { fromEvent, bufferWhen, interval } from 'rxjs';

//official description:
//Collects values from the past as an array. When it starts collecting values, it calls a function
// that returns an Observable that tells when to close the buffer and restart collecting.
export class BufferWhenSamples {
  //bufferWhen
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const buffered = clicks.pipe(
      bufferWhen(() => interval(1000 + Math.random() * 4000))
    );
    buffered.subscribe((x) => console.log(x));
  }
}
