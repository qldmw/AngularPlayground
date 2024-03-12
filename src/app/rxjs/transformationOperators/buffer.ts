import { fromEvent, interval, buffer } from 'rxjs';

//official description:
//Collects values from the past as an array, and emits that array only when another Observable emits.
export class BufferSamples {
  //buffer
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const intervalEvents = interval(1000);
    const buffered = intervalEvents.pipe(buffer(clicks));
    buffered.subscribe((x) => console.log(x));
  }
}
