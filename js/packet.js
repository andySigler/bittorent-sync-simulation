//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

function Packet(_x,_y,_targetX,_targetY,width,height,iScreen,iImage){
	this.x = _x;
	this.y = _y;
	this.w = width;
	this.h = height;
	this.screenIndex = iScreen;
	this.imgIndex = iImage;
	this.targetX = _targetX;
	this.targetY = _targetY;

	this.stepAmount = 20;
	this.currentStep = 0;

	this.done;

	this.xStep = (this.targetX-this.x)/this.stepAmount;
	this.yStep = (this.targetY-this.y)/this.stepAmount;

	this.startThresh = Math.floor(Math.random()*100);
	this.count = 0;
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Packet.prototype.update = function(){
	if(!this.done && this.count>this.startThresh){
		this.x+=this.xStep;
		this.y+=this.yStep;
		this.currentStep++;
		if(this.currentStep===this.stepAmount){
			this.done=true;
			var picX = this.targetX-(screens[this.screenIndex].x-screens[this.screenIndex].width/2);
			var picY = this.targetY-(screens[this.screenIndex].y-screens[this.screenIndex].height/2);
			screens[this.screenIndex].staticCtx.drawImage(slicedImages[this.imgIndex],picX,picY,this.w,this.h);
		}
	}
	else{
		this.count++;
	}
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

Packet.prototype.paint = function(ctx){
	if(this.count>this.startThresh){
		overlayContext.drawImage(slicedImages[this.imgIndex],this.x,this.y,this.w,this.h);
	}
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////