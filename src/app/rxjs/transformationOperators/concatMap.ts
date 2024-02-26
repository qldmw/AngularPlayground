import {
  fromEvent,
  concatMap,
  interval,
  take,
  map,
  concatAll,
  concatMapTo,
  delay,
  of,
} from 'rxjs';

//official description:
//Maps each value to an Observable, then flattens all of these inner Observables using concatAll.
export class ConcatMapSamples {
  //concatMap
  public sample1() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(concatMap((ev) => interval(1000).pipe(take(4))));
    result.subscribe((x) => console.log(x));
  }

  //concatAll
  public sample2() {
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(map(() => interval(1000).pipe(take(4))));
    const firstOrder = higherOrder.pipe(concatAll());
    firstOrder.subscribe((x) => console.log(x));
  }

  //concatMapTo, will be deprecated in V9
  public sample3() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(concatMapTo(interval(1000).pipe(take(4))));
    result.subscribe((x) => console.log(x));
  }

  public sample4() {
    const source$ = of(1, 2, 3);
    const inner$ = of('Fixed Observable').pipe(delay(1000));

    // 使用 concatMap
    // source$
    //   .pipe(concatMap((value) => of(`Value: ${value}`).pipe(delay(1000))))
    //   .subscribe((result) => console.log(result));

    // // 使用 concatMapTo
    // source$
    //   .pipe(concatMapTo(inner$))
    //   .subscribe((result) => console.log(result));

    // 使用最新推荐的方式 ConcatMap(()=>result)
    source$
      .pipe(concatMap(() => inner$))
      .subscribe((result) => console.log(result));
  }
  //concatMap 操作符是在一个 Observable 发出的每个值上应用一个映射函数，然后将这个函数返回的 Observable
  //串联起来并发出值。它保持了这些 Observable 的顺序，并且只有当前一个 Observable 完成时，才会订阅下一个
  // Observable。
  //concatMapTo 操作符则是将每个源 Observable 的值投射成同一个 Observable，然后将这些 Observable 串联
  //起来并发出值。它不关心源 Observable 发出的值是什么，而是为每个源 Observable 都使用指定的 Observable。
  //同样，它保持了顺序，只有当前一个 Observable 完成时，才会订阅下一个 Observable。
}
