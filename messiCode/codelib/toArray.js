// 1.类数组转化为数组
// 数组call方法 或apply方法
// Array.prototype.slice.call(arrayLike)
// Array.from
// Array.from(arrayLike)

// 2.字符串模版
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/

  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data)
  }

  return template
}

console.log(render('<div>{{w}}</div>', { w: 132 }))

// 3.浅拷贝 只考虑对象类型
function shallowCopy(obj) {
  if (typeof obj !== 'object') return

  let newObject = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty) {
      newObject[key] = obj[key]
    }
  }
  return newObject
}

// 深拷贝
function deepClone(obj) {
  if (map.get(target)) {
    return target;
  }
  // 获取当前值的构造函数：获取它的类型
  let constructor = target.constructor;
  // 检测当前对象target是否与正则、日期格式对象匹配
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    // 创建一个新的特殊对象(正则类/日期类)的实例
    return new constructor(target);
  }

  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }

  return newObj
}

// 4. propertyIsEnumerable() 用于判断属性的所有权，如 hasOwnProperty 获取属性后使用 propertyIsEnumerable 过滤可枚举属性
// Object.prototype.propertyIsEnumerable()
// propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性是否可枚举。
// 如果你只要考虑对象本身的属性，而不是它的原型，那么使用 Object.getOwnPropertyNames()   所以forin要加一个这个过滤原型链上继承的属性
// 或执行 hasOwnProperty() 来确定某属性是否是对象本身的属性（也能使用propertyIsEnumerable）。
// 或者，如果你知道不会有任何外部代码干扰，您可以使用检查方法扩展内置原型。


// 5. for in 和for of的区别 forin遍历的是除了Symbol外的所有可枚举属性，forof是使用迭代器遍历树

// 6.渲染十万条数据
// window.requireAnimationFrame(function(){}) 让回调跟着屏幕刷新节奏进行，保证在刷新间隔中更新屏幕
// DocumentFragment，将一个一个element放入fragment中不会引起回流 再一次push到dom中
// 时间分片
// 根据rowheight和scrollTop 计算可见空间渲染