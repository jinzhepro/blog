Proxy可以创建一个对象的代理，实现对操作的劫持。

[[MDN-Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

```jsx
// 定义一个普通对象
var obj = {
  a: 100000,
}
// 定义一个处理器对象
var handler = {
	// 拦截属性读取 如属性值为不可写或不可配置时会抛出Error
  get(target, prop, receiver) { // 目标对象 属性名 Proxy对象
    console.log(target, prop, receiver);
    return target[prop] // 返回一个值
  },
	// 拦截属性设置 如属性值为不可写或不可配置时会抛出Error
  set(target, prop, value, receiver) { // 目标对象 属性名 值 Proxy对象
    console.log(target, prop, value, receiver);
    target[prop] = value
    return true // 返回true未成功，严格模式下返回false会抛出Error
  }

	// 拦截delete操作
	deleteProperty(){
}
var proxy = new Proxy(obj, handler)
console.log(proxy.a);
console.log(proxy.a = 1,obj);
```