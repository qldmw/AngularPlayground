import { timer, of, delay, startWith, map, combineLatest } from 'rxjs';

//official description:
//Whenever any input Observable emits a value, it computes a formula using
//the latest values from all the inputs, then emits the output of that formula.
export class CombineLastestSamples {
  public sample1() {
    const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    const secondTimer = timer(5000, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    const combinedTimers = combineLatest([firstTimer, secondTimer]);
    combinedTimers.subscribe((value) => console.log(value)); //the first invocation will be triggered in 5 seconds.
  }

  public sample2() {
    const observables = {
      a: of(1).pipe(delay(1000), startWith(0)), //consider to remove the startWith to demonstrate.
      b: of(5).pipe(delay(5000), startWith(0)),
      c: of(10).pipe(delay(10000), startWith(0)),
    };
    const combined = combineLatest(observables);
    combined.subscribe((value) => console.log(value));
  }

  public sample3() {
    const observables = [1, 5, 10].map((n) =>
      of(n).pipe(
        delay(n * 1000), // emit 0 and then emit n after n seconds
        startWith(0)
      )
    );
    const combined = combineLatest(observables);
    combined.subscribe((value) => console.log(value));
  }

  public sample4() {
    const weight = of(70, 72, 76, 79, 75);
    const height = of(1.76, 1.77, 1.78);
    const bmi = combineLatest([weight, height]).pipe(
      map(([w, h]) => {
        // console.log('w:' + w + ',h:' + h);
        return w / (h * h);
      })
    );
    bmi.subscribe((x) => console.log('BMI is ' + x));
  }
}
