const recast = require('recast')

const code = `
import React from 'react' 
import './Empty.module.scss'
import EmptyImg from 'src/app/images/empty.png'

function Empty() {
  return (
    <div styleName='empty'>
      <img styleName='empty-img' src={EmptyImg} />
      <div styleName='empty-text'>暂无消息</div>
    </div>
  )
}

export default React.memo(Empty)
  `

const ast = recast.parse(code)

const add = ast.program.body[0]
// console.log(add)

// console.log(recast.print(add))

recast.run((ast, printSource) => {
  recast.visit(ast, {
    visitArrowFunctionExpression(path) {
      printSource(path.source)
      return false
    }
  })
})