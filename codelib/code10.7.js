// 1.Object.create
function create(obj) {
  function Fun() { }
  Fun.prototype = obj;
  return new Fun()
}

console.log(create({ a: 13 }).a) // 13

// 2.防抖函数
function debounce(fn, wait) {
  let timer = null;

  return function () {
    let context = this, args = arguments;

    if (timer) {
      clearTimeout(timer)
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
debounce(function (params) {
  console.log('234', params)
}, 1000)

// 3.节流函数
function throttle(fn, delay) {
  let curTime = Date.now();

  return function () {
    let context = this, args = arguments, nowTime = Date.now()

    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args)
    }
  }
}

// 4.手写call
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error")
  }

  // 获取参数
  let args = [...arguments].slice(1), result = null;
  // 判断context是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result
}

// 5.手写apply
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    console.error("type error")
  }

  let result = null;
  context = context || window;
  context.fn = this;

  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  return result
}

// 6.手写bind
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    console.error("type error")
  }

  let args = [...arguments].slice(1), fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    )
  }
}

// 7.函数的柯里化实现
function curry(fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length;

  args = args || [];

  return function () {
    let subArgs = args.slice(0);

    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i])
    }

    if (subArgs.length >= length) {
      return fn.apply(this.subArgs)
    } else {
      return curry.call(this, fn, subArgs)
    }
  }
}

// es6 实现克里化
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}

// 8.手写深拷贝
function deepCopy(object) {
  if (!object || typeof object !== "object") return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] =
        typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }

  return newObject;
}