const recast = require('recast')

recast.run((ast, printSource) => {
  // console.log(ast)
  // // printSource(ast)

  recast.visit(ast, {
    visitVariableDeclaration(path){
      printSource(path.node)
      return false
    }
  })
})