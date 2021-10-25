// 1.大数相加
let a = "90071.3435";
let b = "12345.23";

function bigNumberAdd(a, b) {
  let pp = [a.split('.')[0], b.split('.')[0]]
  let pn = [a.split('.')[1], b.split('.')[1]]
  let maxPp = Math.max(pp[0].length, pp[1].length)
  let maxPn = Math.max(pn[0].length, pn[1].length)
  let a1 = pp[0].padStart(maxPp, '0')
  let b1 = pp[1].padStart(maxPp, '0')
  let a2 = pn[0].padEnd(maxPn, '0')
  let b2 = pn[1].padEnd(maxPn, '0')

  let res1 = `${a1}.${a2}`
  let res2 = `${b1}.${b2}`

  // console.log(res1, res2)

  return add(res1, res2)
}

function add(a, b) {
  let res = '';
  let f = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] !== '.') {
      let result = parseInt(a[i]) + parseInt(b[i]) + f
      f = Math.floor(result / 10)
      let sum = result % 10
      console.log(a[i], b[i], i, result, f)

      res = sum + res
    } else {
      res = '.' + res
    }
  }

  if (f == 1) res = '1' + res

  return res
}

console.log(bigNumberAdd(a, b))

// 2.