import { Application, Text, TextStyle, ICanvas, Rectangle, Resource, Sprite, Texture, AnimatedSprite, FrameObject, Container } from "pixi.js";
import { BigS } from ".";
import { TweenMax, Power0 } from "gsap";

export class Player extends Container {

    gravity = 0.2;
    vx: number;
    vy: number;
    jumpVelocity = -5;
    start = false;
    end = false;
    rotationSpeed = 0.1;
    bounds: AnimatedSprite;
    textDisplayed: boolean = false;

    constructor(app: Application<ICanvas>, texture: AnimatedSprite) {
        super();

        texture.position.set(BigS ? 500 : 380, BigS ? 420 : 350)
        texture.scale.x = 0.15
        texture.scale.y = 0.15
        texture.anchor.set(0.5)
        texture.interactive = true;
        this.vx = 0;
        this.vy = 0;

        const worldBounds = new Rectangle(0, BigS ? 220 : 160, 1250, BigS ? 440 : 360)
        
        app.stage.addChild(texture);
        this.playFrames(texture, ["assets/bird/step1.png", "assets/bird/step2.png", "assets/bird/step3.png", "assets/bird/step4.png"], 1000, true)

        texture.animationSpeed = 0.1;

        this.addGravity(app, texture, worldBounds)
        this.jump(texture)
        this.bounds = texture
    }
    
    addGravity(app: Application<ICanvas>, player: AnimatedSprite, worldBounds: Rectangle){
        app.ticker.add((delta) => {

            if(this.start){
                app.ticker.start()
                this.vy += this.gravity*delta
                
                player.x += this.vx * delta;
                player.y += this.vy * delta;

            }

            if(this.end){
                this.jumpVelocity = 0;
                player.rotation += this.rotationSpeed

                this.playFrames(player, ["assets/bird/step5.png", "assets/bird/step6.png"], 1000, false)
                if(!worldBounds.contains(player.x, player.y)){
                    this.start = false
                    player.y -= 2
                    this.restart(app);
                }
            }

            if (!worldBounds.contains(player.x, player.y)) {
                player.x = Math.min(Math.max(player.x, worldBounds.x), worldBounds.x + worldBounds.width);
                player.y = Math.min(Math.max(player.y, worldBounds.y), worldBounds.y + worldBounds.height);
            
                if(player.y > worldBounds.y){
                    this.playFrames(player, ["assets/bird/step5.png", "assets/bird/step6.png"], 1000, false)
                    
                    this.displayText(app)
                }

            }
        })
    }
    
    jump(player: AnimatedSprite){
        
        document.addEventListener("keydown", (event) => {
            if(event.code === 'Space'){
                this.vy = this.jumpVelocity;
                this.start = true
            }
        })
    }

    restart(app: Application<ICanvas> ){

        document.addEventListener("keydown", (event) => {
            if(event.code === 'Space'){
                location.reload();
            }
        })
    }

    playFrames(sprite: AnimatedSprite,frames: any[], duration: number, loop: boolean) {
        sprite.stop();
        sprite.textures = frames.map(frame => Texture.from(frame));
        sprite.animationSpeed = -1 / duration;
        sprite.loop = loop;
        sprite.play();
    }

    displayText(app: Application<ICanvas>){

        if(!this.textDisplayed){
            this.textDisplayed = true
            const gameOverText = new Text('Game Over !!')
                            
            gameOverText.style = new TextStyle({
                fontFamily: 'CustomFont', fontSize: 90, fill: 0xFFFFFF, stroke: "black", strokeThickness: 4
            })
            gameOverText.x = BigS ? 800 : 600;
            gameOverText.y = BigS ? 400 : 300;
            app.stage.addChild(gameOverText)
            const restartText = new Text('Hit Space to restart')    
            restartText.style = new TextStyle({
                fontFamily: 'CustomFont', fontSize: 40, fill: 0xFFFFFF, stroke: "black", strokeThickness: 4
            })
            
            restartText.x = BigS ? 840 : 640;
            restartText.y = BigS ? 500 : 380;
            app.stage.addChild(restartText)
            this.restart(app);
            setTimeout(() => {
                app.ticker.stop();
            }, 500)
        }
    }
}