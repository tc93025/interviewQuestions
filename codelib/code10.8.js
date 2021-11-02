// 1.手写new操作符
function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}
// 用法如下：
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.say = function() {
//   console.log(this.age);
// };
// let p1 = myNew(Person, "lihua", 18);
// console.log(p1.name);
// console.log(p1);
// p1.say();

// 2. promise链式调用的原理，promise.then方法一定返回一个promise，所以可以链式调用

// 3. iterator和generator
function* createIterator() {
  yield 1
  yield 2
  yield 3
}

let iterator = createIterator()
// console.log(iterator.next().value)

let createIterator2 = function* (items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i]
  }
}

// 可迭代对象具有Symbol.iterator属性，是一种与迭代器密切相关的对象。
// Symbol.iterator通过指定的函数可以返回一个作用于附属对象的迭代器。
// 在ES6中，所有的集合对象(数组、Set集合及Map集合)和字符串都是可迭代对象，这些对象中都有默认的迭代器。
// ES6中新加入的特性for-of循环需要用到可迭代对象的这些功能

let values = [1,2,3]
for(let num of values){
  console.log(1,2,3)
}
// 这段for-of循环的代码通过调用values数组的Symbol.iterator方法来获取迭代器，这一过程是在JS引擎背后完成的。
// 随后迭代器的next()方法被多次调用，从其返回对象的value属性读取值并存储在变量num中，依次为1、2和3，当结果对象的done属性值为true时循环退出，所以num不会被赋值为undefined

console.log(values[Symbol.iterator])

// 新建一个对象给Symbol.iterator属性加上生成器，即可将其变为可迭代对象
let collection = {
  items:[],
  *[Symbol.iterator](){
    for(let item of this.items){
      yield item
    }
  }
}

// 在ES6中有3种类型的集合对象：数组、Map集合与Set集合
// 为了更好地访问对象中的内容，这3种对象都内建了以下三种迭代器

// entries() 返回一个迭代器，其值为多个键值对
// values() 返回一个迭代器，其值为集合的值
// keys() 返回一个迭代器，其值为集合中的所有键名

console.log(new Array().entries)
console.log(new Set().values)
console.log(Object.keys({}))
console.log(new Object().keys) // undefined

let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let entry of colors.entries()) {
    console.log(entry);
}
for (let entry of tracking.entries()) {
    console.log(entry);
}
for (let entry of data.entries()) {
    console.log(entry);
}

// 数组和Set集合的默认迭代器是values()方法，Map集合的默认迭代器是entries()方法
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "print");
// 与使用 colors.values() 相同
for (let value of colors) {
    console.log(value);
}
// 与使用 tracking.values() 相同
for (let num of tracking) {
    console.log(num);
}
// 与使用 data.entries() 相同
for (let entry of data) {
    console.log(entry);
}

// 而WeakSet集合与WeakMap集合就没有内建的迭代器，由于要管理弱引用，因而无法确切地知道集合中存在的值，也就无法迭代这些集合了

// var divs = document.getElementsByTagName("div"); // nodelist
// for (let div of divs) {
//     console.log(div.id);
// }

// NodeList 是浏览器的DOM标准的一个类型 document的所有元素都用这个类型来表示 es6以后他的默认迭代器和数组相同

// 3.高级迭代器

//【给迭代器传递参数】
//迭代器既可以用迭代器的next()方法返回值，也可以在生成器内部使用yield关键字来生成值。
//如果给迭代器的next()方法传递参数，则这个参数的值就会替代生成器内部上条yield语句的返回值。
//而如果要实现更多像异步编程这样的高级功能，那么这种给迭代器传值的能力就变得至关重要
function *createIterator() {
  let first = yield 1;
  let second = yield first + 2; // 4 + 2
  yield second + 3; // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.next(5)); // "{ value: 8, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"

// 【在迭代器中抛出错误】　　
//　除了给迭代器传递数据外，还可以给它传递错误条件。
// 通过throw()方法，当迭代器恢复执行时可令其抛出一个错误。这种主动抛出错误的能力对于异步编程而言至关重要，也能提供模拟结束函数执行的两种方法(返回值或抛出错误)，从而增强生成器内部的编程弹性。
// 将错误对象传给throw()方法后，在迭代器继续执行时其会被抛出
function *createIterator() {
  let first = yield 1;
  let second = yield first + 2; // yield 4 + 2 ，然后抛出错误
  yield second + 3; // 永不会被执行
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.throw(new Error("Boom"))); // 从生成器中抛出了错误

// trycatch方法捕获错误后继续执行
function *createIterator() {
  let first = yield 1;
  let second;
  try {
      second = yield first + 2; // yield 4 + 2 ，然后抛出错误
  } catch (ex) {
      second = 6; // 当出错时，给变量另外赋值
  }
  yield second + 3;
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.throw(new Error("Boom"))); // "{ value: 9, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"

// 关于return 
//[注意]展开运算符与for-of循环语句会直接忽略通过return语句指定的任何返回值，只要done一变为true就立即停止读取其他的值。不管怎样，迭代器的返回值依然是一个非常有用的特性


// 【委托生成器】 合二为一
function *createNumberIterator() {
  yield 1;
  yield 2;
}
function *createColorIterator() {
  yield "red";
  yield "green";
}
function *createCombinedIterator() {
  yield *createNumberIterator();
  yield *createColorIterator();
  yield true;
}
var iterator = createCombinedIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: "red", done: false }"
console.log(iterator.next()); // "{ value: "green", done: false }"
console.log(iterator.next()); // "{ value: true, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"


// 异步编程
function run(taskDef) {
  // 创建迭代器，让它在别处可用
  let task = taskDef();
  // 启动任务
  let result = task.next();
  // 递归使用函数来保持对 next() 的调用
  function step() {
      // 如果还有更多要做的
      if (!result.done) {
          result = task.next(result.value);
          step();
      }
  }
  // 开始处理过程
  step();
}
// 两次覆盖result
run(function*() {
  let value = yield 1;
  console.log(value); // 1
  value = yield value + 3;
  console.log(value); // 4
});

