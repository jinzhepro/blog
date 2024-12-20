## Number

数值分为整数和浮点数，可使用十进制，八进制，十六进制和科学计数法来表示。

```jsx
var a = 1
var b = 1.1
var c = 067
var d = 0xA
var e = 1.23e7

console.log(a,b,c,d,e)
```

### NaN

表示一个非数值，任何涉及到NaN的操作都会返回NaN，NaN与任何值都不相等（包括自身）。

## BigInt

`BigInt`用于表示任意长度的整数。

`number`类型无法安全地表示大于 $$2^{53}-1$$（即`9007199254740991`），或小于$$-2^{53}-1$$的整数。

> bigInt类型与number类型不兼容，不能直接计算。
> 

```jsx
const bigInt = BigInt(1234567890123456789012345678901234567890);
```

## String

String类型必须被括在引号里。

```jsx
let str = "Hello";  // 双引号
let str2 = 'Single quotes are ok too';  // 单引号
let phrase = `can embed another ${str}`;  // 反引号
```

## Boolean

只有两个值：`true`和`false`

## Null

表示无，空，未知。

## Undefined

表示未被赋值。

```jsx
var str;
console.log(str) // undefined
```

## Symbol

表示唯一的标识符。

```jsx
let user = {
  name: "zhang"
};
var id = Symbol('id');

user[id] = 1

console.log(user, user[id], user.id)
```

### 隐藏属性

### 全局Symbol.for

通过相同的`description`获取相同的`symbol`。

```jsx
let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它
let idAgain = Symbol.for("id");
console.log( id === idAgain );
```

### Symbol.keyFor

和`Symbol.for`相反，通过`symbol`获取`description`。

> Symbol.keyFor只针对Symbol.for创建的symbol有效。
> 

```jsx
let id = Symbol.for('id')
let name = Symbol('id')
console.log(Symbol.keyFor(id),Symbol.keyFor(name))
```

- Symbol.hasInstance ：当其他对象使用instanceof 判断是否为该对象的实例时会调用。
- Symbol.isConcatSpeardable：使用cancat()是否展开。
- Symbol.species：可以手动设置衍生对象的构造函数。
- Symbol.match：调用match() 时。
- Symbol.search：调用search()时。
- Symbol.replace：调用replace()时.
- Symbol.split：调用split()时。
- Symbol.iterator：调用遍历器方法。
- Symbol.toPrimitive：对象转换为原始类型时调用。
- Symbol.toStringTag ：调用toString()时可自定义
- Symbol.unscopables ：被with排除的属性。

## Object 类型

储存数据集合和更复杂的实体。

## 6种类型判断方法

### typeof

只能识别原始类型和引用类型。`typeof x`和 `typeof(x)`相同，这里的括号不是`typeof`的一部分。它是数学运算分组的括号。

> JavaScript 编程语言的设计错误，JavaScript 在存储数据的时候会转换成32位存储，null的标签类型和object一样都是000 链接。
> 

```jsx
console.log(typeof 1)
console.log(typeof '1')
console.log(typeof undefined)
console.log(typeof true)
console.log(typeof Symbol())
console.log(typeof null)
console.log(typeof [])
console.log(typeof {})
console.log(typeof console)
console.log(typeof console.log)
```

### constructor

指向当前实例的构造函数。

```jsx
let str = 'Covid-19'
console.log(str.constructor)

let number = 123
console.log(number.constructor)

let arr = [1,2,3]
console.log(arr.constructor)

let fun = function(){}
console.log(fun.constructor)

let obj = {}
console.log(obj.constructor)
```

### instanceof

在原型链上查找其是否为构造函数实例。

> 原始类型类型在JavaScript中是没有原型链的。所以 instanceof 操作符对原始类型来说只会返回false。
> 

```jsx
let arr = [1,2,3]
console.log(arr instanceof Array)

let fun = function(){}
console.log(fun instanceof Function)

let obj = {}
console.log(obj instanceof Object)

let number = 123;
console.log(number instanceof Number);

let string = '123'
console.log(number instanceof String);

let boolean = true
console.log(number instanceof Boolean);
```

### Object.prototype.toString

可以很好的判断数据类型，封装成方法即可。

```jsx
console.log(Object.prototype.toString({}))
console.log(Object.prototype.toString.call({}))
console.log(Object.prototype.toString.call(1))
console.log(Object.prototype.toString.call('1'))
console.log(Object.prototype.toString.call(true))
console.log(Object.prototype.toString.call(function(){}))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(undefined))
console.log(Object.prototype.toString.call(/123/g))
console.log(Object.prototype.toString.call(new Date()))
console.log(Object.prototype.toString.call([]))
```

### 鸭子类型检测

通过检查自身特定属性来判断

```jsx
let str = 'Covid-19'
console.log(str.toLowerCase())

let arr = [1,2,3]
console.log(arr.join(','))
```

### 等比较

```jsx
console.log(null === null)

console.log(undefined === void 0)
```