// 快速排序
function quickSort(arr) {

  let cur = arr[arr.length - 1]
  const left = arr.filter((v, i) => v <= cur && v !== arr[i])
  const right = arr.filter(v => v > cur)

  return [...quickSort(left), cur, ...quickSort(right)]
}

// 冒泡

// this指向
obj = {
  func() {
    const arrowFunc = () => {
      console.log(this._name)
    }

    return arrowFunc
  },

  _name: "obj",
}

obj.func()()

func = obj.func
func()()

obj.func.bind({ _name: "newObj" })()()

obj.func.bind()()()

obj.func.bind({ _name: "bindObj" }).apply({ _name: "applyObj" })()

// obj
// undefined
// newObj
// undefined
// bindObj