class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  // 收集依赖
  addDepend(fn) {
    if(fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.addDepend(reactiveFn)
    }
  }

  // 通知
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

const obj = {
  name: "xionglp",
  age: 18
}

// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}

// 封装一个函数: 负责通过obj的key获取对应的depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据obj对象，找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key，找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }
  return dep
}

// 方案一: Object.defineProperty() -> vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    set(newValue) {
      value = newValue
      // 监听属性的变化,set方法中执行通知收集的依赖
      // dep.notify()
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get() {
      const dep = getDepend(obj, key)
      dep.depend()
      // dep.addDepend(reactiveFn)
      return value 
    }
  })
})

// 方案二: new Proxy() -> vue3


watchFn(function foo() {
  console.log("foo function")
  console.log("foo: ", obj.name)
  console.log("foo: ", obj.age)
  console.log("foo: ", obj.age)
})
// watchFn(function bar() {
//   console.log("bar function")
//   console.log("bar:", obj.age + 10)
// })

// 修改obj对象的属性
console.log("----------------------")
// obj.name = "kobe"
obj.age = 30

