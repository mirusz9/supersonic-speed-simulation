const width = 1200;
const height = 500;
const soundSpeed = 3;
const dotSpeed = 0;
let dotAcceleration = 0;

let dot = {
	x: 10,
	y: height / 2,
	v: dotSpeed,
};

let soundWaves = [];

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

	if (i % 5 == 0) {
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

	fill('#06f');
	noStroke();
	arc(dot.x, dot.y, 10, 10, 0, TWO_PI);

	dot.v += dotAcceleration;
	dot.x += dot.v;
	i++;
}

const startingSpeedButton = document.getElementById('startingSpeed');
const accelerationButton = document.getElementById('acceleration');
document.getElementById('restart').addEventListener('click', () => {
	soundWaves = [];
	dot = {
		x: 10,
		y: height / 2,
		v: +startingSpeedButton.value / 100,
	};
	dotAcceleration = +accelerationButton.value / 100;
	loop();
});

document.getElementById('stop').addEventListener('click', () => {
	noLoop();
});
