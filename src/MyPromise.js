
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const delay = (fn, t) => setTimeout(fn, t || 0)

const isFunction = fn => typeof fn === 'function'

const promiseResolver = function (value) {
  if (this.state !== PENDING) {
    return
  }
  this.state = FULFILLED
  this.value = value
  this.fcbs.forEach(cb => {
    cb(value)
  })
}

const promiseRejector = function (reason) {
  if (this.state !== PENDING) {
    return
  }
  this.state = REJECTED
  this.reason = reason
  this.rcbs.forEach(cb => {
    cb(reason)
  })
}

// [[Resolve]](promise2, x)
const resolvePromise2 = function (promise2, x, resolver, rejector) {
  if (promise2 === x) {
    rejector(new TypeError('Circular reference'))
  }
}


class MyPromise {
  constructor(executor) {
    this._state = PENDING
    this._value = null
    this._reason = null
    this._exception = null
    this._resolveCallbacks = []
    this._rejectCallbacks = []
    const execCallback = (callbacks, value) => {
      callbacks.forEach(cb => cb(value))
    }
    const resolver = value => {
      if (this._state !== PENDING) {
        return
      }
      this._state = FULFILLED
      this._value = value
      execCallback(this._resolveCallbacks, value)
    }
    const rejector = function (reason) {
      if (this._state !== PENDING) {
        return
      }
      this._state = REJECTED
      this._reason = reason
      execCallback(this._rejectCallbacks, reason)
    }
    try {
      executor(resolver, rejector)
    } catch (e) {
      rejector(e)
    }
  }

  then(resolver, rejector) {
    const hasResolver = isFunction(resolver)
    const hasRejector = isFunction(rejector)
    const state = this._state
    const pendingHandler = () => {

    }
    const fulfilledHandler = () => {

    }
    const rejectedHandler = () => {

    }

    switch (state) {
      case PENDING: return pendingHandler()
      case FULFILLED: return fulfilledHandler()
      case REJECTED: return rejectedHandler()
    }
  }


}
