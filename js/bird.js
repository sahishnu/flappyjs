function Bird(){
	this.pos = createVector(width/3,height/2);

	this.velocity = 0;
	this.gravity = 0.6;
	this.lift = -15;

	this.started = false;


	this.show = function(){
		fill(255);
		ellipse(this.pos.x,this.pos.y,r,r);
	}

	this.update = function(){
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.pos.y += this.velocity;
	}

	this.die = function(pipe){
		if(this.pos.y - r > height || this.pos.y + r < 0){
			this.reset();
			return true;
		}else if(this.pos.y  < pipe.top || this.pos.y > pipe.bottom){
			if(this.pos.x > pipe.x && this.pos.x < pipe.x + pipe.w){
				this.reset();
				return true;
			}
		}else{
			return false;
		}

	}

	this.flap = function(){
		this.velocity += this.lift;
	}

	this.reset = function(){
		this.pos.y = height/2;
		this.velocity = 0;
		this.gravity = 0.6;
		this.started = false;
		score = 0;
	}

	this.scoreCheck = function(pipe){
		if(this.pos.x > pipe.x + pipe.w){
			score++;
		}
	}
}
