## 函数是一种特殊的对象

## 一等公民

JavaScript中函数可赋值，可传参，可作为返回值，可有属性

**如果某个编程语言中的函数，可以和其他数据类型做一样的事，函数就是一等公民。**

## V8如何管理函数？

使用栈来管理函数调用

因为被调用者的生命周期始终小于调用者（后进先出），函数在执行过程中，其内部的临时变量会按照执行顺序被压入到栈中
![236159088-3ae53f01-e012-454b-8172-1064e2a78f81](https://github.com/user-attachments/assets/e262a2ec-fab3-4713-a766-7989d4986436)

函数在执行过程中，其内部的临时变量会按照执行顺序被压入到栈中 
![236158980-0343fa41-3b65-4351-98cc-027e9a81fba2](https://github.com/user-attachments/assets/fdd9c648-976c-4ff6-859e-fb259a2fd146)

## V8如何解析函数？

在V8内部，会为函数对象添加两个隐藏属性（`name`，`code`），以提供调用功能

- name默认值为anonymous
- code是以字符串的形式存储在内存中
    
![236159269-1a029d31-c1d1-4560-a633-14a1776f919e](https://github.com/user-attachments/assets/47d870ff-9ae7-442e-9a22-02b3f3a1ffb1)


## 闭包

因为foo函数的返回值bar包含了foo的作用域及变量，所以test在foo函数执行之后并不会销毁
![236159431-9a2fbb82-78d3-4b0e-8e0c-2bf84c8b622a](https://github.com/user-attachments/assets/cfaec19d-f72e-4f63-9473-7e77ed5b81b0)

## 值传递

JavaScript中所有函数的参数都是按值传递的。

```jsx
var obj1 = {
	value: 10
}
function change(obj){ //创建一个obj私有变量，相当于 var obj = obj1
	obj.value = 20 // 此时 obj 和 obj1 指向了同一个堆地址
	obj = { // 将obj指向了另外一个堆地址，此时 obj 和 obj1 无任何关系。如果为引用传递那obj1也将改变
		value: 30
	}
	return obj
}
var obj2 = change(obj1)
console.log(obj1) // 20
console.log(obj2) // 30
```

## 函数声明与函数表达式

*在V8内部，处理函数声明和处理函数表达式是两种不同的方式。*
![236160748-08ec9c53-7cd4-4454-9f17-4d35362ffcbc](https://github.com/user-attachments/assets/8082f5aa-b756-48a0-98cd-a79fbbe879df)


### 函数声明

函数声明本质是语句
![236160831-0760e894-24e8-491b-a993-23b964683a65](https://github.com/user-attachments/assets/90dae7b0-0c01-4810-a697-6ea92085cea7)

### 函数表达式

函数表达式本质是表达式，**表达式是在执行阶段被执行**

```jsx
foo()
var foo = function (){
    console.log('foo')
}

===

var foo = undefined  // 被默认为undefined
foo = function (){
    console.log('foo')
}
```

## 作用域

```jsx
var name = '极客时间'
var type = 'global'
function foo(){
    var name = 'foo'
    console.log(name) // 极客时间
    console.log(type) //  global ？？？
}
function bar(){
    var name = 'bar'
    var type = 'function'
    foo()
}
bar()
```

函数声明会在编译阶段提升到作用域中（变量提升），变量x被默认为undefined，foo函数被保存在内存中以供使用。
![236161078-feb8c1cc-c45e-4123-9ce3-5ce5303ef466](https://github.com/user-attachments/assets/80f27f6b-304a-46fa-9648-f859e994bb40)
