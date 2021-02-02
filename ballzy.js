
const canvas = document.getElementById('main');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

const ctx = canvas.getContext('2d');

class Ball {
	constructor (x, y, angle, radius, dx, dy, dw) {
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.red = Math.random() * 200;
		this.green = Math.random() * 200;
		this.blue = Math.random() * 200;
		this.color1 = `rgb(${this.red}, ${this.green}, ${this.blue})`;
		this.color2 = `rgb(${this.red + 45}, ${this.green + 45}, ${this.blue + 45})`;
		this.dx = dx;
		this.dy = dy;
		this.dw = dw;
		this.draw;
	}
	draw() {

// Handle collisions

		if (this.x - this.radius + this.dx <= 0 || 
			this.x + this.radius + this.dx >= canvas.width) this.dx *= -1;
		if (this.y - this.radius + this.dy <= 0 || 
			this.y + this.radius + this.dy >= canvas.height) this.dy *= -1;

// Update the ball's position and rotation

		this.x += this.dx;
		this.y += this.dy;
		const newAngle = this.angle += this.dw;
		this.angle = (newAngle > 360 ? 360 - newAngle : (newAngle < 0 ? 360 + newAngle : newAngle));
		
		ctx.save();
		ctx.fillStyle = this.color1;
		ctx.translate(this.x, this.y);
		ctx.rotate((Math.PI / 180) * this.angle);
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = this.color2;
		ctx.arc(0, 0, this.radius, Math.PI, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();	
	}
}

function clrscr() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
//	clrscr();

	balls.forEach(ball => ball.draw());
	requestAnimationFrame(draw);
}

const balls = [];
for (let count = 1; count <= 100; count++) {
	const minSize = 5;
	const variation = 40;
	const radius = (Math.random() * variation) + minSize;
	const maxVelocity = variation - radius;
	const x = Math.random() * (canvas.width - 2 * radius) + radius;
	const y = Math.random() * (canvas.height - 2 * radius) + radius;
	const angle = Math.random() * 360;
	const dx = Math.random() * maxVelocity * (Math.random() > .5 ? 1 : -1);
	const dy = Math.random() * maxVelocity * (Math.random() > .5 ? 1 : -1);
	const dw = ((Math.random() * 10) + 5) * (Math.random() > .5 ? 1 : -1);
	balls.push(new Ball(x, y, angle, radius, dx, dy, dw));
}
draw();