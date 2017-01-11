var r = 25;
var bird;
var pipes = [];
var frame = 1;
var score = 0;
var pipeCount = 0;
var levelup = false;
var speed = 2;
var database;
var total = 0;
var name;
var modalup = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	bird = new Bird();
	pipes.push(new Pipe());

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_aOEHrPrmnaNnPJYf33QAS1hYUPLQV88",
    authDomain: "fleppyjs.firebaseapp.com",
    databaseURL: "https://fleppyjs.firebaseio.com",
    storageBucket: "fleppyjs.appspot.com",
    messagingSenderId: "244938476380"
  };
  firebase.initializeApp(config);
	database = firebase.database();

	vex.dialog.prompt({
	    message: 'Enter your name:',
	    callback: function (value) {
	        if (value) {
							modalup = true;
							name = value;
	            console.log('Successful');
	            modelout = true;
	        } else {
	            console.log('Error.');
	        }
	    }
	})

	var ref = database.ref('scores');
	ref.on('value', gotData, errData);

}

function draw() {
	background(50);
	noStroke();
	textAlign(CENTER);
	textSize(38);
	fill(175);
	text(score,width/2,height/2);
 	bird.show();

	if(bird.started && modalup){
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
				sendScore(total);
				console.log("total", total );
				pipes = [];
			}else if(pipes.length != 0){
				pipes[i].point();
			}

		}

		if(frame % 100/2*speed == 0){
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

function touchStarted(){
	bird.started = true;
	bird.flap();
}

function sendScore(total){
	console.log("sending", total);
	var data = {
		name: name,
		score: total
	}
	var ref = database.ref('scores');
	ref.push(data);
}


function gotData(data){
	var scores = data.val();
	var keys = Object.keys(scores);
	var highscore = scores[keys[0]].score;
	var username;
	for (var i = 0; i < keys.length; i++){
		var k = keys[i];
		var fscore = scores[k].score;
		if(fscore > highscore){
			highscore = fscore;
			username = scores[k].name;
		}
	}
	var user = document.getElementsByClassName('user-name')[0];
	var highestscore = document.getElementsByClassName('user-score')[0];
	var birdskilled = document.getElementsByClassName('birds-killed-number')[0];
	user.innerHTML = name;
	highestscore.innerHTML = highscore;
	birdskilled.innerHTML = keys.length;
}

function errData(err){
	console.log('Error');
	console.log(err);
}
//imgay
