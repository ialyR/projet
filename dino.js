const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Variables
let dino;
let vitesse;


// Prototype Element
function Element (x, y, w, h, c) {
	this.xpos=x;
	this.ypos=y;
	this.width=w;
	this.height=h;
	this.color=c;
}
    
Element.prototype.Animer = function () {
    this.Dessiner();
    
    // ligne du sol
    ctx.moveTo(0,canvas.height);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.stroke();
}
    
Element.prototype.Dessiner = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    ctx.closePath();

}

Element.prototype.Sauter = function(){

}

function Lancer() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight /2;
	
	dino = new Element(25, 0, 50, 50, '#FF5858');
	
	requestAnimationFrame(Update);
}

