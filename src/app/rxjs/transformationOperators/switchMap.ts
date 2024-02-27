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

// 1. concatMap
// 详细解释：

// concatMap 操作符是按顺序处理每个源 Observable 发出的值，并且在每个值上应用一个映射函数。它会等待前一个内部 Observable 完成后，再订阅下一个内部 Observable。因此，它保持了原始值的顺序，并确保在处理下一个值之前完全处理完当前值。
// 常见使用场景：

// HTTP 请求序列化：在处理一系列需要按顺序发出的 HTTP 请求时，比如用户在表单中进行一系列步骤，每个步骤都需要等待前一个请求完成后才能进行下一步。
// 处理用户输入：当用户连续进行输入时，可能需要按顺序处理这些输入，例如在搜索框中进行自动补全搜索建议。
// 数据持久化：在处理需要按顺序保存的数据时，比如用户在表单中逐步输入数据并且需要将数据逐个保存到数据库中。
// 2. mergeMap
// 详细解释：

// mergeMap 操作符会将每个源 Observable 发出的值映射成一个内部 Observable，并且并发地处理这些内部 Observable。它不会等待前一个内部 Observable 完成，而是同时处理所有的内部 Observable。
// 常见使用场景：

// 处理并发请求：在需要同时发出多个 HTTP 请求的情况下，如同时获取用户信息、加载用户设置等。
// 处理集合：当需要处理一个集合中的每个元素，并且每个元素的处理是独立的，可以使用 mergeMap 并发地处理这些元素。
// 实时搜索：在实时搜索的情况下，用户可能会连续输入多个字符，这时可以使用 mergeMap 并发地处理每次输入的搜索请求，以便及时更新搜索结果。
// 3. switchMap
// 详细解释：

// switchMap 操作符会在每次源 Observable 发出新值时，取消之前的内部 Observable 订阅，并订阅新的内部 Observable。换句话说，它会始终只处理最新的值，忽略之前的值。
// 常见使用场景：

// 搜索建议：在用户输入搜索关键字时，可能会出现用户连续输入的情况，如果不想处理旧的搜索请求结果，可以使用 switchMap 来处理最新的搜索请求，并且取消之前的请求。
// 表单输入验证：当用户在表单中输入时，可能会连续触发验证操作，如果只关心最后一次输入的验证结果，可以使用 switchMap 来处理最新的验证请求，并且取消之前的验证请求。
// 路由导航：在处理路由导航时，可能会出现用户快速连续点击不同的链接的情况，如果只关心最后一次点击的链接，可以使用 switchMap 来处理最新的导航请求，并且取消之前的导航请求。
