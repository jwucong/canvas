class Canvas {
  constructor(options) {
    const config = Object.assign({
      width: 300,
      height: 150,
      dpr: 2
    }, options)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = config.width
    canvas.height = config.height
    this.config = config
    this.canvas = canvas
    this.context = context
    this.pxOffset = 0.5
  }

  coordinate(x, y, s, m, l, options = {}) {
    const ctx = this.context
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  line(x1, y1, x2, y2, options = {}) {
    const fix = val => val + this.pxOffset
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    ctx.moveTo(fix(x1), fix(y1))
    ctx.lineTo(fix(x2), fix(y2))
    ctx.stroke()
    options.closePath && ctx.closePath()
  }

  horizontalLine(x, y, width, options = {}) {
    this.line(x, y, x + width, y, options)
  }

  verticalLine(x, y, height, options = {}) {
    this.line(x, y, x, y + height, options)
  }

  rect(x, y, width, height, options = {}) {
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    ctx.rect(x + this.pxOffset, y + this.pxOffset, width, height)
    ctx.stroke()
  }

  roundedRect(x, y, width, height, radius, options = {}) {
    x = x + this.pxOffset
    y = y + this.pxOffset
    const x2 = x + width
    const y2 = y + height
    const r = parseFloat(radius) || 0
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    ctx.moveTo(x + r, y)
    ctx.arcTo(x2, y, x2, y2, r)
    ctx.arcTo(x2, y2, x, y2, r)
    ctx.arcTo(x, y2, x, y, r)
    ctx.arcTo(x, y, x2, y, r)
    ctx.stroke()
    options.closePath && ctx.closePath()
  }

  circular(x, y, radius, options = {}) {
    const r = parseFloat(radius) || 0
    this.roundedRect(x - r, y - r, 2 * r, 2 * r, r, options)
  }

  regularPolygon(sides, x, y, radius, options = {}) {
    const ctx = canvas.context
    const deg = 360 / sides
    let index = sides
    ctx.beginPath()
    setLineStyle(ctx, options)
    while (index--) {
      const angle = -(deg / 2 + 90 + index * deg)
      const point = getPoint(x, y, radius, angle)
      if (index === sides - 1) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    }
    ctx.closePath()
    ctx.stroke()
  }

  trigonometricFx(moveToCondition, fx, x = 0, y = 0, scale = 1, c = 1, a = 1, options = {}) {
    if (typeof fx !== 'function') {
      return
    }
    const step = Math.PI / 1000
    console.log('step: ', step)
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    for (let rad = 0; rad < c * Math.PI * 2 ; rad += step) {
      const x1 = x + rad * scale
      const y1 = y + a * scale * fx(rad)
      console.log(x1, y1)
      if (rad === 0 || moveToCondition(rad, x1, y1)) {
        ctx.moveTo(x1, y1)
        continue
      }
      ctx.lineTo(x1, y1)
    }
    ctx.stroke()
  }

  sin(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.sin].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  cos(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.cos].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }


  tan(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.tan].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  asin(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.asin].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  asinh(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.asinh].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  acos(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.acos].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  acosh(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.acosh].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  atan(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.atan].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  atanh(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.atanh].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  log(x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
    const args = [Math.log].concat(toArray(arguments))
    return drawFx.apply(this.context, args)
  }

  fx(fx, xStart, xEnd, step = 0.01, options = {}) {
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    for (let x = xStart; x < xEnd; x += step) {
      const y = fx(x)
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  animatedFx(fx, xStart, xEnd, step = 0.01, options = {}) {
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    const fn = function () {

    }
  }

  text(text, x = 0, y = 0, maxWidth, options) {

  }

}

function setLineStyle(ctx, style) {
  const defaults = {
    width: 1,
    style: '#000',
    cap: 'butt',
    join: 'miter',
    dashOffset: 0,
    miterLimit: 10,
    dash: []
  }
  const dashMap = {}
  const conf = Object.assign(defaults, style)
  ctx.lineWidth = conf.width
  ctx.lineCap = conf.cap
  ctx.lineJoin = conf.join
  ctx.miterLimit = conf.miterLimit
  ctx.strokeStyle = conf.style
  if (Array.isArray(conf.dash)) {
    ctx.setLineDash(conf.dash)
  }
}

function degToRad(deg) {
  return deg * Math.PI / 180
}

function radToDeg(rad) {
  return rad * 180 / Math.PI
}

function getQuadrant(angle) {
  let deg = angle % 360
  deg = deg < 0 ? 360 + deg : deg
  return Math.ceil(Math.abs(deg / 90))
}

function getPoint(x, y, r, angle) {
  const deg = angle % 360
  const rad = degToRad(deg)
  const q = getQuadrant(angle)
  const dx = Math.round(r * Math.cos(rad))
  const dy = Math.round(Math.sqrt(r * r - dx * dx))
  return {
    x: x + dx + 0.5,
    y: (q < 3 ? y - dy : y + dy) + 0.5
  }
}

function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

function drawFx(fx, x, y, amplitude = 1, cycles = 1, step = 0.01, options = {}) {
  const ctx = this
  ctx.beginPath()
  setLineStyle(ctx, options)
  for (let i = 0; i < cycles * 2 * Math.PI; i += step) {
    const x1 = x + i * amplitude
    const y1 = y + fx(-i) * amplitude
    // console.log('drawFx: (%d, %d)', x1, y1)
    if (Math.abs(i % (Math.PI / 2) - 0) < Number.EPSILON) {
      console.log('drawFx y1: ', fx(-i) * amplitude)
      ctx.moveTo(x1, y1)
    } else {
      ctx.lineTo(x1, y1)
    }
    // i === 0 ? ctx.moveTo(x1, y1) : ctx.lineTo(x1, y1)
  }
  ctx.stroke()
}

function isMathEqual(a, b, e) {
  const delta = Math.abs(a - b)
  return e ? delta < e : delta < Number.EPSILON
}
