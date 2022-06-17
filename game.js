class Game {
    constructor(){
        this.background = new Background();
        this.squirrel = new Squirrel();
        this.treasureNuts = [];
        this.background.backgroundImages = [];
        this.treasureNutImage;
    }

    preload(){
        this.background.backgroundStableImage = loadImage('/images/background0.png')
        this.background.backgroundImages = [ 
            {src: loadImage('images/background1.png'), x:0, speed: 1},
            {src: loadImage('images/background2.png'), x:0, speed: 2}, 
            {src: loadImage('images/background3.png'), x:0, speed: 3},
            {src: loadImage('images/background4.png'), x:0, speed: 4}
        ];
        this.squirrel.image = loadImage('images/Pngtree—squirrel_7189362.png');
        this.treasureNutImage = loadImage('images/Pngtree—acorn.png')
    }

    draw(){
        this.background.draw();
        //this.treasureNuts.draw();
        this.squirrel.draw();

        if (frameCount % 110 === 0) {
			// every 110th frame count, a new nut appears
            //so, it determines the frequency of the apperance of the nuts
			this.treasureNuts.push(new TreasureNut(this.treasureNutImage))
			//console.log(this.treasureNuts)
		}

		// iterate over the obstacles array and call the draw function for 
		// every obstacle
		this.treasureNuts.forEach(function (nut) {
			nut.draw()
		})

        this.treasureNuts = this.treasureNuts.filter((nut) => {
			// for 'this' to have the right context here (being the Game object)
			// we have to use an arrow function for the callback
		    //console.log(this)
            //collision var mı ya da x çoktan canvastan çıkmış mı
            //if statement ile kontrol ediyoruz:
			if (nut.checkCollision(this.squirrel) || nut.x < 0) {
				return false
			} else {
				return true
			}
		})         
    }
}

class Squirrel {
    constructor(){
        this.x = 0;
        this.y = 540;
        this.gravity = 0.3;
        this.velocity = 0;
        this.width = 100;
        this.height = 100;
        this.image;
    }

    draw(){
        this.velocity += this.gravity
		this.y += this.velocity
		
		if (this.y >= height - this.height) {
			this.y = height - this.height
		}

        image(this.image, this.x, this.y, this.width, this.height)
    }
    
    jump(){
       this.velocity = -15;   
    }
    }


class TreasureNut {
    constructor(image){
        this.image = image;
        this.x = width - 50;
        this.y = Math.random() * 640 / 2;
        this.width = 50;
        this.height = 50;
      }
    //we put image as a parameter here, because we defined it in js:4 as
    //an empty array.

    draw(){
        this.x -=3;
        image(this.image, this.x, this.y, this.width, this.height)
    }

	checkCollision(squirrelsCoordinate) {
		// console.log('colission', squirrelsCoordinate)

		// find the center of the treasureNuts
		const obstacleX = (this.x + this.width) / 2
		const obstacleY = (this.y + this.height) / 2
		// find the center of the squirrel
		const squirrelX = (squirrelsCoordinate.x + squirrelsCoordinate.width) / 2
		const squirrelY = (squirrelsCoordinate.y + squirrelsCoordinate.height) / 2

		if (dist(obstacleX, obstacleY, squirrelX, squirrelY) > 25) {
			return false
		} else {
			// we have a colission
			// console.log('colission')
			return true
		}
    }
}

class Background {
     constructor(){
      this.backgroundStableImage;
    }
        
	draw() {
        image(this.backgroundStableImage, 0, 0, 1088, 640)
        game.background.backgroundImages.forEach(function (img) {
			img.x -= img.speed
			image(img.src, img.x, 0, width, height)
			image(img.src, img.x + width, 0, width, height)
			if (img.x <= - width) {
				img.x = 0
			}
		})
	}
}
 //console.log((Math.random() * 640) / 2)




