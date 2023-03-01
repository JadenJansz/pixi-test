import { Application, Text, ICanvas, Rectangle, Sprite } from "pixi.js";
import { Player } from "./Player";
import { TweenMax, Power0 } from 'gsap'

export class Star extends Sprite {

    stars: Array<Sprite> = [];
    velocity = 8;
    interval = 1;
    player: Player;
    score = 0;
    scoreLabel: Text;

    constructor(app: Application<ICanvas>, player: Player){
        super();
        this.player = player
        this.update(app)

        this.scoreLabel = new Text('Score : 00', { fontFamily: 'CustomFont', fontSize: 35, fill: 0xFFFFFF })
        this.scoreLabel.x = 430;
        this.scoreLabel.y = 190;
    
        app.stage.addChild(this.scoreLabel)

    }
    
    addStar(app: Application<ICanvas>){
        const star = Sprite.from('../assets/star.png')
        star.position.set(1500, Math.random() * (600 - 200) + 200)
        star.scale.x = 0.7
        star.scale.y = 0.7
        star.interactive = true;
        star.hitArea = new Rectangle(1,1, 1, 1);
        // star.x -= -5;
        
        TweenMax.to(star.scale, 1, {
            x: 1,
            y: 1, 
            ease: Power0.easeNone,
            repeat: -1,
            yoyo: true
        })
        
        app.stage.addChildAt(star, 4);
        this.stars.push(star);
    }

    update(app: Application<ICanvas>){
        app.ticker.add(() => {
            if (this.interval % 60 === 0) {
                // console.log(Math.round(this.interval))
                this.addStar(app);
            }
            
            this.stars.forEach((star) => {
                star.position.x += - this.velocity;

                // if(this.rectsIntersect(this.player, star)){
                //     console.log("Erorrrrrr")
                //     app.stage.removeChild(star);
                //     this.stars.splice(this.stars.indexOf(star), 1)
                // }

                if(star.position.x < -star.width){
                    app.stage.removeChild(star);
                    this.stars.splice(this.stars.indexOf(star), 1)
                    
                }
                
                if(this.player.getBounds().intersects(star.getBounds())){
                    this.score += 10;
                    this.scoreLabel.text = `Score: ${this.score}`;
                    app.stage.removeChild(star);
                    this.stars.splice(this.stars.indexOf(star), 1)

                }
            })
            this.interval += 1
        })
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