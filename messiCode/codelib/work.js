const testWorker = new Worker('./worker.js')
setTimeout(_ => {
  testWorker.postMessage({})
  testWorker.onmessage = function (ev) {
    console.log(ev.data)
  }
}, 5000)

// worker.js
self.onmessage = function () {
  const start = performance.now()
  while (performance.now() - start < 1000) {}
  postMessage('done!')
}

