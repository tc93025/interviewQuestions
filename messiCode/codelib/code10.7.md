// 1.Object.create
function create(obj) {
  function Fun() { }
  Fun.prototype = obj;
  return new Fun()
}

console.log(create({ a: 13 }).a) // 13

// 2.防抖函数
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
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
// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
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

async function loadImageBySequence(urls) {

  let result = []
  for (url of urls) {
      let tmp = await Promise.resolve(loadImage(url))
      result.push(tmp)
  }

  return result
}

async function loadImageByGroup(urls, groupSize) {

  let i = 0
  while (i <= urls.length) {
      let urlArr = urls.splice(i, groupSize)
      let tmp = await Promise.all(urlArr.map(i => Promise.resolve(loadImage(i))))
      result.push(tmp)
      i = i + groupSize
  }

  return result

}

async function loadImageByConcurrent(urls, concurrency) {
  let queue = []
  let result = []
  let current = 0

  function re() {
      if (queue.length >= 1) {
          for (let url of queue) {
              current++
              if (current < concurrency) {
                  Promise.resove(loadImage(url)).then((data) => {
                      current--
                      result.push(data)
                      re()
                  })
              } 
          }
      } else {
          let tmp = concurrency - concurrency.length
          queue.push(...urls.splice(i, tmp))
          re()
      }
  }

  re()
}
// Test case

function isLoaded(image) {

  if (!(img instanceof Image)) return false;

  return image.complete && image.naturalHeight !== 0

}

function loadImage(src) {
  return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = (data) => {
          resolve(data)
      }
      img.onerror = () => {
          reject()
      }
      img.src = src
  })
}

async function test() {

  const urls = ['/xxx/a.png', '/xxx/b.png', '/xxx/c.png', '/xxx/d.png', '/xxx/e.png']

  const response1 = await loadImageBySequence(urls);

  const response2 = await loadImageByGroup(urls, 2);

  const response3 = await loadImageByConcurrent(urls, 2);

  let success = response1.map(isLoaded);

  let failed = response1.length - success;

  console.log(`Load image by sequence: ${success} success, ${failed} failed`);

  let success = response2.map(isLoaded);

  let failed = response1.length - success;

  console.log(`Load image by group: ${success} success, ${failed} failed`);

  let success = response3.map(isLoaded);

  let failed = response1.length - success;

  console.log(`Load image by concurrent: ${success} success, ${failed} failed`);

};

test();


function compare(version1, version2) {
  let result1 = []
  let result2 =[]

  new Reg(/\^(\w)+.(\w)+.(\w)+-(\w)+.(\w)/).reg(version1,(...letters)=>{
      result1.push(letters)
      console.log(letters)
  })
  // new Regex(/\^(\w)+.(\w)+.(\w)+-(\w)+.(\w)/).reg(version1,(...letters)=>{
  //     result1.push(letters)
  // })

}

let result = compare('1.0.0', '1.0.1');                     // result = -1

  result = compare('10.2.0-alpha.1', '10.2.0-alpha.1');   // result = 0

  result = compare('10.2.0-beta', '10.2.0-alpha');        // result = 1

  result = compare('3.1.1-1', '3.1.1-2');                 // result = -1
  str.split(/×|-|÷|[+]/);

```
  // 寄生组合继承实现

  function Parent(value) {
      this.value = value;
  }

  Parent.prototype.getValue = function() {
      console.log(this.value);
  }

  function Child(value) {
      Parent.call(this, value)
  }

  Child.prototype = Object.create(Parent.prototype, {
      constructor: {
          value: Child,
          enumerable: false, // 不可枚举该属性
          writable: true, // 可改写该属性
          configurable: true // 可用 delete 删除该属性
      }
  })

  const child = new Child(1)
  child.getValue();
  child instanceof Parent;
  复制代码寄生组合继承的模式是现在业内公认的比较可靠的 JS 继承模式，ES6 的 class 继承在 babel 转义后，底层也是使用的寄生组合继承的方式实现的。
```

instanceof 本质上是通过原型链查找来判断继承关系的，因此只能用来判断引用类型，对基本类型无效，我们可以手动实现一个简易版 instanceof：
function _instanceof (obj, Constructor) {
    if (typeof obj !== 'object' || obj == null) return false;
    let construProto = Constructor.prototype;
    let objProto = obj.__proto__;
    while (objProto != null) {
        if (objProto === construProto) return true;
        objProto = objProto.__proto__;
    }
    return false;
}

let obj = {
  a: 11,
  b: {
      b: 22,
      c: {
          D: 33
e: [44,55,66]
      }
  }
};
console.log(JSON.stringify(obj) === json2string(obj))

实现两个方法：
  1、将对象a1转换为a2
  2、将a2转换为a1
    const a1 = {
      "b": {
        "c": {
          "d": ['d1','d2','d3']
        }
      },
      "e": ['e1','e2'],
      "f": {
        "g": 'g1'
      }
    }
    const a2 = {
      "b.c.d[0]": "d1",
      "b.c.d[1]": "d2",
      "b.c.d[2]": "d3",
      "e[0]": "e1",
      "e[1]": "e2",
      "f.g": "g1"
    }

  http1.1：浏览器缓存、长链接一个tcp链接可以传多个http请求以及响应 新增状态错误码 如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
  添加host头：没加会报400 多台主机host共享一个域名 用于定位主机 断点续传和在请求头添加range头域

  http2.0: 只支持https，多路复用一个tcp链接 之前是文本格式 现在是二进制格式 header头部压缩，cache一个header fields表做差量更新 服务器主动推送 多路复用是并行的

  https 利用ca证书来验证信息，然后发一个从ca证书中解析得到的公钥加密的一个随机吗key发给服务器 服务器私钥解密后 使用随机码进行对称加密 对称加密性能比较好

  《link




  样式隔离的方式 less sass提供$name属性加前缀 cssmodule通过loader将类名编写为哈希字符串  使用web components编写为shadowdom css injs vue里的scopedcss

  hash：跟整个项目的构建相关，构建生成的文件hash值都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。
chunkhash：根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值。
contenthash：由文件内容产生的hash值，内容不同产生的contenthash值也不一样。

强缓存
我们知道，强缓存主要是通过http请求头中的Cache-Control和Expire两个字段控制。Expire是HTTP1.0标准下的字段，在这里我们可以忽略。我们重点来讨论的Cache-Control这个字段。
一般，我们会设置Cache-Control的值为“public, max-age=xxx”，表示在xxx秒内再次访问该资源，均使用本地的缓存，不再向服务器发起请求

我们可以看到，如果不是强制刷新，而且请求头带上了if-modified-since和if-none-match两个字段，则先判断etag，再判断last-modified。当然，如果你不喜欢这种策略，也可以自己实现一个。

- for serviceWorker 缓存 ，是一个服务器和客户端之间的代理服务器，适合做不同服务器之间的复杂数据共享，以及离线缓存数据（配合CacheStroage），可以通过postMessage給主进程共享数据
- 可以使用一个workbox这个框架

n个小朋友 胃口为 [3,4,5,6,8]
g个食物 热量 [3,4,6,7,8]
食物热量不小于小朋友可以喂

g.sort((a,b)=> a-b)
n.sort((a,b)=>a-b)
for(let i=0;i<n.length;i++){
  for(let j=i;j<g.length;j++){
    if(g>i){
      g.splice(i,1)
      return
    }
  }
}
内存泄漏

useEffect useStates 条件执行 跨函数 维系更高层作用域

给定一个经过编码的字符串，返回它解码后的字符串。编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。e.g. s = "3[a2[c]]", 返回 “accaccacc”