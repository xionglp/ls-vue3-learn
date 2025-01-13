class Depend {
  constructor() {
    this.reactiveFns = []
  }

  // 收集依赖
  addDepend(fn) {
    this.reactiveFns.push(fn)
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
const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

watchFn(function foo() {
  console.log("foo: ", obj.name)
  console.log("foo: ", obj.age)
  console.log("foo function")
})
watchFn(function bar() {
  console.log("bar: ", obj.name)
  console.log("bar: ", obj.age)
  console.log("bar function")
})

// 修改obj对象的属性
console.log("name、age发生变化")
obj.name = "kobe"
obj.age = 41
dep.notify()
