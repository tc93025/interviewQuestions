#single-spa
single-spa是一个将多个单页面应用聚合为一个整体应用的js微前端框架。

## 介绍
Single-spa 包括以下内容:

Applications，每个应用程序本身就是一个完整的 SPA (某种程度上)。 每个应用程序都可以响应 url 路由事件，并且必须知道如何从 DOM 中初始化、挂载和卸载自己。 传统 SPA 应用程序和 Single SPA 应用程序的主要区别在于，它们必须能够与其他应用程序共存，而且它们没有各自的 html 页面。

例如，React 或 Angular spa 就是应用程序。 当激活时，它们监听 url 路由事件并将内容放在 DOM上。 当它们处于非活动状态时，它们不侦听 url 路由事件，并且完全从 DOM 中删除。

一个 single-spa-config配置, 这是html页面和向Single SPA注册应用程序的JavaScript。每个应用程序都注册了三件东西

- A name
- A function (加载应用程序的代码)
- A function (确定应用程序何时处于活动状态/非活动状态)



### Import Maps
import Maps是一个浏览器规范，用于将某个Url起一个“import specifier”的别名。import specifier是指示要加载哪个模块的字符串。例子
``` js
  // ./thing.js is the import specifier
  import thing from './thing.js';
  // react is the import specifier
  import React from 'react';
```
不是URL的说明符称为“纯说明符”，如“import”react”。对于能够使用浏览器内模块来说，能够将裸说明符别名为URL是至关重要的，这就是存在导入映射的原因。