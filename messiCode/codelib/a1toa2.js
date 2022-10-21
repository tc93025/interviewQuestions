// 实现两个方法：
//   1、将对象a1转换为a2
//   2、将a2转换为a1
const a1 = {
  "b": {
    "c": {
      "d": ['d1', 'd2', 'd3']
    }
  },
  "e": ['e1', 'e2'],
  "f": {
    "g": 'g1'
  }
}


const transform1 = (data) => {
  let result = {}

  const re = (data, result, name) => {

    switch (typeof data) {
      case "object":
        if (data === null) {
          return data
          break
        }

        if (Array.isArray(data)) {

          data.forEach((i, index) => re(i, result, `${name}[${index}]`))
          break
        }

        Object.keys(data).forEach((i) => {
          re(data[i], result, name ? `${name}.${i}` : `${i}`)
        })
        break;
      default:
        result[name] = data
        break

    }
  }

  re(data, result, '')
  return result

}

// console.log(transform1(a1))

const a2 = {
  "b.c.d[0]": "d1",
  "b.c.d[1]": "d2",
  "b.c.d[2]": "d3",
  "e[0]": "e1",
  "e[1]": "e2",
  "f.g": "g1"
}

const transform2 = (data) => {

  let result = {}

  const re = (res, keys, value) => {
    let operateArr = [...keys]
    let now = operateArr.shift()
    let next = operateArr
    if (next.length >= 1) {
      // res[now] = re(res[now], next, value)
      if (!res[now]) {
        res[now] = {}
      }

      re(res[now], next, value)
    }

    if (next.length === 0) {
      console.log(now)
      let tmp = now.split(/\[|\]/)
      if (tmp.length > 1) {
        console.log(res)
        if (res[tmp[0]]) {
          res[tmp[0]].push(value)
        } else {
          res[tmp[0]] = [value]
        }

      } else {
        res[tmp[0]] = value
      }

    }

  }

  Object.keys(data).forEach(key => {
    re(result, key.split('.'), data[key])
  })

  return result
}

// console.log(transform2(a2))

// 3、console.log(JSON.stringify(obj) === json2string(obj))
const json2string = (obj) => {
  let str = ''
  switch (typeof obj) {
    case 'object':
      if (Array.isArray(obj)) {
        return `${obj.map(i => json2string(i)).join(',')}`
      } else {
        const arr = Object.entries(obj)
        const arrMap = arr.map(([key, value]) => {
          
          return `"${key}":${json2string(value)}`
        })

        return `{${arrMap.join(',')}}`
      }

    default:
      return str += `"${obj}"`
  }
}

console.log(JSON.stringify(a2) === json2string(a2))
