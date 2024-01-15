import { merge, fromEvent, interval, take } from 'rxjs';

//official description:
//Flattens multiple Observables together by blending their values into one Observable.
export class MergeSamples {
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const timer = interval(1000);
    const clicksOrTimer = merge(clicks, timer);
    clicksOrTimer.subscribe((x) => console.log(x));
  }

  public sample2() {
    const timer1 = interval(1000).pipe(take(10));
    const timer2 = interval(1000).pipe(take(6));
    const timer3 = interval(1000).pipe(take(4));

    const concurrent = 2; // the argument
    const merged = merge(timer1, timer2, timer3, concurrent);
    merged.subscribe((x) => console.log(x));
  }
}
