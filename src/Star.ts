import { Application, Text, ICanvas, Rectangle, Sprite } from "pixi.js";
import { Player } from "./Player";
import { TweenMax, Power0 } from 'gsap'
import { sound } from '@pixi/sound'
import { BigS } from ".";

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

        this.scoreLabel = new Text('Score : 00', { fontFamily: 'CustomFont', fontSize: 35, fill: 0x00000 })
        this.scoreLabel.x = BigS ? 430 : 340;
        this.scoreLabel.y = BigS ? 200 : 150;

        sound.add("success", "../assets/success.mp3");
        sound.volume("success",0.3)
    
        app.stage.addChild(this.scoreLabel)

    }
    
    addStar(app: Application<ICanvas>){
        const star = Sprite.from('../assets/star.png')
        star.position.set(BigS ? 1600 : 1200, Math.random() * ((BigS ? 550 : 440) - (BigS ? 190 : 150)) + 210)
        star.scale.x = BigS ? 0.5 : 0.4
        star.scale.y = BigS ? 0.5 : 0.4
        star.interactive = true;
        star.hitArea = new Rectangle(1,1, 1, 1);
        
        TweenMax.to(star.scale, 1, {
            x: 0.6,
            y: 0.6, 
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
                this.addStar(app);
            }
            
            this.stars.forEach((star) => {
                star.position.x += - this.velocity;

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

                if(this.player.end){
                    app.stage.removeChild(star)
                }
            })
            this.interval += 1
        })
    }
}