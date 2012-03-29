/**
 * @author Chris Little
 */

var FPS = 30;
var frameInterval = 1000/FPS;
var canvas = null;
var ctx = null;

// Bezier curve control points
var ctrlPnts = [
	[200,200],
	[400,200],
	[200,400],
	[400,400]
]
// Width/height of the control points when drawn
var pointSize = 8;
var halfPointSize = pointSize/2;

// mouse position
var mouseX = 0;
var mouseY = 0;
// Flag set to true when the mouse button is held down
var mouseHeld = false;
// index of control point that is currently being dragged
var selectedPoint = -1;



window.onload = init;
function init(){
	canvas = document.getElementById("bezier_canvas");
	ctx = canvas.getContext("2d");
	
	// Redraw the canvas at the requested frame rate
	setInterval(draw, frameInterval);
	
	canvas.addEventListener("mousedown", mouseDownEvent, false);
	canvas.addEventListener("mouseup", mouseUpEvent, false);
	canvas.addEventListener("mousemove", mouseMoveEvent, false);
}


function mouseDownEvent(e){
	mouseHeld = true;
	for(var c=0; c<4; c++){
		//Check if pressed on the c-th control point
		if(pointOverlap(mouseX,mouseY, ctrlPnts[c][0]-halfPointSize, ctrlPnts[c][1]-halfPointSize, pointSize, pointSize)){
			selectedPoint = c;
		}
		
		//NOTE if two control points overlap, the later control point in the array takes precedence
	}
}

function mouseUpEvent(e){
	mouseHeld = false;
	selectedPoint = -1;
}

function mouseMoveEvent(e){
	// Keep track of the mouse position
	if(e.offsetX || e.offsetX == 0) //Chrome/Opera
	{
		mouseX = e.offsetX;
		mouseY = e.offsetY;
	}
	else if(e.layerX || e.layerX == 0) //Firefox
	{
		mouseX = e.layerX - canvas.offsetLeft;
		mouseY = e.layerY - canvas.offsetTop;
	}
	
	// When the mouse hovers over the control points, set cursor to a "move" cursor
	if(pointOverlap(mouseX,mouseY, ctrlPnts[0][0]-halfPointSize, ctrlPnts[0][1]-halfPointSize, pointSize, pointSize)
	|| pointOverlap(mouseX,mouseY, ctrlPnts[1][0]-halfPointSize, ctrlPnts[1][1]-halfPointSize, pointSize, pointSize)
	|| pointOverlap(mouseX,mouseY, ctrlPnts[2][0]-halfPointSize, ctrlPnts[2][1]-halfPointSize, pointSize, pointSize)
	|| pointOverlap(mouseX,mouseY, ctrlPnts[3][0]-halfPointSize, ctrlPnts[3][1]-halfPointSize, pointSize, pointSize)){
		document.body.style.cursor = 'move';
	}
	else{
		document.body.style.cursor = 'default';
	}
	
	// When the user is dragging a control point, set the control point's position to the mouse position
	if(mouseHeld && selectedPoint >= 0){
		ctrlPnts[selectedPoint][0] = mouseX;
		ctrlPnts[selectedPoint][1] = mouseY;
	}
}

// Return true of the point x,y is within the area specified by left,top and w,h (width,height)
function pointOverlap(x, y, left, top, w, h){
	if(x> left && x < left+w && y > top && y < top+h){
		return true;
	}
	else{
		return false;
	}
}

function draw(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	// Draw a border
	ctx.strokeStyle="#000000";
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(640,0);
	ctx.lineTo(640,480);
	ctx.lineTo(0,480);
	ctx.lineTo(0,0);
	ctx.stroke();
	
	// Draw lines between control points
	ctx.strokeStyle="#00FF00";
	ctx.beginPath();
	ctx.moveTo(ctrlPnts[0][0], ctrlPnts[0][1]);
	ctx.lineTo(ctrlPnts[1][0], ctrlPnts[1][1]);
	//ctx.stroke();
	ctx.moveTo(ctrlPnts[2][0], ctrlPnts[2][1]);
	ctx.lineTo(ctrlPnts[3][0], ctrlPnts[3][1]);
	ctx.stroke();
	
	// Set the drawing styles for the control points
	ctx.fillStyle="#FFFF00";
	
	// Draw the 2nd and 3rd control points, these are the ones that should be "controllable"
	ctx.fillRect(ctrlPnts[0][0]-halfPointSize, ctrlPnts[0][1]-halfPointSize, pointSize, pointSize);
	ctx.fillRect(ctrlPnts[1][0]-halfPointSize, ctrlPnts[1][1]-halfPointSize, pointSize, pointSize);
	ctx.fillRect(ctrlPnts[2][0]-halfPointSize, ctrlPnts[2][1]-halfPointSize, pointSize, pointSize);
	ctx.fillRect(ctrlPnts[3][0]-halfPointSize, ctrlPnts[3][1]-halfPointSize, pointSize, pointSize);
	
	// Set the drawing styles for the bezier curve
	ctx.strokeStyle="#FF0000";
	
	// Draw the bezier curve
	ctx.beginPath();
	ctx.moveTo(ctrlPnts[0][0], ctrlPnts[0][1]);
	ctx.bezierCurveTo(ctrlPnts[1][0], ctrlPnts[1][1], ctrlPnts[2][0], ctrlPnts[2][1], ctrlPnts[3][0], ctrlPnts[3][1]);
	ctx.stroke();
}
