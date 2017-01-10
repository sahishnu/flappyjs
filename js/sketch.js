var r = 25;
var bird;
var pipes = [];
var frame = 1;
var score = 0;
var pipeCount = 0;
var levelup = false;
var speed = 2;

function setup() {
	createCanvas(windowWidth, windowHeight);
	bird = new Bird();
	pipes.push(new Pipe());

}

function draw() {
	background(50);
	noStroke();
	textAlign(CENTER);
	textSize(38);
	fill(175);
	text(score,width/2,height/2);
 	bird.show();

	if(bird.started){
		frame++;
		bird.update();
		for(var i = 0; i < pipes.length; i++){
			pipes[i].show();
			pipes[i].update();

			if(pipes[i].offscreen()){
				pipes.splice(i,1);
				pipeCount++;
			}

			if(bird.die(pipes[i])){
				pipes = [];
				score = 0;
			}else{
				pipes[i].point();
			}

		}



		if(frame % 100/speed == 0){
			pipes.push(new Pipe());
		}
	}
}

function keyPressed(){
	if(keyCode == 32){
		bird.started = true;
		bird.flap();
	}
}
//imgay
