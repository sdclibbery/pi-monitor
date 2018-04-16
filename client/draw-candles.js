drawCandles = (canvas, candles) => {
  var ctx = canvas.getContext('2d')
  const min = candles.reduce((m, c) => Math.min(m, c.low), Infinity)
  const max = candles.reduce((m, c) => Math.max(m, c.high), -Infinity)
  const toY = (p) => canvas.height-(p-min)*canvas.height/(max-min)
  candles.map((c, i) => {
    const w = canvas.width/300
    const x = canvas.width-i*w
    ctx.fillStyle = (c.close >= c.open) ? 'green' : 'red'
    ctx.fillRect(x+w/2, toY(c.open), 1, Math.max(toY(c.close)-toY(c.open), 1))
    ctx.fillRect(x, toY(c.low), w, toY(c.high)-toY(c.low), 1)
  })
  ctx.fillStyle = 'black'
  ctx.font = '12px sans'
  ctx.fillText(min, 0, toY(min))
  ctx.fillText(max, 0, toY(max)+12)
  ctx.fillText(candles[0].time, canvas.width-170, canvas.height)
  ctx.fillText(candles[candles.length-1].time, 30, canvas.height)
}
