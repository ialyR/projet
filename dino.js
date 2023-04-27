const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Variables
let dino;
let vitesse;
let gravite;
let keys={};
let obstacles=[];



document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
  });
  document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

// Prototype Element
function Element (x, y, w, h, c) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.color=c;

    this.dy=0;
    this.fSaut=15;
    this.sol = false;
    this.tailleOG=this.h;
    this.nSaut=0;
}
    
Element.prototype.Animer = function () {
    
    
    // ligne du sol
    ctx.moveTo(0,canvas.height);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.stroke();

    //animation des sauts
    if (keys['Space']) {
        this.Sauter();
      } else {
        this.nSaut = 0;
    }

    if (keys['ArrowDown']) {
        this.h = this.tailleOG / 2;
      } else {
        this.h = this.tailleOG;
      }

    this.y += this.dy;

    //animation de la gravité 
    if (this.y+this.h<canvas.height){
        this.dy +=gravite;
        this.sol=false;
    }
    else{
        this.dy = 0;
        this.sol = true;
        this.y = canvas.height - this.h;
    }
    this.Dessiner();
}
    
Element.prototype.Dessiner = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();

}

Element.prototype.Sauter = function(){
    if (this.sol && this.nSaut == 0) {
        this.nSaut = 1;
        this.dy = -this.fSaut;
      } else if (this.nSaut > 0 && this.nSaut < 15) {
        this.nSaut++;
        this.dy = -this.fSaut - (this.nSaut / 50);
      }
  
}

function Obstacle(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dx=-vitesse;
}

Obstacle.prototype.Update=function(){
    this.x += this.dx;
    this.Dessiner();
    this.dx = -vitesse;
}

Obstacle.prototype.Dessiner=function(){
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
}

function Apparition(){
    let taille=RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 1);
    let obstacle = new Obstacle(canvas.width + taille, canvas.height - taille, taille, taille, '#2484E4');

    if (type == 1) {
        obstacle.y -= dino.originalHeight - 10;
      }
      obstacles.push(obstacle);
}

function RandomIntInRange (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function Lancer() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight /2;
    vitesse=3;
    gravite=1;
	dino = new Element(25, 0, 50, 50, '#FF5858');
	
	requestAnimationFrame(Update);
}

let apparitionInit = 200;
let apparitionT = apparitionInit;

function Update() {
	requestAnimationFrame(Update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    apparitionT--;
    
    if (apparitionT <= 0) {
        Apparition();
        console.log(obstacles);
        apparitionT = apparitionInit - vitesse * 8;
    
        if (apparitionT < 60) {
            apparitionT = 60;
        }
    }

  // Apparition obstacle
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    if (o.x + o.width< 0) {
      obstacles.splice(i, 1);
    }

    if (
      dino.x < o.x + o.w &&
      dino.x + dino.w > o.x &&
      dino.y < o.y + o.h &&
      dino.y + dino.h > o.y
    ) {
      alert('Game over');
      obstacles = [];
      apparitionT = initialapparitionT;
      vitesse = 3;
      
    }

    o.Update();
  }

    dino.Animer();
    
    
}

Lancer();


