/**
 * @author Chris Little
 */

var FPS = 30;
var frameInterval = 1/FPS;
var canvas = null;
var ctx = null;

// Bezier curve control points
var ctrlPnts = [
	[200,200],
	[400,200],
	[200,400],
	[400,400]
]

window.onload = init;

function init(){
	canvas = document.getElementById("bezier_canvas");
	ctx = canvas.getContext("2d");
	
	setInterval(draw, frameInterval * 1000);
	
	currentFunction = rotate;
}

function draw(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.strokeStyle="#FF0000";
	ctx.fillStyle="#FF0000";
	
	ctx.beginPath();
	ctx.moveTo(50,50);
	ctx.lineTo(100,100);
	ctx.stroke();
	
	// Draw the 2nd and 3rd control points, these are the ones that should be "controllable"
	ctx.fillRect(ctrlPnts[1][0]-2, ctrlPnts[1][1]-2, 4, 4);
	ctx.fillRect(ctrlPnts[2][0]-2, ctrlPnts[2][1]-2, 4, 4);
	
	// Draw the bezier curve
	ctx.beginPath();
	ctx.moveTo(ctrlPnts[0][0], ctrlPnts[0][1]);
	ctx.bezierCurveTo(ctrlPnts[1][0], ctrlPnts[1][1], ctrlPnts[2][0], ctrlPnts[2][1], ctrlPnts[3][0], ctrlPnts[3][1]);
	ctx.stroke();
}
