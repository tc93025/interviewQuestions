PromiseAll = function (items) {
  let count = 0
  let itemLen = items.length
  let result = []

  return new Promise((resolve, reject) => {
    for (let i = 0; i < itemLen; i++) {
      items[i].then((res) => {
        result[i] = res
        count++
        if (count === itemLen) {
          resolve(result)
        }
      }).catch((e) => {
        reject(e)
      })
    }

    // resolve(result)
  })

}


function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000);
  })
}
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000);
  })
}
PromiseAll([fn1(), fn2()]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
// Promise.all([fn1(), fn2()]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })