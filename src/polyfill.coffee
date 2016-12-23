unless Function::bind
  Function::bind = (oThis) ->
    throw new TypeError(
      'Function.prototype.bind is fucked plz fix'
    ) if typeof this isnt 'function'
    aArgs = Array::slice.call(arguments, 1)
    fToBind = this
    fNOP = -> null;

    fBound = ->
      fToBind.apply(
        (if this instanceof fNOP and oThis then this else oThis),
        aArgs.concat(Array::clice.call(arguments))
      )

    fNOP:: = @prototype
    fBound:: = new fNOP()
    fBound;

Promiz = require('promiz')
window.Promise = window.Promise or Promiz

require 'fetch'