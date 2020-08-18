const width = 1200;
const height = 500;
const soundSpeed = 2;
let dotSpeed = 0.5;
const dotAcceleration = 0.001;

const dot = {
	x: 10,
	y: height / 2,
	v: 1,
};

const soundWaves = [];

class soundWave {
	constructor(x) {
		this.x = x;
		this.y = height / 2;
		this.r = 0;
		this.dur = 1000;
		this.a = this.dur - this.r;
	}

	update() {
		this.r += soundSpeed;
		this.a = this.dur - this.r;
	}
}

function setup() {
	createCanvas(width, height);
}

let i = 0;
function draw() {
	background(100);
	fill('#06f');
	noStroke();
	arc(dot.x, dot.y, 10, 10, 0, TWO_PI);

	if (i % 10 == 0) {
		soundWaves.push(new soundWave(dot.x));
	}

	for (const soundWave of soundWaves) {
		if (soundWave.a < 1) {
			soundWaves.splice(soundWaves.indexOf(soundWave), 1);
			continue;
		}
		soundWave.update();
		noFill();
		stroke(
			`rgba(0, 255, 0, ${Math.round((soundWave.a / soundWave.dur) * 20) / 20})`
		);
		arc(soundWave.x, soundWave.y, soundWave.r, soundWave.r, 0, TWO_PI);
	}
	dotSpeed += dotAcceleration;
	dot.x += dotSpeed;
	i++;
}

function mousePressed() {
	noLoop();
}
