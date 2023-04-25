const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Variables
let dino;
let vitesse;
let gravite;
let keys={};
let nSaut=0;
let obstacles=[];



document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
  });
  document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

// Prototype Element
function Element (x, y, w, h, c) {
	this.xpos=x;
	this.ypos=y;
	this.width=w;
	this.height=h;
	this.color=c;

    this.dy=0;
    this.fSaut=15;
    this.grounded = false;
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
    this.ypos += this.dy;

    //animation de la gravité 
    if (this.ypos+this.height<canvas.height){
        this.dy +=gravite;
        this.grounded=false;
    }
    else{
        this.dy = 0;
        this.grounded = true;
        this.ypos = canvas.height - this.height;
    }
    this.Dessiner();
}
    
Element.prototype.Dessiner = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    ctx.closePath();

}

Element.prototype.Sauter = function(){
    if (this.grounded && this.nSaut == 0) {
        this.nSaut = 1;
        this.dy = -this.fSaut;
      } else if (this.nSaut > 0 && this.nSaut < 15) {
        this.nSaut++;
        this.dy = -this.fSaut - (this.nSaut / 50);
      }
  
}

function Obstacle(x, y, w, h, c){
    this.x1 = x;
    this.y1 = y;
    this.w1 = w;
    this.h1 = h;
    this.c1 = c;

    this.dx=-vitesse;
}

Obstacle.prototype.Update=function(){
    this.x1 += this.dx;
    this.Dessiner();
    this.dx = -vitesse;
}

Obstacle.prototype.Dessiner=function(){
    ctx.beginPath();
    ctx.fillStyle = this.c1;
    ctx.fillRect(this.x1, this.y1, this.w1, this.h1);
    ctx.closePath();
}


function Lancer() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight /2;
    vitesse=1;
    gravite=1;
	dino = new Element(25, 0, 50, 50, '#FF5858');
	
	requestAnimationFrame(Update);
}

function Update() {
	requestAnimationFrame(Update);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	dino.Animer();
}

Lancer();


