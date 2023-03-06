import { Sound } from '@pixi/sound';
import { Power0, TweenMax } from 'gsap';
import { Application, Sprite, Texture, Text, TextStyle, AnimatedSprite, Loader, Assets } from 'pixi.js'
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
	backgroundColor: '#4775ff',
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

let back_trees = new TilingSprite(Texture.from('../assets/background/Background.png'), 1000, 300)
let middle_trees = new TilingSprite(Texture.from('../assets/background/Middleground.png'), 1000, 250)
let front_trees = new TilingSprite(Texture.from('../assets/forrest/front-trees.png'), 1300, 500)
let ground = new TilingSprite(Texture.from('../assets/background/Foreground.png'), 1000, 150)

let frame = Sprite.from('../assets/frame.png');
frame.scale.set(1.35)
// frame.width = window.innerWidth
// frame.height = window.innerHeight

back_trees.tileScale.x =  0.4 
back_trees.tileScale.y =  0.4
back_trees.position.set(300, 180)

middle_trees.tileScale.x =  0.4 
middle_trees.tileScale.y =  0.4
middle_trees.position.set(300, 360)

// front_trees.tileScale.set(2,2.7)
front_trees.tileScale.x =  2 
front_trees.tileScale.y =  2.7
front_trees.position.set(100,120)

// ground.tileScale.set(1,1.5)
ground.tileScale.x =  1
ground.tileScale.y =  1.5
ground.position.set(300, 520)
// const sceny: Scene = new Scene(app.screen.width, app.screen.height);


// app.stage.addChild(sceny);
app.stage.addChild(back_trees);
app.stage.addChild(middle_trees);
// app.stage.addChild(front_trees);
app.stage.addChild(ground);

const playerTexture = AnimatedSprite.from('../assets/bird1.png')

const birdFrames = ["assets/bird/step1.png", "assets/bird/step2.png", "assets/bird/step3.png", "assets/bird/step4.png"];
const animation = new AnimatedSprite(birdFrames.map((bird) =>  Texture.from(bird) ))

const player = new Player(app, animation);

let start = true

const startText = new Text('Pixi - Bird')
const startTextSpace = new Text('Hit Space to Start')
const loader =  Assets.load("../assets/CustomFont.ttf");
loader.then(() => {
	startText.style = new TextStyle({
		fontFamily: 'CustomFont', fontSize: 100, fill: 0xFFFFFF 
	})
	startText.anchor.set(0.5);
	startText.x =  750;
	startText.y =  350;
	app.stage.addChild(startText)
	
	startTextSpace.style = new TextStyle({
		fontFamily: 'CustomFont', fontSize: 40, fill: 0xFFFFFF 
	})
	startTextSpace.anchor.set(0.5);
	startTextSpace.x =  750;
	startTextSpace.y =  420;
	app.stage.addChild(startTextSpace)

	const sound = Sound.from("../assets/gameSound.mp3");
    sound.loop = true
	sound.volume = 0.3
	sound.play()
})

TweenMax.fromTo(startText.scale, 1.5 , 
	{x: 0, y: 0},
	{x: 1.1, y: 1.1,
		ease: Power0.easeNone,
		repeat: 0,
		yoyo: true,
		// 	onComplete: () => {
	// 	app.stage.addChild(startTextSpace)
	// 	TweenMax.fromTo(startTextSpace.scale, 1,
	// 		{x: 0, y: 0},
	// 		{x: 1.1, y: 1.1,},
	// 	)
	// }
})

TweenMax.fromTo(startTextSpace.scale, 1.5 , 
	{x: 0, y: 0},
	{x: 1.1, y: 1.1,
		ease: Power0.easeNone,
		repeat: 0,
		yoyo: true,
	})
	
	app.stage.addChild(frame);
	// const explosion = new Explosion(app);
document.addEventListener("keydown", (event) => {
	if(event.code === 'Space'){
		if(start){
			start = false
			if(!start){
				const star = new Star(app, player)
				const obstacle = new Obstacle(app, player, star);
				
				TweenMax.fromTo([startTextSpace.scale, startText.scale], 1.5 , 
					{x: 1.1, y: 1.1},
					{x: 0, y: 0,
						ease: Power0.easeNone,
						repeat: 0,
						yoyo: true,
						onComplete: () => {
							app.stage.removeChild(startText)
							app.stage.removeChild(startTextSpace)

						}
					})
				}
			}
		}
	})
	
app.ticker.add((delta) => {
	x = (x + speed)
	front_trees.tilePosition.x = - x
	ground.tilePosition.x = - x
	middle_trees.tilePosition.x =  - x / 3 
	back_trees.tilePosition.x =  - x / 4
	
})
