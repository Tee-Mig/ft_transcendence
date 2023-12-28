function welcomeMessage()
{
	console.log("Bienvenue sur notre magnifique ft_transcendence :)")
}

class PlayerDefaultProperties {
	_playerWidth: number;
	_playerHeight: number;
	_playerVelocityY: number;

	constructor(
		pongCanvasWidth: number,
		pongCanvasHeight: number,
		playerVelocityY: number = 0,
	) {
		this._playerWidth = pongCanvasWidth / 80;
		this._playerHeight = pongCanvasHeight / 4;
		this._playerVelocityY = playerVelocityY;
	}
}

class PlayerProperties {
	_x: number;
	_y: number;
	_width: number;
	_height: number;
	_speedY: number;
	_score: number;

	constructor(
		x: number,
		y: number,
		width: number,
		height: number,
		speedY: number,
		score: number = 0
	) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
		this._speedY = speedY;
		this._score = score;
	}
}

class BallProperties {
	_ballWidth: number;
	_ballHeight: number;
	_ballSpeed: number;

	_x: number;
	_y: number;
	_width: number;
	_height: number;
	_speedX: number;
	_speedY: number;
	_minSpeedX: number;
	_minSpeedY: number;
	_maxSpeedX: number;
	_maxSpeedY: number;

	constructor(
		pongCanvasWidth: number,
		pongCanvasHeight: number,
		playerWidth: number,
		ballSpeed: number = 1,
		direction: number = 1
	){
		this._ballWidth = playerWidth;
		this._ballHeight = playerWidth;
		this._ballSpeed = ballSpeed;
		this._x = pongCanvasWidth / 2;
		this._y = pongCanvasHeight / 2;
		this._width = this._ballWidth;
		this._height = this._ballHeight;
		this._speedX = pongCanvasWidth / 500 * ballSpeed * direction; // 1.92
		this._speedY = pongCanvasHeight / 250 * ballSpeed; // 2.16
		this._minSpeedX = this._speedX * 0.75;
		this._minSpeedY = this._speedY * 0.75;
		this._maxSpeedX = this._speedX * 2;
		this._maxSpeedY = this._speedY * 2;
	}
}

// default settings of pong
class PongData {
	readonly _pongCanvas: HTMLCanvasElement | null;
	readonly _context: CanvasRenderingContext2D | null;
	_pongCanvasWidth: number;
	_pongCanvasHeight: number;
	_playerDefaultProperties: PlayerDefaultProperties;
	_ballProperties: BallProperties;
	_player1Properties: PlayerProperties;
	_player2Properties: PlayerProperties;
	_fontSize: number;

	constructor(
		pongCanvas: HTMLCanvasElement,
		pongCanvasWidth: number = screen.width / 2,
		pongCanvasHeight: number = screen.height / 2,
		context: CanvasRenderingContext2D | null
	) {
		this._pongCanvas = pongCanvas;
		this._pongCanvasWidth = pongCanvasWidth;
		this._pongCanvasHeight = pongCanvasHeight;
		this._context = context;
		this._fontSize = pongCanvasWidth / 20;
		this._playerDefaultProperties = new PlayerDefaultProperties(pongCanvasWidth, pongCanvasHeight);
		this._ballProperties = new BallProperties(pongCanvasWidth, pongCanvasHeight,
			this._playerDefaultProperties._playerWidth);

		// init player1
		this._player1Properties = new PlayerProperties(
			this._pongCanvasWidth / 150,
			(this._pongCanvasHeight / 2) - (this._playerDefaultProperties._playerHeight / 2),
			this._playerDefaultProperties._playerWidth,
			this._playerDefaultProperties._playerHeight,
			this._playerDefaultProperties._playerVelocityY
		);
		// init player2
		this._player2Properties = new PlayerProperties(
			this._pongCanvasWidth - (this,this._pongCanvasWidth / 150) - this._playerDefaultProperties._playerWidth,
			(this._pongCanvasHeight / 2) - (this._playerDefaultProperties._playerHeight / 2),
			this._playerDefaultProperties._playerWidth,
			this._playerDefaultProperties._playerHeight,
			this._playerDefaultProperties._playerVelocityY
		);
	}
}

function criticalError(message: string)
{
	console.log("Error: " + message);
	throw Error(message);
}

window.onload = function()
{

	let pongCanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("pongCanvas");
	if (!pongCanvas)
		criticalError("canvas initialization");

	pongCanvas.width = screen.width / 2;
	pongCanvas.height = screen.height / 2;
	// pongCanvas.width = 1920;
	// pongCanvas.height = 1080;
	let context: CanvasRenderingContext2D | null = pongCanvas.getContext("2d");
	if (!context)
		criticalError("context initialization");

	let pongData: PongData = new PongData(pongCanvas, pongCanvas.width, pongCanvas.height, context);
	
	if (pongData._context)
	{
		// draw player1
		pongData._context.fillStyle = "violet";
		pongData._context.fillRect(
			pongData._player1Properties._x,
			pongData._player1Properties._y,
			pongData._player1Properties._width,
			pongData._player1Properties._height
		);

		// draw player2
		pongData._context.fillStyle = "violet";
		pongData._context.fillRect(
			pongData._player2Properties._x,
			pongData._player2Properties._y,
			pongData._player2Properties._width,
			pongData._player2Properties._height
		);
	}

	requestAnimationFrame(function() {
		update(pongData)
	});
	document.addEventListener("keydown", (e) => movePlayer(e, pongData));
	document.addEventListener("keyup", (e) => stopPlayer(e, pongData));
}

function update(pongData: PongData)
{
	requestAnimationFrame(function() {
		update(pongData);
	});
	if (pongData._context)
	{
		pongData._context.clearRect(0, 0, pongData._pongCanvasWidth, pongData._pongCanvasHeight);
		
		// draw player1
		pongData._context.fillStyle = "violet";
		if (!checkPlayerBounds(pongData._player1Properties._y + pongData._player1Properties._speedY, pongData))
			pongData._player1Properties._y += pongData._player1Properties._speedY;
		pongData._context.fillRect(pongData._player1Properties._x,
		pongData._player1Properties._y,
		pongData._player1Properties._width,
		pongData._player1Properties._height);
		
		// draw player1
		pongData._context.fillStyle = "violet";
		if (!checkPlayerBounds(pongData._player2Properties._y + pongData._player2Properties._speedY, pongData))
			pongData._player2Properties._y += pongData._player2Properties._speedY;
		pongData._context.fillRect(pongData._player2Properties._x,
			pongData._player2Properties._y,
			pongData._player2Properties._width,
			pongData._player2Properties._height);
			
		// ball
		pongData._context.fillStyle = "violet";
		pongData._ballProperties._x += pongData._ballProperties._speedX;
		pongData._ballProperties._y += pongData._ballProperties._speedY;
		pongData._context.fillRect(
			pongData._ballProperties._x,
			pongData._ballProperties._y,
			pongData._ballProperties._width,
			pongData._ballProperties._height
		);
		
		if (checkBallBoundsY(pongData._ballProperties._y + pongData._ballProperties._speedY, pongData))
			pongData._ballProperties._speedY *= -1;
		
		if (checkBallCollision(pongData._ballProperties, pongData._player1Properties, pongData) && pongData._ballProperties._speedX < 0)
		{
			console.log("COLLISION");
			if (pongData._ballProperties._x <= pongData._player1Properties._x + pongData._player1Properties._width)
			{
				updateDirectionPlayer1(whereBallHitPlayer(pongData._ballProperties, pongData._player1Properties), pongData._ballProperties, pongData);
				pongData._ballProperties._speedX *= -1;
			}
		}

		else if (checkBallCollision(pongData._ballProperties, pongData._player2Properties, pongData) && pongData._ballProperties._speedX > 0)
		{
			console.log("COLLISION");
			if (pongData._ballProperties._x + pongData._ballProperties._width >= pongData._player2Properties._x)
			{
				updateDirectionPlayer2(whereBallHitPlayer(pongData._ballProperties, pongData._player2Properties), pongData._ballProperties, pongData);
				pongData._ballProperties._speedX *= -1;
			}
		}

		if (pongData._ballProperties._x < 0)
		{
			pongData._player2Properties._score++;
			resetGame(1, pongData);
		}
		else if (pongData._ballProperties._x > pongData._pongCanvasWidth)
		{
			pongData._player1Properties._score++;
			resetGame(-1, pongData);
		}

		// draw score
		pongData._context.font = `${pongData._fontSize}px sans-serif`;
		pongData._context.fillText(
			pongData._player1Properties._score.toString(),
			pongData._pongCanvasWidth / 4.3,
			pongData._pongCanvasHeight / 9
		);
		pongData._context.fillText(
			pongData._player2Properties._score.toString(),
			pongData._pongCanvasWidth * 4 / 5 - pongData._pongCanvasWidth / 15,
			pongData._pongCanvasHeight / 9
		);

		// draw dotted line in the center
		for (let i = pongData._pongCanvasHeight / 50; i < pongData._pongCanvasHeight; i += pongData._pongCanvasWidth / 30)
		{
			pongData._context.fillRect(
				pongData._pongCanvasWidth / 2 - ((pongData._pongCanvasWidth / 160) / 2),
				i,
				pongData._pongCanvasWidth / 160,
				pongData._pongCanvasWidth / 160
			);
		}
	}
}

function degreeToRad(degree: number): number
{
	return (degree * (Math.PI / 180));
}

function updateDirectionPlayer1(playerSegment: string, ball: BallProperties, pongdata: PongData)
{
	let px: number | undefined;
	let py: number | undefined;

	if (playerSegment === "top")
	{
		console.log("top");
		px = ball._speedX * Math.cos(degreeToRad(45)) - ball._speedY * Math.sin(degreeToRad(45));
		py = ball._speedX * Math.sin(degreeToRad(45)) + ball._speedY * Math.sin(degreeToRad(45));
	}
	else if (playerSegment === "middleTop")
	{
		console.log("middleTop");
		px = ball._speedX * Math.cos(degreeToRad(15)) - ball._speedY * Math.sin(degreeToRad(15));
		py = ball._speedX * Math.sin(degreeToRad(15)) + ball._speedY * Math.sin(degreeToRad(15));
	}
	else if (playerSegment === "middle")
	{
		console.log("middle");
		px = ball._speedX * Math.cos(degreeToRad(0)) - ball._speedY * Math.sin(degreeToRad(0));
		py = ball._speedX * Math.sin(degreeToRad(0)) + ball._speedY * Math.sin(degreeToRad(0));
	}
	else if (playerSegment === "middleBottom")
	{
		console.log("middleBottom");
		px = ball._speedX * Math.cos(degreeToRad(-15)) - ball._speedY * Math.sin(degreeToRad(-15));
		py = ball._speedX * Math.sin(degreeToRad(-15)) + ball._speedY * Math.sin(degreeToRad(-15));
	}
	else
	{
		console.log("Bottom");
		px = ball._speedX * Math.cos(degreeToRad(-45)) - ball._speedY * Math.sin(degreeToRad(-45));
		py = ball._speedX * Math.sin(degreeToRad(-45)) + ball._speedY * Math.sin(degreeToRad(-45));
	}

	if (px < pongdata._ballProperties._minSpeedX)
		px = pongdata._ballProperties._minSpeedX;
	else if (px > pongdata._ballProperties._maxSpeedX)
		px = pongdata._ballProperties._maxSpeedX;
	else
		ball._speedX = px
	if (py < pongdata._ballProperties._minSpeedY)
		py = pongdata._ballProperties._minSpeedY;
	else if (py > pongdata._ballProperties._maxSpeedY)
		py = pongdata._ballProperties._maxSpeedY;
	else
		ball._speedY = py
}

function updateDirectionPlayer2(playerSegment: string, ball: BallProperties, pongdata: PongData)
{
	let px: number | undefined;
	let py: number | undefined;

	if (playerSegment === "top")
	{
		console.log("top");
		px = ball._speedX * Math.cos(degreeToRad(-45)) - ball._speedY * Math.sin(degreeToRad(45));
		py = ball._speedX * Math.sin(degreeToRad(-45)) + ball._speedY * Math.sin(degreeToRad(45));
	}
	else if (playerSegment === "middleTop")
	{
		console.log("middleTop");
		px = ball._speedX * Math.cos(degreeToRad(-15)) - ball._speedY * Math.sin(degreeToRad(15));
		py = ball._speedX * Math.sin(degreeToRad(-15)) + ball._speedY * Math.sin(degreeToRad(15));
	}
	else if (playerSegment === "middle")
	{
		console.log("middle");
		px = ball._speedX * Math.cos(degreeToRad(0)) - ball._speedY * Math.sin(degreeToRad(0));
		py = ball._speedX * Math.sin(degreeToRad(0)) + ball._speedY * Math.sin(degreeToRad(0));
	}
	else if (playerSegment === "middleBottom")
	{
		console.log("middleBottom");
		px = ball._speedX * Math.cos(degreeToRad(15)) - ball._speedY * Math.sin(degreeToRad(-15));
		py = ball._speedX * Math.sin(degreeToRad(15)) + ball._speedY * Math.sin(degreeToRad(-15));
	}
	else
	{
		console.log("Bottom");
		px = ball._speedX * Math.cos(degreeToRad(45)) - ball._speedY * Math.sin(degreeToRad(-45));
		py = ball._speedX * Math.sin(degreeToRad(45)) + ball._speedY * Math.sin(degreeToRad(-45));
	}

	if (px < pongdata._ballProperties._minSpeedX)
		px = pongdata._ballProperties._minSpeedX;
	else if (px > pongdata._ballProperties._maxSpeedX)
		px = pongdata._ballProperties._maxSpeedX;
	else
		ball._speedX = px
	if (py < pongdata._ballProperties._minSpeedY)
		py = pongdata._ballProperties._minSpeedY;
	else if (py > pongdata._ballProperties._maxSpeedY)
		py = pongdata._ballProperties._maxSpeedY;
	else
		ball._speedY = py
}

function whereBallHitPlayer(ball: BallProperties, player: PlayerProperties): string
{
	let playerSegment = Math.ceil(player._height / 5);

	if (ball._y < (player._y + playerSegment))
		return "top";
	else if (ball._y < (player._y + (playerSegment * 2)))
		return "middleTop";
	else if (ball._y < (player._y + (playerSegment * 3)))
		return "middle";
	else if (ball._y < (player._y + (playerSegment * 4)))
		return "middleBottom";
	else
		return "Bottom";
}

function stopPlayer(e: KeyboardEvent, pongData: PongData)
{
	//player1
	if (e.code == "KeyW" || e.code == "KeyS")
		pongData._player1Properties._speedY = 0;

	//player2
	if (e.code == "ArrowUp" || e.code == "ArrowDown")
		pongData._player2Properties._speedY = 0;
}

function movePlayer(e: KeyboardEvent, pongData: PongData)
{
	//player1
	if (e.code == "KeyW")
		pongData._player1Properties._speedY = -(pongData._pongCanvasWidth / 500);
	else if(e.code == "KeyS")
		pongData._player1Properties._speedY = (pongData._pongCanvasWidth / 500);

	//player2
	if (e.code == "ArrowUp")
		pongData._player2Properties._speedY = -(pongData._pongCanvasWidth / 500);
	else if(e.code == "ArrowDown")
		pongData._player2Properties._speedY = (pongData._pongCanvasWidth / 500);
}

function checkPlayerBounds(nextPositionPlayerY: number, pongData: PongData): boolean
{
	return (nextPositionPlayerY < 0 || nextPositionPlayerY + pongData._playerDefaultProperties._playerHeight > pongData._pongCanvasHeight);
}

function checkBallCollision(ballPos: BallProperties, playerPos: PlayerProperties, pongData: PongData): boolean
{
	return	((ballPos._x + ballPos._width + 3) > playerPos._x)
			&& (ballPos._x < (playerPos._x + playerPos._width + 3))
			&& (ballPos._y < (playerPos._y + playerPos._height + 3))
			&& ((ballPos._y + ballPos._height + 3) > playerPos._y)
}

function checkBallBoundsY(nextPositionBallY: number, pongData: PongData): boolean
{
	return (nextPositionBallY < 0 || nextPositionBallY > pongData._pongCanvasHeight);
}

function resetGame(direction: number, pongData: PongData)
{
	pongData._ballProperties = new BallProperties(pongData._pongCanvasWidth, pongData._pongCanvasHeight,
		pongData._playerDefaultProperties._playerWidth, undefined, direction);
}

welcomeMessage()