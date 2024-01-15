import { interval, take, range, concat } from 'rxjs';

//official description:
//Concatenates multiple Observables together by sequentially emitting their values,
//one Observable after the other.
export class ConcatSamples {
  public sample1() {
    const timer = interval(1000).pipe(take(4));
    const sequence = range(1, 10);
    const result = concat(timer, sequence);
    result.subscribe((x) => console.log(x));
  }

  public sample2() {
    const timer1 = interval(1000).pipe(take(10));
    const timer2 = interval(2000).pipe(take(6));
    const timer3 = interval(500).pipe(take(10));

    const result = concat(timer1, timer2, timer3);
    result.subscribe((x) => console.log(x));
  }

  public sample3() {
    const timer = interval(1000).pipe(take(2));

    concat(timer, timer) // concatenating the same Observable!
      .subscribe({
        next: (value) => console.log(value),
        complete: () => console.log('...and it is done!'),
      });
  }
}
