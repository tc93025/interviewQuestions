//1. https加密原理
// 为什么要用对称加密+非对称加密？加密公钥
// 为什么不能只用非对称加密？性能问题
// 为什么需要数字证书？防中间人 需要一个公信力ca机构来证明这个公钥是这个网站的公钥
// 为什么需要数字签名？获取ca的数字证书的时候需要用来验证获取的证书没有被劫持
// https://zhuanlan.zhihu.com/p/43789231

// 2。这在 React 的设计中很常见。有一些流行的库实现了 “push” 模式，即当新数据到达时再计算。然而 React 坚持 “pull” 模式，即计算可以延迟到必要时再执行。
// vue的push模式

// 3. The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. 
// Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

// 在UI中，不必立即应用每个更新;实际上，这样做可能会浪费，导致帧丢失并降低用户体验。
//         不同类型的更新具有不同的优先级 - 动画更新需要比例如来自数据存储的更新更快地完成。
//         基于推送的方法需要应用（程序员）来决定如何安排工作。基于拉取的方法允许框架（React）变得聪明并为您做出决策。

// 4.react diffing算法 
// 两个不同类型的元素会产生出不同的树；
// 开发者可以通过设置 key 属性，来告知渲染哪些子元素在不同的渲染下可以保存不变；
// 正因react只处理逻辑层的协调部分，
// DOM只是React的渲染环境之一，其他主要目标是通过React Native的原生iOS和Android视图。 （这就是为什么“虚拟 DOM”有点用词不当）
// 它可以支持这么多目标的原因是因为React的设计使得协调和渲染是分开的阶段。协调器负责计算树的哪些部分已经改变;然后渲染器使用该信息来实际更新渲染的应用。
// 这种分离意味着React DOM和React Native可以使用自己的渲染器，同时共享由React核心提供的相同协调器。
// Fiber重新实现了协调。虽然渲染器需要更改以支持（并利用）新架构，但它并不主要关注渲染。

// 如果我们可以自定义调用堆栈的行为以优化渲染UI，那不是很好吗？如果我们可以随意中断调用堆栈并手动操作堆栈帧，那不是很好吗？
// 这就是React Fiber的目的。Fiber是堆栈的重新实现，专门用于React组件。您可以将单个Fiber视为虚拟堆栈帧。





// 词法分析、语法分析、语义分析 明天看了

// taro1 将react组件编译成微信component
// taro2 使用webpack编译，tarocli
// taro3 模拟dom和bom Api 借鉴reactNative 不受框架控制内置react vue nerv等框架
// taro3.1 开放式架构 需要什么平台插件插入什么平台