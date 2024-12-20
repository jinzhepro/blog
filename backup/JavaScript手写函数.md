## 手写一个new

```jsx
function create() {
  // 创建一个空对象
  let obj = new Object();

  // 参数转数组
  var args = Array.prototype.slice.call(arguments);

  // 获取构造函数
  let Con = args[0];

  // 链接原型
  obj._proto_ = Con.prototype;

  // binding this
  let result = Con.apply(obj, args.slice(1));

  // return obj
  return typeof result === "object" ? result : obj;
}
```

## 手写一个call

```jsx
Function.prototype.myCall = function (params) {
  // 获取对象
  let params = params || window;

  // 将作用域添加到新函数里
  params.fn = this;

  // 获取参数
  let args = [...arguments].slice(1);

  // 执行新函数
  let result = parmas.fn(...args);

  // 删除函数
  delete params.fn;

  return result;
};
```

## 手写一个apply

```jsx
Function.prototype.myApply = function (params) {
  // 获取对象
  let params = params || window;

  // 将作用域添加到新函数里
  params.fn = this;

  let result = null;
  if (argments[1]) {
    result = parmas.fn(...arguments[1]);
  } else {
    result = parmas.fn();
  }

  // 删除函数
  delete params.fn;

  return result;
};
```

## 手写一个bind

```jsx
Function.prototype.myBind = function (context) {
  let _this = this;
  return function F() {
    if (this instanceof F) {
      return new _this(...arguments);
    }
    return _this.apply(context, [...arguments]);
  };
};
```

## 手写一个防抖函数

防抖函数的作用是事件调用之后隔一段时间再处理函数，如果在时间之内再次触发事件就清除原来的时间重新计时。

```jsx
// 要防抖的函数
function ajax(args) {
  console.log(args);
}

// 封装防抖函数
function debounce(fn, delay) {
  return function (args) {
    // 保存作用域
    var _this = this;
    // 清除定时器
    clearTimeout(fn.timer);
    // 执行定时器
    fn.timer = setTimeout(function () {
      fn.call(_this, args);
    }, delay);
  };
}

var fn = debounce(ajax, 300);

var input = document.getElementById("a");
input.addEventListener("keyup", function (event) {
  fn(event.target.value);
});
```

## 手写一个节流函数

节流函数的作用是在规定事件之内只触发一次函数

```jsx
function ajax(args) {
  console.log(args);
}

function throttle(fn, delay) {
  // 前一个时间
  let preTime;
  return function (args) {
    var _this = this;
    // 现在时间
    var newTime = +new Date();
    // 判断是否在时间差之内触发事件
    if (newTime - preTime < delay) {
      clearTimeout(fn.timer);
      fn.timer = setTimeout(function () {
        preTime = +new Date();
        fn.call(_this, args);
      }, delay);
    } else {
      preTime = +new Date();
      fn.call(_this, args);
    }
  };
}

var fn = throttle(ajax, 1000);
var input = document.getElementById("a");
input.addEventListener("keyup", function (event) {
  fn(event.target.value);
});
```