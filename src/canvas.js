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

  sin(x, y, cycles = 1, step = 0.1, options = {}) {
    const t1 = Date.now()
    const scale = 30
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    ctx.moveTo(x, y)
    for (let i = 0; i < cycles * 2 * Math.PI; i += step) {
      const x1 = x + i * scale
      const y1 = y + Math.sin(-i) * scale
      if (i === 0) {
        ctx.moveTo(x1, y1)
      } else {
        ctx.lineTo(x1, y1)
      }
    }
    ctx.stroke()
    console.log('sin time: ', Date.now() - t1)
  }

  cos(x, y, cycles = 1, step = 0.1, options = {}) {
    const t1 = Date.now()
    const scale = 30
    const ctx = this.context
    ctx.beginPath()
    setLineStyle(ctx, options)
    for (let i = 0; i < cycles * 2 * Math.PI; i += step) {
      const x1 = x + i * scale
      const y1 = y + Math.cos(-i) * scale
      if (i === 0) {
        ctx.moveTo(x1, y1)
      } else {
        ctx.lineTo(x1, y1)
      }
    }
    ctx.stroke()
    console.log('sin time: ', Date.now() - t1)
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
  const dashMap = {

  }
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
  const dy =  Math.round(Math.sqrt(r * r - dx * dx))
  return {
    x: x + dx + 0.5,
    y: (q < 3 ? y - dy : y + dy) + 0.5
  }
}
