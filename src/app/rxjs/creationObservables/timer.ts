import { of, timer, concatMap, interval } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export class timerSamples {
  public sample1() {
    // This could be any observable
    const source = of(1, 2, 3);

    timer(3000)
      .pipe(concatMap(() => source))
      .subscribe(console.log);
  }

  public sample2() {
    // Build a Date object that marks the
    // next minute.
    const currentDate = new Date();
    const startOfNextMinute = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes() + 1
    );

    // This could be any observable stream
    const source = interval(1000);

    const result = source.pipe(takeUntil(timer(startOfNextMinute)));

    result.subscribe(console.log);
  }

  public sample3() {
    const source = interval(1000); // 每秒发出一个值
    const notifier = timer(5000); // 5秒后发出一个值

    const result = source.pipe(takeUntil(notifier));

    result.subscribe(
      (value) => console.log(value),
      (error) => console.error(error),
      () => console.log('Complete')
    );
    //only return: 0, 1, 2, 3, complete. no 4, I guess when the time goes to 5th sec, at that exactly moment, the notifier has been sent out, so it stoped the '4'.
  }

  public sample4() {
    const source = interval(1000);
    const notifier = timer(50000);
    //Experience: I found this case print very unexpected results, that is: 0, 1, 2, 3, (and then silently wait for a long time) Complete.
    //I rebuilt the project, refreshed the page, but the unexpected print was still there. Finally, I opened a new tab in chrome, and then
    //the magic happened, it printed correct results in console.
    //What a fucked up bug of chrome, REMARK it. If you tried everything you possibly can, and the result is still not what you want, try to open it in a new tab in chrome!!!

    const result = source.pipe(takeUntil(notifier));

    // Use an observer instead of separate callbacks
    const observer = {
      next: (value: number) => console.log(value),
      error: (error: any) => console.error(error),
      complete: () => console.log('Complete'),
    };

    result.subscribe(observer);
  }

  public sample5() {
    timer(0, 1000).subscribe((n) => console.log('timer', n));
    interval(1000).subscribe((n) => console.log('interval', n));
  }
}
