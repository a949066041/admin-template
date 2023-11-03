import { Observable } from 'rxjs'

export function testRxjs() {
  // stream$尾部的$是表示当前这个变量是个ovservable
  const stream$ = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next([1, 2, 3])
    }, 500)
    setTimeout(() => {
      subscriber.next({ a: 1000 })
    }, 1000)
    setTimeout(() => {
      subscriber.next('end')
    }, 3000)
    setTimeout(() => {
      subscriber.complete()
    }, 4000)
  })

  // 启动流
  const subscription = stream$.subscribe({
    complete: () => console.log('done'),
    next: v => console.log(v),
    error: () => console.log('error'),
  })
}
