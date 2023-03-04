const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio
let canvasWidth;
let canvasHeight;
let particles

function init(){
  canvasWidth = innerWidth
  canvasHeight = innerHeight

  canvas.style.width = canvasWidth
  canvas.style.Height = canvasHeight

  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)
  
  particles = []
  const TOTAL = 100;

  for(let i = 0; i < TOTAL; i++){
    const x = canvasWidth / 2
    const y = 0
    const radius = 30
    const vy = 5
    const particle = new Particle(x, y, radius, vy)
    particles.push(particle)    
  }
  
}

class Particle{
  constructor(x, y, radius, vy){
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
    this.acc = 1.05
  }
  update(){
    this.y += this.vy
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
    ctx.fillStyle = 'orange'
    ctx.fill()
    ctx.closePath()
  }
}

let interval = 1000 / 60
let now, delta
let then = Date.now()


function animate(){
  window.requestAnimationFrame(animate)
  now = Date.now()
  delta = now - then

  if(delta < interval) return

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  particles.forEach(particle => {
    particle.update()
    particle.draw()

    if(particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius
      particle.x = canvasWidth / 2
      particle.radius =  30
      particle.vy = 2
    }
  })

  then = now - (delta % interval)
}

window.addEventListener('load', () => {
  init()
  animate()
})

window.addEventListener('resize', () => {
  init()
})