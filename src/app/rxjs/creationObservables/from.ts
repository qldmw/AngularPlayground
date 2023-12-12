import { from, take, asapScheduler } from 'rxjs';

export class fromSamples {
  public sample1() {
    const array = [10, 20, 30, 545];
    const result = from(array);

    result.subscribe((x) => {
      debugger;
      console.log(x);
    });
  }

  public sample2() {
    const generateDoubles = function* (seed: number) {
      let i = seed;
      while (true) {
        yield i;
        i = 2 * i; // double it
      }
    };

    const iterator = generateDoubles(3);
    const result = from(iterator).pipe(take(10));

    result.subscribe((x) => console.log(x));
  }

  public sample3() {
    console.log('start');

    const array = [10, 20, 30];
    const result = from(array, asapScheduler);

    result.subscribe((x) => console.log(x));

    console.log('end');
  }
}
