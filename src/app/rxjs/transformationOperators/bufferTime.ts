import { fromEvent, bufferTime, interval } from 'rxjs';

//official description:
//Collects values from the past as an array, and emits those arrays periodically in time.
export class BufferTimeSamples {
  //bufferTime
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const buffered = clicks.pipe(bufferTime(1000));
    buffered.subscribe((x) => console.log(x));
  }

  //bufferTime's second parameter,
  public sample2() {
    const clicks = fromEvent(document, 'click');
    const buffered = clicks.pipe(bufferTime(2000, 5000));
    buffered.subscribe((x) => console.log(x));
  }

  //bufferTime's second parameter,
  public sample3() {
    const intervalEvents = interval(1000);
    //Every 5 seconds, emit the events from the next 2 seconds
    const buffered = intervalEvents.pipe(bufferTime(2000, 5000));
    buffered.subscribe((x) => console.log(x));
  }
}
