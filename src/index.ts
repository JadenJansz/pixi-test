import { Sound } from '@pixi/sound';
import { Power0, TweenMax } from 'gsap';
import { Application, Sprite, Texture, Text, TextStyle, AnimatedSprite, Loader, Assets } from 'pixi.js'
import { TilingSprite } from 'pixi.js';
import { Obstacle } from './Obstacle';
import { Player } from './Player';
import { Star } from './Star';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: '#4775ff',
	width: window.innerWidth,
	height: window.innerHeight
});

export let BigS = false

window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const ratio = Math.min(width / app.renderer.width, height / app.renderer.height);
	app.view.style!.width = `${app.renderer.width * ratio}px`;
	app.view.style!.height = `${app.renderer.height * ratio}px`;

});

if(window.innerWidth > 1600 && window.innerHeight > 900){
	BigS = true
}else{
	BigS = false
}


let x = 0;
let speed = 5;

let sky = new TilingSprite(Texture.from('../assets/background/Sky.png'),BigS ? 1100 : 1000, 400)
let mountains = new TilingSprite(Texture.from('../assets/background/Background.png'), BigS ? 1100 : 1000, 300)
let middle = new TilingSprite(Texture.from('../assets/background/Middleground.png'), BigS ? 1100 : 1000, 250)
let front_trees = new TilingSprite(Texture.from('../assets/forrest/front-trees.png'), 1300, 500)
let ground = new TilingSprite(Texture.from('../assets/background/Foreground.png'), BigS ? 1100 : 1000, 150)

let frame = Sprite.from('../assets/frame.png');
frame.scale.set(BigS ? 1.75 : 1.4)

sky.tileScale.x =  0.4 
sky.tileScale.y =  0.4
sky.position.set(BigS ? 400 : 300, BigS ? 180 : 130)

mountains.tileScale.x =  0.4 
mountains.tileScale.y =  0.4
mountains.position.set(BigS ? 400 :300, BigS ? 300 : 180)

middle.tileScale.x =  0.4 
middle.tileScale.y =  0.4
middle.position.set(BigS ? 400 :300, BigS ? 460 : 360)

front_trees.tileScale.x =  2 
front_trees.tileScale.y =  2.7
front_trees.position.set(100,120)

ground.tileScale.x =  1
ground.tileScale.y =  1.5
ground.position.set(BigS ? 400 :300,BigS ? 650 : 520)

app.stage.addChild(sky);
app.stage.addChild(mountains);
app.stage.addChild(middle);
app.stage.addChild(ground);

const birdFrames = ["assets/bird/step1.png", "assets/bird/step2.png", "assets/bird/step3.png", "assets/bird/step4.png"];
const animation = new AnimatedSprite(birdFrames.map((bird) =>  Texture.from(bird) ))

const player = new Player(app, animation);

let start = true

const startText = Sprite.from("../assets/pixi-bird.png")
startText.anchor.set(0.5)
startText.x = BigS ? 940 : 750
startText.y = BigS ? 400 : 330
const startTextSpace = new Text('Hit Space to Start')
const loader =  Assets.load(["../assets/CustomFont.ttf", "../assets/explosion/Layer1.png", "../assets/explosion/Layer2.png", "../assets/explosion/Layer3.png", "../assets/explosion/Layer4.png", "../assets/explosion/Layer5.png", "../assets/explosion/Layer6.png"]);

loader.then(() => {
	app.stage.addChild(startText)
	
	startTextSpace.style = new TextStyle({
		fontFamily: 'CustomFont', fontSize: 40, fill: 0xFFFFFF,  stroke: "black", strokeThickness: 3
	})
	startTextSpace.anchor.set(0.5);
	startTextSpace.x = BigS ? 930 : 750;
	startTextSpace.y = BigS ? 500 : 420;
	app.stage.addChild(startTextSpace)

	const sound = Sound.from("../assets/gameSound.mp3");
    sound.loop = true
	sound.volume = 0.3
	sound.play()

	loadScene();
})

TweenMax.fromTo(startText.scale, 1.5 , 
	{x: 0, y: 0},
	{x: 0.15, y: 0.15,
		ease: Power0.easeNone,
		repeat: 0,
		yoyo: true,
})

TweenMax.fromTo(startTextSpace.scale, 1.5 , 
	{x: 0, y: 0},
	{x: 1.1, y: 1.1,
		ease: Power0.easeNone,
		repeat: 0,
		yoyo: true,
	})

function loadScene() {
	app.stage.addChild(frame);
	// const explosion = new Explosion(app);
	document.addEventListener("keydown", (event) => {
	if(event.code === 'Space'){
		if(start){
			start = false
			if(!start){
				const star = new Star(app, player)
				const obstacle = new Obstacle(app, player, star);
				TweenMax.fromTo([startText.scale], 1.5 , 
					{x: 0.15, y: 0.15},
					{x: 0, y: 0,
						ease: Power0.easeNone,
						repeat: 0,
						yoyo: true,
						onComplete: () => {
							app.stage.removeChild(startText)
							app.stage.removeChild(startTextSpace)
	
						}
					})

				TweenMax.fromTo([startTextSpace.scale], 1.5 , 
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
	sky.tilePosition.x = - x / 10
	front_trees.tilePosition.x = - x
	ground.tilePosition.x = - x
	middle.tilePosition.x =  - x / 3 
	mountains.tilePosition.x =  - x / 4
	
	})
	
}
	
