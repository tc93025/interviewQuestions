// 时间分片功能，可以深究一下，每执行到yield中止，将主线程的控制权交还，不阻塞流程
function ts (gen) {
  if (typeof gen === 'function') gen = gen()
  if (!gen || typeof gen.next !== 'function') return
  return function next() {
    const res = gen.next()
    if (res.done) return
    setTimeout(next)
  }
}
console.log(ts(function *(){yield 1}))