## 基于对象

*JavaScript是一门`基于对象`的语言，因为JavaScript中大部分内容都是由对象构成的，可以说JavaScript就是建立在对象上的语言。
JavaScript中的对象是指一组组属性和值组成的集合*

#45

## 属性描述符

- configurable：是否可配置（delete，defineObject是否可以设置成功）
- enumerable：是否可枚举（forin，Object.keys()）
- value：值
- writable：是否可改写
- set：set访问器
- get：get访问器

数据属性：`value+writable`；访问器属性：`set+get`；**一次只能有4个属性**

## 关于继承

JavaScript中使用原型和原型链实现继承。

虽然在ES6中引入了class关键字，但那只是function的一个语法糖，其本质还是prototype。

JavaScript中每个对象都有一个__proto__属性 ，__proto__指向了内存中另外一个对象，我们就把这个对象称之为对象的原型对象。
![236162019-f107b0bb-b9fe-48b8-a22b-60d2f3461d4d](https://github.com/user-attachments/assets/7f7dba10-55bc-4afa-98e5-8bca65207929)

### 继承的实现

在开发中，我们不推荐直接修改对象的`__proto__`属性实现继承，而是要使用构造函数。

所有现代的js引擎都深度优化了获取和设置对象属性的行为，因为这些都是一些常见的js操作。这些优化都是基于引擎对对象结构的认识上。当更改了对象的内部结构（如添加或删除该对象或其原型链中的对象的属性），将会使一些优化失效。修改`__proto__`属性实际上改变了继承结构本身，这可能是最具破坏性的修改。

### new 做了什么？

- 首先，创建了一个空白对象 `
- 将 DogFactory 的 prototype 属性设置为 dog 的原型对象，这就是给 dog 对象设置原型对象的关键一步
- 再使用 dog 来调用 DogFactory，这时候 DogFactory 函数中的 this 就指向了对象 dog，然后在 `DogFactory` 函数中，利用 this 对对象 dog 执行属性填充操作，最终就创建了对象 dog。

```jsx
function DogFactory(type,color){
    this.type = type
    this.color = color
}
var dog = new DogFactory('Dog','Black')

=======

var dog = {}
dog.__proto__ = DogFactory.prototype
DogFactory.call(dog,'Dog','Black')
```

### 实现继承

使用prototype挂载属性，因为对象的__proto__指向了构造函数的prototype。

```jsx
function DogFactory(type,color){
    this.type = type
    this.color = color
    //Mammalia
}
DogFactory.prototype.constant_temperature = 1
var dog1 = new DogFactory('Dog','Black')
var dog2 = new DogFactory('Dog','Black')
var dog3 = new DogFactory('Dog','Black')
```