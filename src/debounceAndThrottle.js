
function debounce(action, delay, immediate) {
  if (typeof action !== 'function') {
    return
  }
  const duration = parseInt(delay, 10)
  let called = false
  let timer
  return function() {
    const ctx = this
    const args = [].slice.call(arguments)
    const handler = function () {
      action.apply(ctx, args)
    }
    if (immediate && !called) {
      called = true
      handler()
    }
    if (Number.isNaN(duration)) {
      window.cancelAnimationFrame(timer)
      timer = window.requestAnimationFrame(handler)
    } else {
      clearTimeout(timer)
      timer = setTimeout(handler, Math.abs(duration))
    }
  }
}


function throttle(action, delay) {
  if (typeof action !== 'function') {
    return
  }
  const duration = Math.abs(parseInt(delay, 10) || 0)
  let lastTime = 0
  return function () {
    const args = [].slice.call(arguments)
    const now = Date.now()
    if (now - lastTime >= duration) {
      lastTime = now
      action.apply(this, args)
    }
  }
}

class Throttle {
  constructor(timeSlice = 400) {
    this.timeSlice = timeSlice
  }
  run(func, overload) {
    const currentTime = new Date().getTime()
    if (!this.lastTime || currentTime - this.lastTime > this.timeSlice) {
      this.lastTime = currentTime
      if (typeof func === 'function') {
        func()
      }
    } else {
      if (typeof overload === 'function') {
        overload()
      }
    }
  }
  destroy() {
    this.timeSlice = null
    this.lastTime = null
  }
}
