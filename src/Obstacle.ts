import { Application, ICanvas, Rectangle, Sprite, Text, TextStyle } from "pixi.js";
import { Loader } from "pixi.js";
import { isMac } from ".";
import { Explosion } from "./Explosion";
import { Player } from "./Player";
import { Star } from "./Star";

export class Obstacle extends Sprite {

    obstacles: Array<Sprite> = [];
    velocity = 8;
    interval = 1;
    player: Player;
    star: Star;
    animation = false

    constructor(app: Application<ICanvas>, player: Player, star: Star) {
        super();

        this.player = player
        this.star = star
        this.update(app)
        
        console.log(player.getBounds())
    }
    
    
    addObstacle(app: Application<ICanvas>){
        const obstacle = Sprite.from('../assets/bomb.png');
        obstacle.position.set(1100, Math.random() * ((isMac ? 450 : 440 )- (isMac ? 140 : 150)) + (isMac ? 140 : 150))
        obstacle.scale.x = 0.7
        obstacle.scale.y = 0.7
        obstacle.interactive = true;
        obstacle.hitArea = new Rectangle(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);
        // obstacle.x -= -5;
        
        app.stage.addChildAt(obstacle, 5);
        this.obstacles.push(obstacle);
    }  
    
    update(app: Application<ICanvas>){
        app.ticker.add(() => {
            if (this.interval % 80 === 0) {
                // console.log(Math.round(this.interval))
                this.addObstacle(app);
            }
            this.obstacles.forEach((obstacle) => {
                obstacle.position.x += - this.velocity;

                // console.log(this.player.getBounds())
                if(this.player.bounds.getBounds().intersects(obstacle.getBounds()) ||   this.star.getBounds().intersects(obstacle.getBounds())){
                    // app.stage.removeChild(this.player);
                    const gameOverText = new Text('Game Over !!')
                    
                    gameOverText.style = new TextStyle({
                        fontFamily: 'CustomFont', fontSize: 90, fill: 0xFFFFFF 
                    })
                    gameOverText.x = isMac ? 550 : 600;
                    gameOverText.y = isMac ? 300 : 300;


                    this.player.end = true

                    if(!this.animation){
                        this.animation = true
                        const explosion = new Explosion(app, obstacle.x, obstacle.y)
                        // explosion.playerDead(this.player.bounds.x, this.player.bounds.y); 
                        setTimeout(() => {
                            app.ticker.stop();
                        }, 1500)
                    }

                    app.stage.addChild(gameOverText)
                    // console.log(this.player.getBounds())
                    app.stage.removeChild(obstacle);
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