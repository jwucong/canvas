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

  roundedRect(x, y, width, height, radius, options = {}) {
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