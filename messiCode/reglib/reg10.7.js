
// // 1. var s1 = "get-element-by-id"; 给定这样一个连字符串，写一个function转换为驼峰命名法形式的字符串 getElementById
// function translate1(s) {
//   let a = new RegExp(`-\\w`, 'g')
//   return s.replace(a, function (x) {
//     return x.slice(1).toUpperCase()
//   })
// }
// s = 'get-element-by-id'
// // console.log(translate1(s))

// // 2. 获取url上参数 
// // 指定参数名称，返回该参数的值 或者 空字符串
// // 不指定参数名称，返回全部的参数对象 或者 {}
// // 如果存在多个同名参数，则返回数组
// function getUrlParams(url, key) {

//   let r = new RegExp(/(?:\?|&)(\w+?)=(\w+)(&*?)/, 'g')
//   // console.log(r)
//   let s = url.matchAll(r)
//   let a = [...s]
//   let query = a.reduce((result, i) => {
//     let tmpkey = i[1]
//     if (result[tmpkey]) {
//       if (Array.isArray(result[tmpkey])) {
//         result[tmpkey] = [...result[tmpkey], i[2]]
//       } else {
//         result[tmpkey] = [result[tmpkey], i[2]]
//       }
//     } else {
//       result[tmpkey] = i[2]
//     }
//     return result
//   }, {})

//   if (key) {
//     return query[key]
//   } else {
//     return query
//   }
// }

// console.log(getUrlParams('https://testpdjm.jd.com/pavilion/poseidon/bamboo/hour_buy/index.html?inviterId=9&shopId=11725056&shopId=13424', "shopId"))

// // 3.(?=exp)从后往前后面匹配exp一组 (?!exp) 从前往后匹配后面不是exp (?<=exp) 从后往前匹配前面是exp一组 (?<!exp)从前往后匹配前面不是exp

// let price = '123456789'
// let priceReg = /(?!^)(?=(\d{3})+$)/g

// console.log(price.replace(priceReg, ',')) // 123,456,789

// // 4.在输入的过程中不断优化手机号 123 => 123
// // 1234 => 123-4
// // 12345 => 123-45
// // 123456 => 123-456
// // 1234567 => 123-4567
// // 12345678 => 123-4567-8
// // 123456789 => 123-4567-89
// // 12345678911 => 123-4567-8911

// const formatMobile = (mobile) => {
//   return String(mobile).slice(0,11)
//       .replace(/(?<=\d{3})\d+/, ($0) => '-' + $0)
//       .replace(/(?<=[\d-]{8})\d{1,4}/, ($0) => '-' + $0)
// }

// console.log(formatMobile(18379836654))

// console.log("==XX=============================".match(/X(.+)+X/))

// console.log("nfa not".match(/nfa|nfa not/))

console.log("something".match(/\s*(.*?)\s*/))
console.log("something".match(/^\s*(.*?)\s*$/))