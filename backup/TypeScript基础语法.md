## 类型声明

使用 :[type] 指定变量的类型

```tsx
let a: number = 1 // 数字
let b: string = 'zhang' // 字符串
let c: boolean = true // 布尔
let d: object = {} // 对象
let e: array = [] // 数组
let f: null = null // Null
let g: undefined = undefined // Undefined
let h: void = function(){} // 空值
let i: any = [] // 表示任意类型，可以链式传播，不会对其进行类型检查
let j: unknown; // 表示不确定类型，只能赋值给unknown和any，会进行类型检测
let k: never; // 表示一个不可能出现的值，比如抛出错误，无限循环，并可以模拟只读属性
// 未声明类型的变量默认为any
let something === let something: any;
```

## 类型推论

如果没有指定类型，那么TS会按照类型推论推断出一个类型

```tsx
let myFavoriteNumber = "seven";
myFavoriteNumber = 7; // error
```

## 联合类型

表示可以取多个类型的一种

```tsx
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
// 只能访问联合类型的共有属性（类型推断）
function getLength(something: string | number): number {
  return something.toString();
}
```

## 对象类型（interface）

我们使用接口（Interfaces）来定义对象的类型。

使用任意属性时，其他属性必须为任意属性的子集，可以使用联合类型

```tsx
interface A {
  age: number, // 确定属性
  readonly name: boolean // 只读属性
  male?: number // 可选属性
  [propName: string]: string | number | boolean // 任意属性
}
let obj: A = {
  name: true,
  age: 12,
  zjang: '123',
}
```

数组类型

```tsx
let fibonacci: number[] = [1, 1, 2, 3, 5]; // 类型 + []
let fibonacci1: Array<number> = [1, 1, 2, 3, 5]; // 数组泛型
interface NumberArray {
  [index: number]: number;
}
let fibonacci2: NumberArray = [1, 1, 2, 3, 5]; // 接口(类数组)
```

## 函数类型

### 函数声明

```tsx
function sum(x: number = 123, y?: number): number {
  // 校验输入和输出
  return x + y;
}
sum(1, 2);
// 可设置默认值
// 可选参数后不允许再出现必须参数
```

### 函数表达式

```tsx
let sum: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
sum(1, 2);
// TS中=>表示的是函数定义，左边输入类型，右边输出类型
```

### 接口定义

```tsx
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```tsx
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// TS会优先从最前面的函数定义开始匹配，所以要把精确匹配放在前面
```

## 类型断言

可以手动指定一个值的类型：值 as 类型

### 将联合类型断言为其中一个类型

```tsx
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
// 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误，比如执行了一个本不是它自己的方法。
```

### 将父类断言为更为具体的子类

```tsx
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}
function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```

### 将任何一个类型断言为 any

```tsx
window.foo = 1; // error
(window as any).foo = 1; // √
```

### 将 any 断言为一个具体的类型

```tsx
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom = getCacheData('tom') as Cat;
tom.run();
// getCacheData可能是是一个第三方库，不确定他的返回类型，当我们在使用时
```

### 断言的限制-兼容

```tsx
interface A {
  name: string;
}
interface B {
  name: string;
  run(): void;
}
let tom: B = {
  name: "Tom",
  run: () => {
    console.log("run");
  },
};
let animal: A = tom; // √
// 若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A
// 同理，若 B 兼容 A，那么 A 能够被断言为 B，B 也能被断言为 A
```

### 双重断言

```tsx
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}
function testCat(cat: Cat) {
  return (cat as any as Fish);
}
let cat = {
  run() {
    console.log(1);
  }
}
testCat(cat).swim()
// 这是非常危险的，可能导致运行时错误
```

## 类实现接口implements

```tsx
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface { //
  currentTime: Date;
  setTime(d: Date) {
  this.currentTime = d;
}
constructor(h: number, m: number) {}
}
```

## 类修饰符static、public、private、protected

```tsx
class Person {
  protected name: string // 行为类似private，但只可继承
  constructor(name: string){
    this.name = name
  }
}
class Zhang extends Person {
  constructor(name: string) {
    super(name)
  }
  static a = 'a' // 全局属性，创建全局变量
  public b = 'b' // 默认共有属性，内部外部都可访问
  private c = 'c' // 私有属性，外部不可访问
}
Zhang.a // a
new Zhang('zhang').b // b
new Zhang('zhang').c // error!
new Zhang('zhang').name // error!
new Person('zhang').name // error!
```

## 抽象类abstract

```tsx
abstract class Person {
  private name: string // 行为类似private，但只可继承
  constructor(name: string){
    this.name = name
  }
  call(){
    console.log('call')
  }
  abstract show(): void
}
class Zhang extends Person {
  constructor(name: string) {
    super(name)
  }
  show(){
    console.log('show')
  }
  bind(){
    console.log('bind')
  }
}
let zhang: Person // 允许创建一个抽象类型的引用
zhang = new Person('zhang') // error! 不允许实例化抽象类
zhang = new Zhang('zhang') // 可以实例化派生类
zhang.call()
zhang.show()
zhang.bind() // error! 没有该方法
```

## 泛型

要求传入的类型和返回的类型一致

```tsx
interface A {
  (arg: T): T
}
let fun: A
fun(1)
// 将泛型接口当做整体类型的一个接口
interface B<T> {
  (arg: T): T
}
let fun: B<number>
fun("string") // error! 直观的看到类型
fun(123) // √
// 泛型约束
interface A {
  length: number
}
function a<T extends A>(arg: T): T{
  console.log(arg.length)
  return arg
}
a(123) // error! 参数arg必须符合接口A的规范
a([1,2,3]) // √
```