function welcomeMessage()
{
	console.log("Bienvenue sur notre magnifique ft_transcendence :)")
}

// default settings of pong
let pongCanvas;
let pongCanvasWidth = screen.width / 2;
let pongCanvasHeight = screen.height / 2;
let context;

let playerWidth = pongCanvasWidth / 80;
let playerHeight =  pongCanvasHeight / 4;
let playerVelocityY = 0;

// ball
let ballWidth = playerWidth;
let ballHeight = playerWidth;
let ballSpeed =  1;


let ball =
{
	x: pongCanvasWidth / 2,
	y: pongCanvasHeight / 2,
	width: ballWidth,
	height: ballHeight,
	speedX: pongCanvasWidth / 500 * ballSpeed, // 1.92
	speedY: pongCanvasHeight / 250 * ballSpeed // 2.16
}

// players
let player1 =
{
	x: pongCanvasWidth / 150,
	y: (pongCanvasHeight / 2) - (playerHeight / 2),
	width: playerWidth,
	height: playerHeight,
	speedY: playerVelocityY
}

let player2 =
{
	x: pongCanvasWidth - (pongCanvasWidth / 150) - playerWidth,
	y: (pongCanvasHeight / 2) - (playerHeight / 2),
	width: playerWidth,
	height: playerHeight,
	speedY: playerVelocityY
}

window.onload = function()
{
	const pongCanvas = document.getElementById("pongCanvas");
	pongCanvas.height = pongCanvasHeight;
	pongCanvas.width = pongCanvasWidth;
	context = pongCanvas.getContext("2d");

	// draw player1
	context.fillStyle = "violet";
	context.fillRect(player1.x, player1.y, player1.width, player1.height);

	context.fillStyle = "violet";
	context.fillRect(player2.x, player2.y, player2.width, player2.height);

	requestAnimationFrame(update);
	document.addEventListener("keydown", movePlayer);
	document.addEventListener("keyup", stopPlayer);
}

// window.addEventListener('mousemove', function(e)
// {
// 	const mousePosText = this.document.getElementById('mousePos')
// 	let mousePos =
// 	{
// 		x: undefined,
// 		y: undefined
// 	};
// 	window.addEventListener('mousemove', (e) =>
// 	{
// 		mousePos =
// 		{
// 			x: e.clientX,
// 			y: e.clientY
// 		};
// 		mousePosText.textContent = `mouse position = ${mousePos.x}, ${mousePos.y}`;
// 	})
// });

function update()
{
	requestAnimationFrame(update);
	context.clearRect(0, 0, pongCanvasWidth, pongCanvasHeight);

	// draw player1
	context.fillStyle = "violet";
	if (!checkPlayerBounds(player1.y + player1.speedY))
		player1.y += player1.speedY;
	context.fillRect(player1.x, player1.y, player1.width, player1.height);

	// draw player2
	context.fillStyle = "violet";
	if (!checkPlayerBounds(player2.y + player2.speedY))
		player2.y += player2.speedY;
	context.fillRect(player2.x, player2.y, player2.width, player2.height);

	// ball
	context.fillStyle = "violet";
	ball.x += ball.speedX;
	ball.y += ball.speedY;
	context.fillRect(ball.x, ball.y, ball.width, ball.height);

	if (checkBallBoundsY(ball.y + ball.speedY))
		ball.speedY *= -1;

	if (checkBallCollision(ball, player1) && ball.speedX < 0)
	{
		console.log("COLLISION");
		if (ball.x <= player1.x + player1.width)
		{
			updateDirectionPlayer1(whereBallHitPlayer(ball, player1), ball);
			ball.speedX *= -1;
		}
	}
	if (checkBallCollision(ball, player2) && ball.speedX > 0)
	{
		console.log("COLLISION");
		if (ball.x + ball.width >= player2.x)
		{
			updateDirectionPlayer2(whereBallHitPlayer(ball, player2), ball);
			// console.log("COLLISION 2");
			ball.speedX *= -1;
		}
	}
}

function degreeToRad(degree)
{
	return (degree * (Math.PI / 180));
}

function updateDirectionPlayer1(playerSegment, ball)
{
	let px;
	let py;
	if (playerSegment === "top")
	{
		console.log("top");
		px = ball.speedX * Math.cos(degreeToRad(45)) - ball.speedY * Math.sin(degreeToRad(45));
		py = ball.speedX * Math.sin(degreeToRad(45)) + ball.speedY * Math.sin(degreeToRad(45));
	}
	else if (playerSegment === "middleTop")
	{
		console.log("middleTop");
		px = ball.speedX * Math.cos(degreeToRad(15)) - ball.speedY * Math.sin(degreeToRad(15));
		py = ball.speedX * Math.sin(degreeToRad(15)) + ball.speedY * Math.sin(degreeToRad(15));
	}
	else if (playerSegment === "middle")
	{
		console.log("middle");
		px = ball.speedX * Math.cos(degreeToRad(0)) - ball.speedY * Math.sin(degreeToRad(0));
		py = ball.speedX * Math.sin(degreeToRad(0)) + ball.speedY * Math.sin(degreeToRad(0));
	}
	else if (playerSegment === "middleBottom")
	{
		console.log("middleBottom");
		px = ball.speedX * Math.cos(degreeToRad(-15)) - ball.speedY * Math.sin(degreeToRad(-15));
		py = ball.speedX * Math.sin(degreeToRad(-15)) + ball.speedY * Math.sin(degreeToRad(-15));
	}
	else if (playerSegment === "Bottom")
	{
		console.log("Bottom");
		px = ball.speedX * Math.cos(degreeToRad(-45)) - ball.speedY * Math.sin(degreeToRad(-45));
		py = ball.speedX * Math.sin(degreeToRad(-45)) + ball.speedY * Math.sin(degreeToRad(-45));
	}

	console.log("speedX before = " + ball.speedX);
	console.log("speedY before = " + ball.speedY);
	ball.speedX = px
	ball.speedY = py
	console.log("speedX after = " + ball.speedX);
	console.log("speedY after = " + ball.speedY);
}

function updateDirectionPlayer2(playerSegment, ball)
{
	let px;
	let py;
	if (playerSegment === "top")
	{
		console.log("top");
		px = ball.speedX * Math.cos(degreeToRad(-45)) - ball.speedY * Math.sin(degreeToRad(45));
		py = ball.speedX * Math.sin(degreeToRad(-45)) + ball.speedY * Math.sin(degreeToRad(45));
	}
	else if (playerSegment === "middleTop")
	{
		console.log("middleTop");
		px = ball.speedX * Math.cos(degreeToRad(-15)) - ball.speedY * Math.sin(degreeToRad(15));
		py = ball.speedX * Math.sin(degreeToRad(-15)) + ball.speedY * Math.sin(degreeToRad(15));
	}
	else if (playerSegment === "middle")
	{
		console.log("middle");
		px = ball.speedX * Math.cos(degreeToRad(0)) - ball.speedY * Math.sin(degreeToRad(0));
		py = ball.speedX * Math.sin(degreeToRad(0)) + ball.speedY * Math.sin(degreeToRad(0));
	}
	else if (playerSegment === "middleBottom")
	{
		console.log("middleBottom");
		px = ball.speedX * Math.cos(degreeToRad(15)) - ball.speedY * Math.sin(degreeToRad(-15));
		py = ball.speedX * Math.sin(degreeToRad(15)) + ball.speedY * Math.sin(degreeToRad(-15));
	}
	else if (playerSegment === "Bottom")
	{
		console.log("Bottom");
		px = ball.speedX * Math.cos(degreeToRad(45)) - ball.speedY * Math.sin(degreeToRad(-45));
		py = ball.speedX * Math.sin(degreeToRad(45)) + ball.speedY * Math.sin(degreeToRad(-45));
	}
	
	console.log("speedX before = " + ball.speedX);
	console.log("speedY before = " + ball.speedY);
	ball.speedX = px
	ball.speedY = py
	console.log("speedX after = " + ball.speedX);
	console.log("speedY after = " + ball.speedY);
}

function whereBallHitPlayer(ball, player)
{
	let playerSegment = Math.ceil(player.height / 5);

	if (ball.y < (player.y + playerSegment))
		return "top";
	else if (ball.y < (player.y + (playerSegment * 2)))
		return "middleTop";
	else if (ball.y < (player.y + (playerSegment * 3)))
		return "middle";
	else if (ball.y < (player.y + (playerSegment * 4)))
		return "middleBottom";
	else if (ball.y < (player.y + (playerSegment * 5)))
		return "Bottom";
}

function stopPlayer(e)
{
	//player1
	if (e.code == "KeyW" || e.code == "KeyS")
		player1.speedY = 0;

	//player2
	if (e.code == "ArrowUp" || e.code == "ArrowDown")
		player2.speedY = 0;
}

function movePlayer(e)
{
	//player1
	if (e.code == "KeyW")
		player1.speedY = -(pongCanvasWidth / 500);
	else if(e.code == "KeyS")
		player1.speedY = (pongCanvasWidth / 500);

	//player2
	if (e.code == "ArrowUp")
		player2.speedY = -(pongCanvasWidth / 500);
	else if(e.code == "ArrowDown")
		player2.speedY = (pongCanvasWidth / 500);
}

function checkPlayerBounds(nextPositionPlayerY)
{
	return (nextPositionPlayerY < 0 || nextPositionPlayerY + playerHeight > pongCanvasHeight);
}

function checkBallCollision(ballPos, playerPos)
{
	return	((ballPos.x + ballPos.width + 3) > playerPos.x)
			&& (ballPos.x < (playerPos.x + playerPos.width + 3))
			&& (ballPos.y < (playerPos.y + playerPos.height + 3))
			&& ((ballPos.y + ballPos.height + 3) > playerPos.y)
}

function checkBallBoundsY(nextPositionBallY)
{
	return (nextPositionBallY < 0 || nextPositionBallY > pongCanvasHeight);
}

welcomeMessage()

