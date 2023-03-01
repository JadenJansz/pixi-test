import { Application, Sprite, Texture, Text, TextStyle } from 'pixi.js'
import { TilingSprite } from 'pixi.js';
import { Explosion } from './Explosion';
import { Obstacle } from './Obstacle';
import { Player } from './Player';
import { Scene } from './Scene';
import { Star } from './Star';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1150,
	height: 650
});

let x = 0;
let speed = 5;

let back_trees = new TilingSprite(Texture.from('../assets/forrest/back-trees1.png'), app.screen.width, app.screen.height)
let middle_trees = new TilingSprite(Texture.from('../assets/forrest/middle-trees.png'), app.screen.width, app.screen.height)
let front_trees = new TilingSprite(Texture.from('../assets/forrest/front-trees.png'), app.screen.width, app.screen.height)
let ground = new TilingSprite(Texture.from('../assets/forrest/ground.png'), 1300, 150)

let frame = Sprite.from('../assets/frame.png');

back_trees.tileScale.set(3.5,5)
middle_trees.tileScale.set(3.7,4.5)
front_trees.tileScale.set(2,4.5)
ground.tileScale.set(1,1.5)
ground.position.set(-15,550)
// const sceny: Scene = new Scene(app.screen.width, app.screen.height);


// app.stage.addChild(sceny);
app.stage.addChild(back_trees);
app.stage.addChild(middle_trees);
app.stage.addChild(front_trees);
app.stage.addChild(ground);
// app.stage.addChild(frame);

const playerTexture = Texture.from('../assets/bird.png')

const player = new Player(app, playerTexture);

let start = true

const startText = new Text('Jungle - Pixi')
startText.style = new TextStyle({
	fontFamily: 'CustomFont', fontSize: 70, fill: 0xFFFFFF 
})
startText.x = 400;
startText.y = 280;
app.stage.addChild(startText)

// const explosion = new Explosion(app);

app.ticker.add((delta) => {
	x = (x + speed)
	front_trees.tilePosition.x = - x
	ground.tilePosition.x = - x
	middle_trees.tilePosition.x =  - x / 2 
	back_trees.tilePosition.x =  - x / 3
	
	document.addEventListener("keydown", (event) => {
		if(event.code === 'Space'){
			if(start){
				console.log("lil")
				start = false
				if(!start){
					console.log("lol")
					const star = new Star(app, player)
					
					const obstacle = new Obstacle(app, player, star);
					app.stage.removeChild(startText)
				}
			}
		}
	})
	
})