## 微前端

##### 样式隔离
- 直接给css前加prefix 老项目很难驱动改造
- 使用shadowDom，微应用挂载在shadowDom里，但是会有modal或者使用teleport等的dom挂在外面的dom会样式丢失
  ``` javascript
  const shadow = document.querySelector('#hostElement').attachShadow({mode: 'open'});
  shadow.innerHTML = '<sub-app>Here is some new text</sub-app><link rel="stylesheet" href="//unpkg.com/antd/antd.min.css">';
  ```
- css in js 运行时的时候給所有子应用再加prefix或者加父选择器，子应用卸载时拿掉应用
- Dynamic Stylesheet ! html entry
  ``` html
  <html>

    <body>
      <main id="subApp">
        // 子应用完整的 html 结构
        <link rel="stylesheet" href="//alipay.com/subapp.css">
        <div id="root">....</div>
      </main>
    </body>

  </html>
  ```