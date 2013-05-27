window.onload = function(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//get dimessions
	var w = canvas.offsetWidth;
	var h = canvas.offsetHeight;

	

	//particles
	var maxParticle = 100;
	var particles = [];

	//player
	var player = new Rectangle(w / 2, w /2, 10, 10);
	player.speed = 5;


	//init particles
	for(var i = 0; i < maxParticle; i++)
	{
		particles.push({
			x: Math.random() * w,
			y: Math.random() * h - h, //start on top screen
			r: Math.random() * 4 + 2, //radius
			d: Math.random() * maxParticle //density
		});
	}

	// Handle keyboard controls
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);



	function draw()
	{
		//clear context
		ctx.clearRect(0, 0, w, h);

		//draw the canvas
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		//draw particles
		ctx.fillStyle = "rgba(22, 55, 221, 0.8)";
		ctx.beginPath();
		for (var i = 0; i < maxParticle; i++)
		{
			var particle = particles[i];
			ctx.moveTo(particle.x, particle.y);
			ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
		}
		ctx.fill();

		player.Draw(ctx, "rgba(122, 15, 21, 0.8)");

		update();
	}


	//move all particles
	var angle = 0;
	function update()
	{
		if (38 in keysDown) { // Player holding up
			player.y -= 1 * player.speed;
		}
		if (40 in keysDown) { // Player holding down
			player.y += 1 * player.speed;
		}
		if (37 in keysDown) { // Player holding left
			player.x -= 1 * player.speed;
		}
		if (39 in keysDown) { // Player holding right
			player.x += 1 * player.speed;
		}


		if(player.x < 0)
			player.x = 0;
		if(player.y < 0)
			player.y = 0;
		if(player.x + player.w > w)
			player.x = w - player.w;
		if(player.y + player.h > h)
			player.y = h - player.h;


		angle += 0.01;
		for (var i = 0; i < maxParticle; i++)
		{
			var particle = particles[i];
			particle.y += Math.cos(angle+particle.d) + 1 + particle.r / 2;
			particle.x += Math.sin(angle) * 2;

			//particles back on the top when its move out the screen.
			if(particle.x > w + 5 || particle.y > h)
			{
				if(i%3 > 0) //75% of the flakes
				{
					particles[i] = {
						x: Math.random() * w,
						y: -10,
						r: particle.r,
						d: particle.d
					};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {
							x: -5,
							y: Math.random() * h,
							r: particle.r,
							d: particle.d
						};
					}
					else
					{
						//Enter from the right
						particles[i] = {
							x: w+5,
							y: Math.random() * h,
							r: particle.r,
							d: particle.d
						};
					}
				}

				
			}
		}
	}

	//call draw every 33 millisecond
	setInterval(draw, 33);
}