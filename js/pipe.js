function Pipe(){
	this.y = 0;
	this.top = random(0,2*height/3);
	this.space = random(3*r, 10*r);
	this.bottom = this.top + this.space;
	this.w = 20;
	this.x = width - this.w;
	this.speed = 2;
	this.scored = false;

	this.show = function(x){
		//fill(175);
		noFill();
		stroke(255);
		rect(this.x, -r, this.w, this.top+r);
		rect(this.x, this.bottom, this.w, height-this.bottom);
	}

	this.update = function(){
		this.x -= this.speed;
	}

	this.point = function(){
		if(this.x + this.w < width/3 && !this.scored){
			this.scored = true;
			score++;
		}
	}

	this.offscreen = function(){
		if(this.x + this.w < 0){
			return true;
		}else{
			return false;
		}
	}
}
