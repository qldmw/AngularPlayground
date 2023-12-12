import { of, from } from 'rxjs';

export class ofSamples {
  public sample1() {
    of(10, 20, 30).subscribe({
      next: (value) => {
        console.log('next:', value);
      },
      error: (err) => console.log('error:', err),
      complete: () => console.log('the end'),
    });
  }

  public sample2() {
    of([1, 2, 3]).subscribe({
      next: (value) => console.log('next:', value),
      error: (err) => console.log('error:', err),
      complete: () => console.log('the end'),
    });
  }

  public sample3() {
    //of vs from
    //This is a test for this description:
    //Unlike from, it does not do any flattening and emits each argument in whole as a separate next notification.
    const data = [1, [2, [3, 4]], 5]; //[1, 2, [3, 4], 5];

    const observable = of(data);
    observable.subscribe(
      (value) => console.log(value),
      (error) => console.error(error),
      () => console.log('of Complete')
    );

    const observable2 = from(data);
    observable2.subscribe(
      (value) => console.log(value),
      (error) => console.error(error),
      () => console.log('from Complete')
    );
  }
}
