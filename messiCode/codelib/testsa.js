Promise.MyAll = (arr)=>{
  let count = 0;
  let res = [];
  let length = arr.length
  
  return new Promise((resolve,reject)=>{
      for(let i = 0;i<length;i++){
          Promise.resolve(arr[i]).then((data)=>{
              res[i] = data
              count++
              if(count === length){
                  resolve(res)
              }
          }).catch((e)=>{
              reject(e)
          })
      }
  })
}

Promise.MyAll([promise1,promise2,promise3]).then((res)=>{
  console.log(res) // 1,2,3
})

// es5实现es6 寄生组合继承
function parent (age) {
  this.age = age
}

parent.prototype.say = function () {
  console.log(this.age)
}

function sub (age, value) {
  parent.call(this, age)
  this.value = value
}

sub.prototype = Object.create(parent.prototype, {
  constructor: {
      value: sub,
      enumerable: false,
      writable: true,
      configurable: true
  }
})

// Boolean、Null、Undefined、Number、String、Symbol、Object、BigInt（ES6新出的）.


// 当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（object）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype）。该原型对象也有一个自己的原型对象（__proto__），层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。