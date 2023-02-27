import { Application, ICanvas, Rectangle, Sprite } from "pixi.js";
import { Player } from "./Player";

export class Obstacle extends Sprite {

    obstacles: Array<Sprite> = [];
    velocity = 2;
    interval = 1;
    player: Player;

    constructor(app: Application<ICanvas>, player: Player) {
        super();
        // this.update(app);
        this.player = player
        console.log(this.player)
        this.update(app)
    }
    
    
    addObstacle(app: Application<ICanvas>){
        const obstacle = Sprite.from('../assets/bomb.png');
        obstacle.position.set(1500, Math.random() * (550 - 64) + 32)
        obstacle.interactive = true;
        obstacle.hitArea = new Rectangle(-obstacle.width / 2, -obstacle.height / 2, 100, 100);
        // obstacle.x -= -5;
        
        app.stage.addChild(obstacle);
        this.obstacles.push(obstacle);
    }
    
    update(app: Application<ICanvas>){
        app.ticker.add(() => {
            if (this.interval % 155 === 0) {
                // console.log(Math.round(this.interval))
                this.addObstacle(app);
            }
            
            this.obstacles.forEach((obstacle) => {
                obstacle.position.x += - this.velocity;
                // console.log(this.player.getBounds().y)

                // if (obstacle.hitArea && this.player.hitArea && obstacle.hitArea.contains(this.player.position.x, this.player.position.y)) {
                //     console.log('Game over!');
                // }
                if(!this.rectsIntersect(this.player, obstacle)){
                    console.log("Erorrrrrr")
                }

                if(obstacle.position.x < -obstacle.width){
                    app.stage.removeChild(obstacle);
                    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)
                }
            })
            this.interval += 1
        })
    }

    
    rectsIntersect(a: Sprite, b: Sprite){
	
        let playerBox = a.hitArea;
        let obstacleBox = b.hitArea;

        const tempA = new Sprite();
        tempA.hitArea = playerBox;
        const bounds1 = tempA.getBounds();

        const tempB = new Sprite();
        tempB.hitArea = obstacleBox;
        const bounds2 = tempB.getBounds();
    
        // console.log(obstacleBox)
    
        return bounds1.x + bounds1.width > bounds2.x &&
                bounds1.x < bounds2.x + bounds2.width &&
                bounds1.y + bounds1.height > bounds2.y &&
                bounds1.y < bounds2.y + bounds2.height
    }

}