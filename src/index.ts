import { Application, Sprite, Texture, Text, TextStyle, AnimatedSprite } from 'pixi.js'
import { TilingSprite } from 'pixi.js';
import { Explosion } from './Explosion';
import { Obstacle } from './Obstacle';
import { Player } from './Player';
import { Scene } from './Scene';
import { Star } from './Star';

const maxWidth = 1250;
const maxHeight = 700;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight
});

console.log(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const ratio = Math.min(width / app.renderer.width, height / app.renderer.height);
	app.view.style!.width = `${app.renderer.width * ratio}px`;
	app.view.style!.height = `${app.renderer.height * ratio}px`;
});

export const isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;

if (isMac) {
  console.log("MAC")
} else {
	console.log("Windows")
}

let x = 0;
let speed = 5;

let back_trees = new TilingSprite(Texture.from('../assets/forrest/back-trees1.png'), app.screen.width, app.screen.height)
let middle_trees = new TilingSprite(Texture.from('../assets/forrest/middle-trees.png'), app.screen.width, app.screen.height)
let front_trees = new TilingSprite(Texture.from('../assets/forrest/front-trees.png'), app.screen.width, app.screen.height)
let ground = new TilingSprite(Texture.from('../assets/forrest/ground.png'), 1300, 150)

let frame = Sprite.from('../assets/frame.png');
// frame.scale.set(1.24)
frame.width = window.innerWidth
frame.height = window.innerHeight

back_trees.tileScale.x = isMac ? 3.5 : 2.7 
back_trees.tileScale.y = isMac ? 5 : 3.5
back_trees.position.set(100, 130)

middle_trees.tileScale.x = isMac ? 3.7 : 3 
middle_trees.tileScale.y = isMac ? 4 : 3
middle_trees.position.set(100, 130)

// front_trees.tileScale.set(2,2.7)
front_trees.tileScale.x = isMac ? 2 : 2 
front_trees.tileScale.y = isMac ? 3.7 : 2.7
front_trees.position.set(100,130)

// ground.tileScale.set(1,1.5)
ground.tileScale.x = isMac ? 1 : 1
ground.tileScale.y = isMac ? 1.5 : 1.5
ground.position.set(300, isMac ? 630 : 490)
// const sceny: Scene = new Scene(app.screen.width, app.screen.height);


// app.stage.addChild(sceny);
app.stage.addChild(back_trees);
app.stage.addChild(middle_trees);
app.stage.addChild(front_trees);
app.stage.addChild(ground);

const playerTexture = AnimatedSprite.from('../assets/bird1.png')

const birdFrames = ["assets/bird/step1.png", "assets/bird/step2.png", "assets/bird/step3.png", "assets/bird/step4.png"];
const animation = new AnimatedSprite(birdFrames.map((bird) =>  Texture.from(bird) ))

const player = new Player(app, animation);

let start = true

const startText = new Text('Pixi - Bird')
startText.style = new TextStyle({
	fontFamily: 'CustomFont', fontSize: 70, fill: 0xFFFFFF 
})
startText.x = isMac ? 800 : 600;
startText.y = isMac ? 400 : 300;
app.stage.addChild(startText)

app.stage.addChild(frame);
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
