const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Variables
let dino;


// Prototype Element
function Element (x, y, w, h, c) {
	this.xpos=x;
	this.ypos=y;
	this.width=w;
	this.height=h;
	this.color=c;
}