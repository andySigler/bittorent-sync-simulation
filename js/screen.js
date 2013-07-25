//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

function Screen(_x,_y,_width,_height,_name){
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;

	this.name = _name;

	this.gotten = []; //the sections that've arrived
	this.coming = []; //the sections sent from peers

	this.gottenCount = 0;
	this.comingCount = 0;

	this.done = true;

	this.r = 0;
	this.g = 0;
	this.b = 0;

	this.prevTouchX = undefined;
	this.prevTouchY = undefined;

	this.touched = false;

	for(var i=0;i<xDim*yDim;i++){
		this.gotten[i] = false;
		this.coming[i] = false;
	}

	this.staticCan = document.createElement('canvas');
	this.staticCan.width = this.width;
	this.staticCan.height = this.height;
	this.staticCan.className = 'screen';
	this.staticCan.style.left = this.x-this.width/2+'px';
	this.staticCan.style.top = this.y-this.height/2+'px';
	document.body.appendChild(this.staticCan);
	this.staticCtx = this.staticCan.getContext('2d');

	this.activeCan = document.createElement('canvas');
	this.activeCan.width = this.width;
	this.activeCan.height = this.height;
	this.activeCan.className = 'screen';
	this.activeCan.style.left = this.x-this.width/2+'px';
	this.activeCan.style.top = this.y-this.height/2+'px';
	document.body.appendChild(this.activeCan);
	this.activeCtx = this.activeCan.getContext('2d');
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Screen.prototype.touchStart = function(_x,_y){
	var touchX = Math.floor(_x-(this.x-this.width/2));
	var touchY = Math.floor(_y-(this.y-this.height/2));
	this.prevTouchX = touchX;
	this.prevTouchY = touchY;

	this.r = Math.floor(Math.random()*255);
	this.g = Math.floor(Math.random()*255);
	this.b = Math.floor(Math.random()*255);
	this.activeCtx.strokeStyle = 'rgb('+this.r+','+this.g+','+this.b+')';

	this.activeCtx.lineWidth = Math.floor(Math.pow(Math.random(),3)*10)+5;

	if(touchX<this.width && touchY<this.height){
		this.activeCtx.beginPath();
		this.activeCtx.moveTo(this.prevTouchX,this.prevTouchY);
		this.activeCtx.lineTo(touchX,touchY);
		this.activeCtx.stroke();
	}

	this.touched = true;
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Screen.prototype.draw = function(_x,_y){
	var touchX = Math.floor(_x-(this.x-this.width/2));
	var touchY = Math.floor(_y-(this.y-this.height/2));
	if(touchX<this.width && touchX>0 && touchY<this.height && touchY>0 && this.touched){
		this.activeCtx.beginPath();
		this.activeCtx.moveTo(this.prevTouchX,this.prevTouchY);
		this.activeCtx.lineTo(touchX,touchY);
		this.activeCtx.stroke();
	}
	this.prevTouchX = touchX;
	this.prevTouchY = touchY;
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Screen.prototype.release = function(){
	this.touched = false;
	this.staticCtx.drawImage(this.activeCan,0,0,this.staticCan.width,this.staticCan.height);
	startSeeding(this.activeCan,this);
	this.activeCtx.clearRect(0,0,this.activeCan.width,this.activeCan.height);
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////