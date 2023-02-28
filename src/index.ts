import { Application, Sprite, Texture } from 'pixi.js'
import { TilingSprite } from 'pixi.js';
import { Obstacle } from './Obstacle';
import { Player } from './Player';
import { Scene } from './Scene';
import { Star } from './Star';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1250,
	height: 700
});

let x = 0;
let speed = 2;

let back_trees = new TilingSprite(Texture.from('../assets/forrest/back-trees1.png'), app.screen.width, app.screen.height)
let middle_trees = new TilingSprite(Texture.from('../assets/forrest/middle-trees.png'), app.screen.width, app.screen.height)
let front_trees = new TilingSprite(Texture.from('../assets/forrest/front-trees.png'), app.screen.width, app.screen.height)
let ground = new TilingSprite(Texture.from('../assets/forrest/ground.png'), 1300, 150)


back_trees.tileScale.set(3.5,5)
middle_trees.tileScale.set(3.7,4.5)
front_trees.tileScale.set(2,4.5)
ground.tileScale.set(1,1.5)
ground.position.set(-15,580)
// const sceny: Scene = new Scene(app.screen.width, app.screen.height);


// app.stage.addChild(sceny);
app.stage.addChild(back_trees);
app.stage.addChild(middle_trees);
app.stage.addChild(front_trees);
app.stage.addChild(ground);

const playerTexture = Texture.from('../assets/bird.png')

const player = new Player(app, playerTexture);

console.log(player.getBounds())

const star = new Star(app, player)

const obstacle = new Obstacle(app, player, star);



app.ticker.add((delta) => {
	x = (x + speed)
	front_trees.tilePosition.x = - x
	ground.tilePosition.x = - x
	middle_trees.tilePosition.x =  - x / 2 
	back_trees.tilePosition.x =  - x / 3

	
	
})