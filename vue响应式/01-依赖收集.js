const obj = {
  name: "xionglp",
  age: 18
}

// 设置一个专门执行响应式函数的一个函数
const reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
  fn()
}

const foo = function foo() {
  console.log("foo: ", obj.name)
  console.log("foo: ", obj.age)
  console.log("foo function")
}
watchFn(foo)
watchFn(function bar() {
  console.log("bar: ", obj.name)
  console.log("bar: ", obj.age)
  console.log("bar function")
})

// 修改obj对象的属性
console.log("-----------name发生变化-----------")
obj.name = "kobe"
obj.age = 41
reactiveFns.forEach(fn => {
  fn()
})
