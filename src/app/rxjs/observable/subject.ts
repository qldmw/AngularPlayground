import { Observable, Subject, from } from 'rxjs';

export class subjectSamples {
  public sample1() {
    let counter = 0;
    let obs = new Observable<any>((observer) => {
      observer.next(Math.random());
      console.log('triggered:' + counter++);
      observer.next(Math.random());
    });

    obs.subscribe((res) => {
      console.log('subscription a :', res); //subscription a :0.2859800202682865
    });

    obs.subscribe((res) => {
      console.log('subscription b :', res); //subscription b :0.694302021731573
    });
  }

  public sample2() {
    let obs = new Subject();

    obs.subscribe((res) => {
      console.log('subscription a :', res); // subscription a : 0.91767565496093
    });

    obs.subscribe((res) => {
      console.log('subscription b :', res); // subscription b : 0.91767565496093
    });

    obs.next(Math.random());
  }

  public sample3() {
    let sub = new Subject();
    let obs = sub.asObservable();

    obs.subscribe((res) => {
      console.log('subscription a :', res); //subscription a :0.2859800202682865
    });

    obs.subscribe((res) => {
      console.log('subscription b :', res); //subscription b :0.694302021731573
    });

    sub.next(Math.random());
  }

  public sample4() {
    let counter = 0;
    let obs = new Observable<any>((observer) => {
      observer.next(Math.random());
      console.log('triggered:' + counter++);
    });

    obs.subscribe((res) => {
      console.log('subscription a :', res); //subscription a :0.2859800202682865
    });

    obs.subscribe(); // as long as I invoked the subscribe method, it will trigger the Observable content.
  }
}
