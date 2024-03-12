import { fromEvent, interval, bufferToggle, EMPTY } from 'rxjs';

//official description:
//Collects values from the past as an array. Starts collecting only when opening emits,
//and calls the closingSelector function to get an Observable that tells when to close the buffer.
export class BufferToggleSamples {
  //bufferToggle
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const openings = interval(1000);
    const buffered = clicks.pipe(
      bufferToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY))
    );
    buffered.subscribe((x) => console.log(x));
  }
}
