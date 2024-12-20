this和切换执行上下文有关，取决于函数执行时刻，调用函数时所使用的引用。

## 8种函数

```jsx
// 普通函数
function(){
	...
}
// 箭头函数
() => {
	...
}
// 生成器函数
function* (){
	...
}
// 类中的函数
class A{
	function(){
		...
	}
}
// 类
class B{
	constructor(){
		...
	}
}
// 异步的普通函数
async function(){
	...
}
// 异步的箭头函数
async () => {
	...
}
// 异步的生成器函数
async function* (){
	...
}
```

## this的机制

- [[thisMode]]私有属性：
- global：当this为undefined时，取全局对象（普通函数）
- lexical：从上下文中取值（箭头函数）
- strict：严格按照调用取值，可能为null或undefined（class或严格模式）
- [[thisBindingStatus]]私有属性：当函数创建新的上下文环境（例如函数各种调用方式）时，会根据新的[[thisMode]] 来标记[[thisBindingStatus]]
- 类似于链表结构