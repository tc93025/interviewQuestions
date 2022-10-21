// all
// Promise.myAll()返回的肯定是一个promise对象，所以可以直接写一个return new Promise((resolve, reject) => {})(这应该是一个惯性思维)
// 遍历传入的参数，用Promise.resolve()将参数"包一层"，使其变成一个promise对象
// 关键点是何时"决议"，也就是何时resolve出来，在这里做了计数器（count），每个内部promise对象决议后就将计数器加一，并判断加一后的大小是否与传入对象的数量相等，如果相等则调用resolve()，如果任何一个promise对象失败，则调用reject()方法。
// 一些细节：
// 官方规定Promise.all()接受的参数是一个可遍历的参数，所以未必一定是一个数组，所以用Array.from()转化一下
// 使用for…of进行遍历，因为凡是可遍历的变量应该都是部署了iterator方法，所以用for…of遍历最安全

Promise.all = function (iterator) {
    let count = 0//用于计数，当等于len时就resolve
    let len = iterator.length
    let res = []//用于存放结果
    return new Promise((resolve, reject) => {
			for (let i in iterator) {
					Promise.resolve(iterator[i])//先转化为Promise对象
							.then((data) => {
									res[i] = data;
									if (++count === len) {
											resolve(res)
									}
							})
							.catch(e => {
									reject(e)
							})
			}
    })
}

let promise1 = Promise.resolve(3);
let promise2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 'foo');
});
let promise3 = 42;

Promise.all([promise1, promise2, promise3]).then(function (values) {
    console.log(values);
});

// race 核心思路：谁先决议那么就返回谁，所以将all的计数器和逻辑判断全部去除掉就可以了。
Promise.race = function (iterators) {
    return new Promise((resolve, reject) => {
        for (const p of iterators) {
            Promise.resolve(p)
                .then((res) => {
                    resolve(res)
                })
                .catch(e => {
                    reject(e)
                })
        }
    })

}

// then方法只是监听了promise的状态，如果当前promise状态已变动 则执行handleCallback，如果没有变动，则吧callback push到this.callbacks里，在下一次执行中继续检测

// 3.allsettled
Promise.allSettled = function (promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(res => {
        return { status: 'fulfilled', value: res }
    }, error => {
        return { status: 'rejected', reason: error }
    })))
}

function flat(params) {
    let result = []
    console.log(params)
  
    if (Array.isArray(params)) {
      for (let i = 0; i < params.length; i++) {
        result = [...result, ...flat(params[i])]
      }
    } else {
      result.push(params)
    }
  
  
    return Array.from(new Set(result))
  }
  
  console.log(flat([1, 32, 4, [4, 5, 7], 8]))