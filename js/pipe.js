function Pipe(){
	this.y = 0;
	this.top = random(0,2*height/3);
	this.space = random(3*r, 10*r);
	this.bottom = this.top + this.space;
	this.w = 4*r/3;
	this.x = width + this.w;
	this.scored = false;

	this.show = function(x){
		fill(175);
		stroke(175);
		rect(this.x, -r, this.w, this.top+r);
		rect(this.x, this.bottom, this.w, height-this.bottom);
	}

	this.update = function(){
		this.x -= speed;
	}

	this.point = function(){
		if(this.x + this.w < width/3 && !this.scored){
			this.scored = true;
			score++;
			if(score % 5 == 0){
				//speed = lerp(speed, speed+1, 0.5)
				speed++;
			}
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
