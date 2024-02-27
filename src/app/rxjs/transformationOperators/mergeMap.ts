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
} from 'rxjs';

//official description:
//Maps each value to an Observable, then flattens all of these inner Observables using mergeAll.
export class MergeMapSamples {
  //mergeMap
  public sample1() {
    const letters = of('a', 'b', 'c');
    const result = letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
    );

    result.subscribe((x) => console.log(x));
  }

  //mergeMap
  public sample2() {
    const first = timer(0).pipe(map((val) => 'a'));
    const second = timer(500).pipe(map((val) => 'b'));
    const third = timer(1000).pipe(map((val) => 'c'));

    // Combine Observables
    const letters = concat(first, second, third);

    const result = letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
    );

    result.subscribe((x) => console.log(x));
  }

  //concatMap vs mergeMap
  public sample3() {
    const source$ = of(1, 2, 3);

    console.log('Using concatMap:');
    source$
      .pipe(
        concatMap((value) =>
          of(`concatMap Value: ${value}`).pipe(delay(Math.random() * 1000))
        )
      )
      .subscribe((result) => console.log(result));

    // console.log('Using mergeMap:');
    // source$
    //   .pipe(
    //     mergeMap((value) =>
    //       of(`mergeMap Value: ${value}`).pipe(delay(Math.random() * 1000))
    //     )
    //   )
    //   .subscribe((result) => console.log(result));

    //concatMap 的结果中每个值都会按顺序输出，而 mergeMap 的结果则是混合在一起的，因为它们是并发处理
  }

  //concatMap vs mergeMap
  public sample4() {
    const first = timer(0).pipe(map((val) => 'a'));
    const second = timer(500).pipe(map((val) => 'b'));
    const third = timer(5000).pipe(map((val) => 'c'));

    // Combine Observables
    const letters = concat(first, second, third);

    const result = letters.pipe(
      concatMap((x) =>
        interval(1000).pipe(
          map((i) => x + i),
          take(10)
        )
      )
    );
    //concatMap vs mergeMap，更换之后会阻塞

    result.subscribe((x) => console.log(x));
  }

  //mergeMap vs mergeMapTo
  public sample5() {
    const first = timer(0).pipe(map((val) => 'a'));
    const second = timer(500).pipe(map((val) => 'b'));
    const third = timer(1000).pipe(map((val) => 'c'));

    const source$ = concat(first, second, third);
    const inner$ = of('Fixed Observable').pipe(delay(1000));

    // 使用 mergeMap
    source$
      .pipe(mergeMap((value) => of(`Value: ${value}`).pipe(delay(1000))))
      .subscribe((result) => console.log(result));

    // // 使用 mergeMapTo
    source$.pipe(mergeMapTo(inner$)).subscribe((result) => console.log(result));

    // 使用最新推荐的方式 mergeMap(()=>result)
    // source$
    //   .pipe(mergeMap(() => inner$))
    //   .subscribe((result) => console.log(result));
  }
}
