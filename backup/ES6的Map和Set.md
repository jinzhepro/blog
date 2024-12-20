众所周知，数组的长度越长，查询的代价就越大。假如说现在要查询员工的薪资，需要有一个员工名字的数组，根据员工名字的位置在查找薪资。
所以ES6推出了Map和Set，无论数据多大，查找速度也不会慢。

## Map

Map可以理解为存放键值对的数组，像是一个二维数组：

```jsx
var map = new Map([
  ["zhang", 60],
  ["wang", 80],
  ["li", 23],
]);

// 也可以之间创建一个空的Map
var newMap = new Map();
```

Map有以下方法：

```jsx
//添加键值对
map.set("zhou", 57);

// 通过key获取value
map.get("zhang"); //60

// 判断key是否存在
map.has("li"); //true

//删除key,对应value也会删除
map.delete("wang");
map.has("wang"); // false
```

*重复的set后面会覆盖前面的*

## Set

Set也是key的集合，但是不存储value，*不允许相同的key存在*

```jsx
var Set = new Set([1, 2, 3, 4, 5]);

// 也可以直接创建一个空的Set
var newSet = new Set();
```

Set有以下方法：

```jsx
set.add(3); //[1,2,3,4,5]
set.add("4"); // [1,2,3,4,5,'4']
// 注意4和'4'不是相同的类型

// 删除key
set.delete(3); // [1,2,4,5,'4']
```

**ES6新增了一种iterable类型，Array、Map、Set都属于这种类型**

### 具有iterable的集合可以使用for...of来遍历

```jsx
var Arr = [1, 2, 3, 4, 5];
var Map = new Map([
  ["zhang", 12],
  ["wang", 56],
]);
var Set = new Set([1, 2, 3, 4, 5, 6, 7]);

//遍历Array
for (var i of Arr) {
  console.log(i);
}

// 遍历Set
for (var i of Set) {
  console.log(i);
}

// 遍历Map
for (var i of Map) {
  console.log(i[0] + "=" + i[1]);
}
```

### for...of 和for...in的区别

for...in其实把Array当成是一个对象。通过把index当成属性进行遍历，所以你会看到下面这种情况：

```jsx
var arr = [1, 2, 3, 4, 5];
arr.name = "zhang";

for (var i in arr) {
  consloe.log(i); // 1,2,3,4,5,'zhang'
}
```

*for... of不会出现这种情况，他只会循环数组本身*

### 具有iterable的集合也可以使用ES5.1的forEach方法，该方法接受一个回调函数，每次迭代都会执行该函数

```jsx
var Map = new Map([['zhang',23],['wang',57],['li',45]])
Map..forEach(function(ele,key,arr){
    console.log(ele)
})

var Set = new Set([1,2,3,4,5])
Set.forEach(function(ele,key,arr){
    console.log(ele) // 因为Set数据结构没有key,所以key其实就等于ele
})

var Arr = [1,2,3,4,5]
Arr.forEach(function(ele){
    console.log(ele) // 数组也可不传其他参数
})
```