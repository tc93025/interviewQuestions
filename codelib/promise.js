function Promise(fn) {
  let state = "pending"
  let value = null
  const callbacks = []

  this.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled, onRejected, resolve, reject
      })
    })
  }

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }

    const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    const next = state === 'fulfilled' ? callback.resolve : callback.reject

    if (!cb) {
      next(value)
      return
    }

    let ret;

    try {
      ret = cb(value)
    } catch (error) {
      callback.reject(error)
    }
    callback.resolve(value)
  }

  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') return

      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        const { then } = newValue
        if (typeof then === 'function') {
          // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
          //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
          then.call(newValue, resolve, reject)
          return
        }
      }
      state = 'fulfilled';
      value = newValue
      handelCb()
    }

    setTimeout(fn, 0)
  }

  function reject(error) {
    const fn = () => {
      if (state !== 'pending') return

      if (error && (typeof error === 'object' || typeof error === 'function')) {
        const { then } = error
        if (typeof then === 'function') {
          then.call(error, resolve, reject)
          return
        }
      }
      state = 'rejected';
      value = error
      handelCb()
    }
    setTimeout(fn, 0)
  }

  function handleCb() {
    while (callbacks.length) {
      const fn = callbacks.shift();
      handle(fn)
    }
  }
  try {
    fn(resolve, reject)
  } catch (ex) {
    reject(ex);
  }
}