import {
  fromEvent,
  concatMap,
  mergeMap,
  interval,
  timer,
  concat,
  take,
  map,
  mapTo,
  mergeAll,
  mergeMapTo,
  delay,
  of,
  concatAll,
  switchMap,
} from 'rxjs';

//official description:
//Maps each value to an Observable, then flattens all of these inner Observables using switchAll.
export class SwitchMapSamples {
  //switchMap
  public sample1() {
    const switched = of(1, 2, 3).pipe(switchMap((x) => of(x, x ** 2, x ** 3)));
    switched.subscribe((x) => console.log(x));
  }

  //switchMap
  public sample2() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(switchMap(() => interval(1000)));
    result.subscribe((x) => console.log(x));
  }
}
