import { Application, ICanvas, Rectangle, Sprite, Text, TextStyle } from "pixi.js";
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
        obstacle.position.set(1200, Math.random() * (440 - 150) + 150)
        obstacle.scale.x = 0.45
        obstacle.scale.y = 0.45
        obstacle.interactive = true;
        obstacle.hitArea = new Rectangle(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);
        
        app.stage.addChildAt(obstacle, 5);
        this.obstacles.push(obstacle);
    }  
    
    update(app: Application<ICanvas>){
        app.ticker.add(() => {
            if (this.interval % 80 === 0) {
                this.addObstacle(app);
            }
            this.obstacles.forEach((obstacle) => {
                obstacle.position.x += - this.velocity;

                if(this.player.bounds.getBounds().intersects(obstacle.getBounds())){
                    const gameOverText = new Text('Game Over !!')
                    
                    gameOverText.style = new TextStyle({
                        fontFamily: 'CustomFont', fontSize: 90, fill: 0xFFFFFF, stroke: "black", strokeThickness: 4
                    })
                    gameOverText.x = 600;
                    gameOverText.y = 300;


                    this.player.end = true

                    if(!this.animation){
                        this.animation = true
                        const explosion = new Explosion(app, obstacle.x, obstacle.y)
                        
                        setTimeout(() => {
                            app.ticker.stop();
                        }, 1500)
                    }

                    app.stage.addChild(gameOverText)
                    app.stage.removeChild(obstacle);

                }


                if(this.star.getBounds().intersects(obstacle.getBounds())){

                }

                if(obstacle.position.x < -obstacle.width){
                    app.stage.removeChild(obstacle);
                    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)
                }
            })
            this.interval += 1
        })
    }

}