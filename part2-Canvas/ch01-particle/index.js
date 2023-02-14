const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio

const canvasWidth = innerWidth
const canvasHeight = innerHeight

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr

ctx.scale(dpr, dpr)


class Particle{
  constructor(x, y, radius, vy){ // 클래스의 인스턴스 객체를 생성하고 초기화하기 위한 필수 메서드
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
  }

  update(){ // 각각의 파티클의 constructor의 초기화된 값을 변경
    this.y += this.vy;
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
    ctx.fillStyle = 'orange'
    ctx.fill()
    ctx.closePath()
  }
}

const TOTAL = 20
const randomNumBetween = (min, max) => { // 랜덤 좌표값
  return Math.random() * (max - min + 1) + min
}

let particles = []

for(let i = 0; i < TOTAL; i++){
  const x = randomNumBetween(0, canvasWidth) // 랜덤 x좌표
  const y = randomNumBetween(0, canvasHeight) // 랜덤 y좌표
  const radius = randomNumBetween(50, 100) // 랜덤 크기
  const vy = randomNumBetween(1, 5)
  const particle = new Particle(x, y, radius, vy)
  particles.push(particle)
}
console.log(particles)

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
      particle.x = randomNumBetween(0, canvasWidth)
      particle.radius = randomNumBetween(50, 100)
      particle.vy = randomNumBetween(1, 5)
    }
  })

  then = now - (delta % interval)
}

animate();