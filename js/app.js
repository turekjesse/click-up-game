// DOM ELEMENTS
const overlay = document.querySelector('.overlay')
const startGameBtn = document.getElementById('start-game')
const pauseGameBtn = document.getElementById('pause-game')
const main = document.querySelector('main')
const largeBall = document.querySelector(".ball-lrg")

// CLASSES
class Box {
    constructor(node,width,height, ball) {
        this.node = node;
        this.width = width;
        this.height = height;

        this.node.style.width = width + "vw"
        this.node.style.height = height + "vh"
    }
}

class Ball {
    constructor (node,radius,box) {
        this.node = node;
        this.radius = radius;
        this.radius = radius;
        this.box = box;

        this.node.style.width = 2 * this.radius + 'px';
        this.node.style.height = 2 * this.radius + 'px';
        this.node.style.position = 'absolute';

        this.positionX = 0;
        this.positionY = 0;
        this.velocityX = 2 * (Math.random() - 2)
        this.velocityY = 2 * (Math.random() - 2)
    }

    fall() {
        if (this.positionY > -this.box.height/2 + this.radius + 10) {
            this.velocityY -= 0.01;
        }
    }

    bounceX() {
        this.velocityX = -0.5 * this.velocityX;
    }

    bounceY() {
        if (this.velocityY > 0 || this.velocityY < -0.5) {
            this.velocityY = -0.1 * this.velocityY;
          } else {
            this.velocityY = 0;
            this.positionY = -this.box.height/2 + this.radius;
          };
        }

    frictionX() {
        if (this.velocityY === 0 && this.positionY < -this.box.height/2 + this.radius + 1) {
            this.velocityX *= 0.995;
            }
        }

    boxBounce() {
        let newX = this.positionX + this.velocityX;
        let newY = this.positionY + this.velocityY;
    
        if (newX < -this.box.width/2 + this.radius) {
            this.bounceX();
        } else if (newX > this.box.width/2 - this.radius) {
            this.bounceX();
        }
    
        if (newY < -this.box.height/2 + this.radius) {
            this.bounceY();
        } else if (newY > this.box.height/2 - this.radius) {
            this.bounceY();
        }
        }
    
    update() {
        this.node.style.transform = `translate(
            ${-this.positionX}vw,
            ${-this.positionY}vh
        )`
    }

    step() {
        this.fall();
        this.boxBounce();
        this.frictionX();
    
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
    
        this.update();
      }        
}



// VARIABLES
const box = new Box(main,100,75)
const ball = new Ball (largeBall,30,box)
let animationRequestID = null;

// FUNCTIONS
// const startGame = (event) => {
//     event.preventDefault
//     overlay.style.display = 'none'
// }

const step = () => {
    ball.step();
    animationRequestID = window.requestAnimationFrame(step);
  }

// EVENT LISTENERS
largeBall.addEventListener('click', () => {
    window.cancelAnimationFrame(animationRequestID);
    animationRequestID = window.requestAnimationFrame(step);
  });
  
  pauseGameBtn.addEventListener('click', () => {
    window.cancelAnimationFrame(animationRequestID);
  });
