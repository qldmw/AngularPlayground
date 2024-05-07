How to prevent user to open devtools?

## 1. Add event listener

- add event listener to contextmenu to prevent users open menu.

```javascript
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
```

- add event listerner to keydown.

```javascript
document.addEventListener("keydown", (e) => {
  // 禁止f12,禁用ctrl+shift+i,禁用shift+f10
  if (e.code === "F12" || (e.ctrlKey && e.shiftKey && e.code === "KeyI") || (e.shiftKey && e.code === "F10")) {
    e.preventDefault();
  }
});
```

## 2. Add debugger

```javascript
setInterval(() => {
  debugger;
}, 1000);
```

## 3. Leverage third party liberary

- disable-devtool: https://www.npmjs.com/package/disable-devtool?activeTab=readme

## 4. Some repositories in github

1. https://github.com/theajack/disable-devtool/tree/master 1.3k stars
   key function for detection: https://github.com/theajack/disable-devtool/blob/master/src/detector/sub-detector/debugger.ts
2. https://github.com/kajweb/stop-debugger 81 stars
3. https://github.com/DungGramer/disable-devtool 19 stars

## 5. Summary

Ranking of Effectiveness of Various Means to Secure Front-End Rendering:  
Detect keydown/menuContext < Detect if debugger was executed < code compression/minification << code confusion <<< server side render(ultimate solution, Facebook、Twitter、Netflix、Instagram are using it)

```javascript
//Tampermonkey script, for adding noscript into head to stop JS.
(function () {
  "use strict";

  // 移除所有 <script> 标签
  const scripts = document.querySelectorAll("script");
  scripts.forEach((script) => script.remove());
})();
```
