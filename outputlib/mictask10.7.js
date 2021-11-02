// 1.promise
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
// 124


// 2.promise
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);

// promise1
// 1 Promise{<resolved>: resolve1}
// 2 Promise{<pending>}
// resolve1

// 3.promise settimeout
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');

// start promise1 timer1 promise2 timer2

// 4.时间循环概述，js的执行是单线程的，这是为了保证用户交互的一致性，否则不同线程对比如dom的操作可能不一致影响用户体验。
// 而h5提出了webWorker允许js开子线程也是要求完全受主线程控制，不能操作dom。
// 那么为了解决单线程的问题，然后为了处理异步任务使其不阻塞页面，js把任务分为同步任务和异步任务，同步就顺着执行下去，
// 异步任务分为宏任务和微任务，每当主线程的任务执行产生的异步任务分别放入任务队列中。
// 主线程的宏任务执行完成后，将微任务队列微任务放入主线程执行。
// 执行完后将下一个宏任务放入执行栈开启下一轮执行

// 当执行来自任务队列中的任务时，在每一次新的事件循环开始迭代的时候运行时都会执行队列中的每个任务。在每次迭代开始之后加入到队列中的任务需要在下一次迭代开始之后才会被执行.
// 每次当一个任务退出且执行上下文为空的时候，微任务队列中的每一个微任务会依次被执行。不同的是它会等到微任务队列为空才会停止执行——即使中途有微任务加入。换句话说，微任务可以添加新的微任务到队列中，并在下一个任务开始执行之前且当前事件循环结束之前执行完所有的微任务。

// 5.浏览器渲染过程