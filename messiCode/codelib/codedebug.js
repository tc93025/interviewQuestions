function deepCopy(obj){
	function re(obj2){
		let result = {}
		Object.keys(obj2).forEach(item=>{
			if(typeof obj2[item] ==='object'){
				result[item] = re(obj2[item])
			} else{
				result[item] = obj2[item]
			}
      
		})
		return result
	}

	return re(obj)
	
}
// for (var i = 0; i < 5; i++) {
//   (function(j){
//     setTimeout(function() {
//       console.log(j);
//     }, 1000);
//   })(i);
// }



const testObj = {

	a: {

		b: {

			c: 1

		}

	}

}

const testObj2 = deepCopy(testObj);

testObj2.a.b.c = 2

console.log(testObj.a.b.c)

// webpack打包流程概括
// webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

// 初始化参
// 开始编译 用上一步得到的参数初始Compiler对象，加载所有配置的插件，通
// 过执行对象的run方法开始执行编译
// 确定入口 根据配置中的 Entry 找出所有入口文件
// 编译模块 从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
// 完成模块编译 在经过第4步使用 Loader 翻译完所有模块后， 得到了每个模块被编译后的最终内容及它们之间的依赖关系
// 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk,再将每个 Chunk 转换成一个单独的文件加入输出列表中，这是可以修改输出内容的最后机会
// 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，将文件的内容写入文件系统中。

// 在以上过程中， Webpack 会在特定的时间点广播特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，井且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。其实以上7个步骤，可以简单归纳为初始化、编译、输出，三个过程，而这个过程其实就是前面说的基本模型的扩展。

// webpack实现拓扑排序是广度优先遍历 BFS的方式 与kahn算法（贪心）类似