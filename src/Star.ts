import { Application, Text, ICanvas, Rectangle, Sprite } from "pixi.js";
import { Player } from "./Player";
import { TweenMax, Power0 } from 'gsap'
import { sound } from '@pixi/sound'
import { isMac } from ".";

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
        this.scoreLabel.x = 340;
        this.scoreLabel.y = 150;

        sound.add("success", "../assets/success.mp3");
        sound.volume("success",0.3)
    
        app.stage.addChild(this.scoreLabel)

    }
    
    addStar(app: Application<ICanvas>){
        const star = Sprite.from('../assets/star.png')
        star.position.set(1200, Math.random() * (440 - 150) + 150)
        star.scale.x = 0.6
        star.scale.y = 0.6
        star.interactive = true;
        star.hitArea = new Rectangle(1,1, 1, 1);
        // star.x -= -5;
        
        TweenMax.to(star.scale, 1, {
            x: 0.9,
            y: 0.9, 
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
                
                if(this.player.bounds.getBounds().intersects(star.getBounds())){
                    sound.play("success");
                    this.score += 10;
                    this.scoreLabel.text = `Score : ${this.score}`;
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