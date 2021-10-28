

``` js
// setState方法入口如下:
  ReactComponent.prototype.setState = function (partialState, callback) {
    // 将setState事务放入队列中
    this.updater.enqueueSetState(this, partialState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'setState');
  }};
```

## 整体流程回顾：
- 1.enqueueSetState将state放入队列中，并调用enqueueUpdate处理要更新的Component
- 2.如果组件当前正处于update事务中，则先将Component存入dirtyComponent中。否则调用batchedUpdates处理。
- 3.batchedUpdates发起一次transaction.perform()事务
- 4.开始执行事务初始化，运行，结束三个阶段
- 5.初始化：事务初始化阶段没有注册方法，故无方法要执行
- 6.运行：执行setSate时传入的callback方法，一般不会传callback参数
- 7.结束：更新isBatchingUpdates为false，并执行FLUSH_BATCHED_UPDATES这个wrapper中的close方法
- 8.FLUSH_BATCHED_UPDATES在close阶段，会循环遍历所有的dirtyComponents，调用updateComponent刷新组件，并执行它的pendingCallbacks, 也就是setState中设置的callback。

- https://segmentfault.com/a/1190000015463599