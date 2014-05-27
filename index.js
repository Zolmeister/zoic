'use strict'

var esprima = require('esprima')
var as = require('ast-scope')
var fs = require('fs')
var metaz = require('metaz')
var _ = require('lodash')

// Invalidate require cache on each require to get the parent filename again
delete require.cache[__filename]
var source = metaz.getSource(module.parent)
var exported = metaz.getExports(module.parent, source)

var ast = esprima.parse(source)
var topScope = as.analyze(ast)

var fileExports = topScope.variables.reduce(function (exporting, variable) {
  variable.declarations.map(function (declaration) {
    var isFunctionDeclaration = declaration.type === 'FunctionDeclaration'
    var isNotPrivate = !/^_.*/.test(declaration.id.name)
    if (isFunctionDeclaration && isNotPrivate) {
      exporting.push(declaration.id.name)
    }
  })

  return exporting
}, [])

var functions = '(function(){ return{'
fileExports.forEach(function (exp, i) {
  functions += '"' + exp + '": ' + exp + ''
  if (i !== fileExports.length - 1) {
    functions += ', '
  }
})
functions += '} })()'

source += '\n module.exports = ' + functions

var newExports = metaz.getExports(module.parent, source)
metaz.modifyExports(module.parent, _.defaults(newExports, exported))
