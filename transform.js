
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift
  const body = j(fileInfo.source)

  // function hasJsxElement(ast) {
  //   return j(ast).find(j.JSXElement).size() > 0;
  // }

  // function getJsxElement(ast) {
  //   return j(ast).find(j.JSXElement)
  // }
  // console.log(getJsxElement(fileInfo.source))

  // console.log(j(fileInfo.source).filter(function (nodes) {
  //   console.log('filter', nodes)
  //   // return j.template.statement(nodes)
  // }))
  body.find(j.Identifier, { name: 'Icon' }).replaceWith(j.identifier('Ico'))
  body.find(j.JSXIdentifier, { name: 'Icon' }).replaceWith(j.jsxIdentifier('Ico'))
  body.find(j.JSXAttribute, { name: { name: 'left' } }).replaceWith() // 层级结构操作
  body.find(j.Identifier, { name: 'right' }).replaceWith()

  return body.toSource()



  // return j(fileInfo.source).find(j.Identifier, { name: 'left' })
  //   .replaceWith().toSource()

}

// module.exports.parser = 'flow'
