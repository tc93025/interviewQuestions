const events = new Map()

function on(key, target, callback) {
  if (events[key]) {
    let value = events.filter(i => i.target !== target)
    value.push({ target, callback })
    events.set(key, value)
  } else {
    events.set(key, [{ target, callback }])
  }
}

function off(key, target) {
  if (events.has(key)) {
    if (events[key] instanceof Array === true) {
      events[key] = events[key].filter(i => i.target !== target)
    } else {
      events.delete(key)
    }
  }

}

function dispatch(key, data) {
  events[key].forEach(i => {
    i.callback.call(i.target, data)
  });
}

export {
  on, off, dispatch
}