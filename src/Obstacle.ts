import { Application, ICanvas, Loader, Rectangle, Sprite, Text } from "pixi.js";
import {  } from 'pixi.js/'
import { Player } from "./Player";
import { Star } from "./Star";

export class Obstacle extends Sprite {

    obstacles: Array<Sprite> = [];
    velocity = 10;
    interval = 1;
    player: Player;
    star: Star;

    constructor(app: Application<ICanvas>, player: Player, star: Star) {
        super();

        this.player = player
        this.star = star
        this.update(app)
        
        // const loader = new Loader();
    }
    
    
    addObstacle(app: Application<ICanvas>){
        const obstacle = Sprite.from('../assets/bomb.png');
        obstacle.position.set(1500, Math.random() * (550 - 64) + 32)
        obstacle.interactive = true;
        obstacle.hitArea = new Rectangle(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);
        // obstacle.x -= -5;
        
        app.stage.addChild(obstacle);
        this.obstacles.push(obstacle);
    }  
    
    update(app: Application<ICanvas>){
        app.ticker.add(() => {
            if (this.interval % 50 === 0) {
                // console.log(Math.round(this.interval))
                this.addObstacle(app);
            }
            
            this.obstacles.forEach((obstacle) => {
                obstacle.position.x += - this.velocity;

                if(this.player.getBounds().intersects(obstacle.getBounds()) || this.star.getBounds().intersects(obstacle.getBounds())){
                    const gameOverText = new Text('Game Over', { fontFamily: 'Arial', fontSize: 70, fill: 0xFFFFFF })
                    gameOverText.x = 450;
                    gameOverText.y = 300;

                    this.player.end = true

                    app.stage.addChild(gameOverText)
                    // console.log(this.player.getBounds())
                    app.stage.removeChild(this.star);
                    // app.ticker.stop();

                }

                if(obstacle.position.x < -obstacle.width){
                    app.stage.removeChild(obstacle);
                    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)
                }
            })
            this.interval += 1
        })
    }

    addScore(){ 

    }

    
    rectsIntersect(a: Sprite, b: Sprite){
	
        let playerBox = a.getBounds();
        let obstacleBox = b.getBounds();

        // console.log(playerBox)
    
        return playerBox.x + playerBox.width > obstacleBox.x &&
                playerBox.x < obstacleBox.x + obstacleBox.width &&
                playerBox.y + playerBox.height > obstacleBox.y &&
                playerBox.y < obstacleBox.y + obstacleBox.height
    }

}