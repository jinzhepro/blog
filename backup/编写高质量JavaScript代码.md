本文知识点是摘自于[[汤姆大叔博客](http://www.cnblogs.com/TomXu/)](http://www.cnblogs.com/TomXu/)，自己记录理解并学习

## 书写可维护的代码

软件开发是一个熵增的过程，随着软件结构越来越复杂，代码维护就变得举步维艰，当你发现bug并理解修复他是最好的。否则，等你转移到其他任务，一段时间后再回来看你的代码，就需要：

- 花时间学习和理解问题
- 花时间学习和理解解决问题的代码

如果是特别大的公司，开发人员并不是同一个人。因此，必须降低理解代码的成本，我们应该去开发更激动人心的功能，而不是花几小时几天去维护遗留代码。

随着应用功能的增强，我们也许会面临以下问题：

- bug是暴露的
- 要添加新功能
- 应用可能要适应新的环境（比如新的浏览器）
- 应用要改变用途
- 甚至要重新再来（换一种架构或是用另一种语言编写）

由于这些变化，我们不得不编写高质量，高性能，可维护的代码以减小我们维护的成本。

这意味着我们的代码要：

- 可读的
- 一致的
- 可预测的
- 看上去是同一个人写的（？？？）
- 已记录

## 全局变量的问题

全局变量的问题意味着你的应用和页面上的所有代码都共享这些全局变量，如果遇到同名但是不同功能的变量，冲突在所难免。
可能遇到的变量冲突的情况：

- 第三方js库
- 不同的人写的代码

假如有的第三方库里面有的叫做apply的方法，而你又定义了一个apply的变量，那这个第三方库的apply就嗝屁了！

由于JavaScript的特性，我们不自觉的就会创建出全局变量，首先，你可以甚至不需要声明就可以使用变量，第二，JavaScript有隐含的全局概念，意味着你不声明的任何变量都会成为全局变量：

```jsx
function() {
  a = "1";
}
console.log(window.a); // "1"
```

此段代码中a并没有声明，但是莫名出现了一个全局变量a，解决方法是始终使用`var`声明变量：

```jsx
function() {
  var a = 1;
}
consloe.log(window.a); // "undefined"
```

另一种反例就是使用任务链的情况下：

```jsx
function() {
  var a = b = "1";
}
console.log(a, b); // "undefined" "1"

```

看起来变量b又成为了全局变量，这并不是我们想要的，最理想的方法是使用“，”分隔进行声明，并且可以做一些基础操作：

```jsx
function() {
  var a, b = "1";
}
function() {
  var a = 1, b = 2, sum = a + b;
}
console.log(a, b); // "undefined" "undefined"
```

这样的好处：

- 提供了单一的地方寻找变量
- 防止变量在声明之前使用

这样我们就避免了全局变量污染。

*在ES5严格模式下未声明变量就使用会抛出一个错误*

*在ES6中我们可以使用`let`关键字声明避免全局变量污染*

隐式全局变量和明确定义全局变量还是有一点区别的：

- 通过`var`定义的全局变量不能通过`delete`操作符删除
- 无`var`定义的全局变量可以通过`delete`操作符删除

这表明，在技术上，隐式全局变量并不是真正的全局变量，但它们是全局对象的属性。属性是可以通过delete操作符删除的，而变量是不能的：

```jsx
var global_var = "1";
global_novar = "2";
(function(){
  global_fromfun = "3";
})()

// 试图删除
delete global_var;
delete global_novar;
delete global_fromfun;

// 测试
typeof global_var; // "string"
typeof global_novar; // "undefined"
typeof global_fromfun; // "undefined"
```

## 预解析（hoisting）

在JavaScript中，你可以在函数的任何位置声明变量，执行起来并无差异，这是因为函数在执行时的预解析，讲变量提升到该作用域顶部：

```jsx
var a = "2";
function() {
  alert(a); // "undefined"
  var a = "1";
  alert(a); // "1"
}
```

在这个例子中，你会以为第一个alert会是“2”，实际上并非如此，因为函数预解析时检查到当前作用域内有一个变量a，所以将它提升到当前作用域的顶部，类似于下面这个例子：

```jsx
var a = "2";
function() {
  var a;
  alert(a); // "undefined"
  a = "1";
  alert(a); // "1"
}
```

*为了完整，我们再提一提执行层面的稍微复杂点的东西。代码处理分两个阶段，第一阶段是变量，函数声明，以及正常格式的参数创建，这是一个解析和进入上下文 的阶段。第二个阶段是代码执行，函数表达式和不合格的标识符（为声明的变量）被创建。但是，出于实用的目的，我们就采用了”hoisting”这个概念， 这种ECMAScript标准中并未定义，通常用来描述行为。*

## for循环

通常的循环形式如下：

```jsx
for(var i = 0; i < arr.length; i++){
  //
}
```

这种循环的不足之处在于每次循环都要去取数组的长度，这会降低代码的执行效率，尤其当你的数组不是一个纯数组，而是一个HTMLCollection的时候，这意味着你每次循环都会去查询DOM，而查询DOM是相当费时的。

这就是为什么要缓存数组长度的原因：

```jsx
for(var i = 0, arrLength = arr.length; i < arrLength; i++){
	//
}
```

在此过程中，你只检索了一次长度。

*现如今V8引擎已相当强大，如果你是普通数组，他会在编译时把你确定不变的代码移到循环外，其实差距不大，如果涉及到NodeLiist，建议还是要缓存一下。*

如果你还在纠结，也可以写成下面这个样子:

```jsx
for(var i = arr.length; i > 0; i--){
  //
}
```

## for-in循环

for-in循环主要用在非数组对象的遍历上，也被称为“枚举”。

从技术上讲，for-in也可以循环数组，但这是不推荐的，因为如果对象数组被自定义的功能增强，就可能发生逻辑错。而且，for-in循环顺序是不能保证的。

有一个很重要的方法：`hasOwnProperty()`，这个方法的作用是判断是不是对象本身的属性，可用于去除原型链上的属性：

```jsx
// 对象
var man = {
   hands: 2,
   legs: 2,
   heads: 1
};

// 在代码的某个地方
// 一个方法添加给了所有对象
if (typeof Object.prototype.clone === "undefined") {
   Object.prototype.clone = function () {};
}

// 有hasOwnProperty方法
for (var i in man) {
   if (man.hasOwnProperty(i)) { // 过滤
      console.log(i, ":", man[i]);
   }
}
//  控制台显示结果
hands : 2
legs : 2
heads : 1

// 反例
// 无hasOwnProperty方法
for (var i in man) {
   console.log(i, ":", man[i]);
}
// 控制台显示结果
hands : 2
legs : 2
heads : 1
clone: function() // 原型链上的方法被“枚举”出来
```

另外一种使用hasOwnProperty()的形式是取消Object.prototype上的方法。像是：

```jsx
for (var i in man) {
   if (Object.prototype.hasOwnProperty.call(man, i)) { // 过滤
      console.log(i, ":", man[i]);
   }
}
```

*严格来说，不使用hasOwnProperty()并不是一个错误。根据任务以及你对代码的自信程度，你可以跳过它以提高些许的循环速度。但是当你对当前对象内容（和其原型链）不确定的时候，添加hasOwnProperty()更加保险些。*

## Switch

你可以通过类似下面形式的switch语句增强可读性和健壮性：

```jsx
var inspect_me = 0,
   result = '';
switch (inspect_me) {
  case 0:
    result = "zero";
    break;
  case 1:
    result = "one";
    break;
  default:
    result = "unknown";
}
```

这个简单的例子中所遵循的风格约定如下：

- 每个case和switch对齐（花括号缩进规则除外）
- 每个case中代码缩进
- 每个case以break清除结束
- 避免贯穿（故意忽略break）。如果你非常确信贯穿是最好的方法，务必记录此情况，因为对于有些阅读人而言，它们可能看起来是错误的。
- 以default结束switch：确保总有健全的结果，即使无情况匹配。

## 避免隐式类型转换

JavaScript的变量在比较的时候会隐式类型转换。这就是为什么一些诸如：false == 0 或 “” == 0 返回的结果是true。为避免引起混乱的隐含类型转换，在你比较值和表达式类型的时候始终使用===和!==操作符。

```jsx
var zero = 0;
if (zero === false) {
   // 不执行，因为zero为0, 而不是false
}

// 反面示例
if (zero == false) {
   // 执行了...
}
```

有的观点认为这是没有必要的。然而JSlint要求严格相等，因为你可以清楚的看到变量的类型和值，以降低代码阅读时的精力消耗，不需要再去纠结“==”是故意的还是一个疏漏。

## 避免eval()

此方法接受任意字符串作为参数，并作为JavaScript来处理,，使用eval()也带来了安全隐患，因为被执行的代码（例如从网络来）可能已被篡改

“eval是魔鬼”

如果你绝对必须使用eval()，你可以考虑使用new Function()代替，有几个好处是代码将会在函数的局部作用域执行，并且不会污染全局变量

考虑下面这个例子，这里仅a作为全局变量污染了命名空间:

```jsx
console.log(typeof a);    // "undefined"
console.log(typeof b); // "undefined"
console.log(typeof c); // "undefined"

var jsstring = "var a = 1; console.log(a);";
eval(jsstring); // logs "1"

jsstring = "var b = 2; console.log(b);";
new Function(jsstring)(); // logs "2"

jsstring = "var c = 3; console.log(c);";
(function () {
   eval(jsstring);
}()); // logs "3"

console.log(typeof a); // number
console.log(typeof b); // "undefined"
console.log(typeof c); // "undefined"
```

## parseInt()下的数值转换

使用parseInt()你可以从字符串中获取数值，该方法接受另一个基数参数，这经常省略，但不应该。当字符串以“0”开头的时候就有可能会出问题，例如，部分时间进入表单域，在ECMAScript 3中，开头为”0″的字符串被当做八进制处理了，但这已在ECMAScript 5中改变了。为了避免矛盾和意外的结果，总是指定基数参数。

```jsx
var month = "06",
    year = "09";
month = parseInt(month, 10);
year = parseInt(year, 10);
```

## 编码规范

建立和遵循编码规范是很重要的，这让你的代码保持一致性，可预测，更易于阅读和理解。一个新的开发者加入这个团队可以通读规范，理解其它团队成员书写的代码，更快上手干活。

要记住，建立和坚定不移地遵循规范要比纠结于规范的细节重要的多。

## 缩进

代码没有缩进基本上就不能读了。唯一糟糕的事情就是不一致的缩进，因为它看上去像是遵循了规范，但是可能一路上伴随着混乱和惊奇。重要的是规范地使用缩进。

使用Tab和空格都无所谓，最重要的是保持一致！

## 空格

适合使用空格的地方包括：

- for循环分号分开后的的部分：如for (var i = 0; i < 10; i += 1) {...}
- for循环中初始化的多变量(i和max)：for (var i = 0, max = 10; i < max; i += 1) {...}
- 分隔数组项的逗号的后面：var a = [1, 2, 3];
- 对象属性逗号的后面以及分隔属性名和属性值的冒号的后面：var o = {a: 1, b: 2};
- 限定函数参数：myFunc(a, b, c)
- 函数声明的花括号的前面：function myFunc() {}
- 匿名函数表达式function的后面：var myFunc = function () {};

空格使用的一点不足就是增加了文件的大小，但是压缩无此问题。

## 命名规范

- 以`大驼峰式命名法`命名`构造函数`：new Person()
- 以`小驼峰式命名法`命名`函数和方法`：getFirstName()
- 以`全大写字母`命名`常量`：var PI = 3.14
- 以`_开头`命名`私有变量`：_getFirst: function(){...}

还有另外一个完全大写的惯例：全局变量名字全部大写。全部大写命名全局变量可以加强减小全局变量数量的实践，同时让它们易于区分。

## 注释

你必须注释你的代码，即使不会有其他人向你一样接触它。通常，当你深入研究一个问题，你会很清楚的知道这个代码是干嘛用的，但是，当你一周之后再回来看的时候，想必也要耗掉不少脑细胞去搞明白到底怎么工作的。

最重要的习惯，然而也是最难遵守的，就是保持注释的及时更新，因为过时的注释比没有注释更加的误导人。