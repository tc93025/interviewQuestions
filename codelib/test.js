// let a = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(123), 10000)
// })
// let b = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(13), 1000)
// })


// a.then((res) => {
//   console.log('res', res)
// })

// setTimeout(() => {
//   b.then((res) => {
//     console.log('res2', res)
//   })
// }, 0);

// MutationObserver优先级比promise高，虽然在一开始就被定义，但实际上是触发之后才会被添加到microtask队列中，所以先输出了promise
// 同理 resolve以后才会放入微任务

// Promise.resolve()

// var myPow = function (x, n) {
//   if (n < 0) {
//       x = 1 / x
//   }
//   if (n = 0) {
//       return 1
//   }
//   console.log(n-1)

//   // return x * myPow(x, n - 1)
// };

console.log(4&2)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                