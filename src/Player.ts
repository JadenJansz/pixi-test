import { Application, Text, TextStyle, ICanvas, Rectangle, Resource, Sprite, Texture, AnimatedSprite, FrameObject, Container } from "pixi.js";
import { isMac } from ".";

export class Player extends Container {

    gravity = 0.2;
    vx: number;
    vy: number;
    jumpVelocity = -5;
    start = false;
    end = false;
    rotationSpeed = 0.1;
    bounds: AnimatedSprite

    constructor(app: Application<ICanvas>, texture: AnimatedSprite) {
        super();

        // let player = Sprite.from('../assets/bird1.png')
        texture.position.set(isMac ? 380 : 380, isMac ? 330 : 350)
        texture.scale.x = 0.15
        texture.scale.y = 0.15
        texture.anchor.set(0.5)
        texture.interactive = true;
        // this.hitArea = new Rectangle(0.5, 0.5 ,0.5 ,0.5);
        this.vx = 0;
        this.vy = 0;

        const worldBounds = new Rectangle(0, isMac ? 150 : 160, 1250, isMac ? 350 : 360)
        
        app.stage.addChild(texture);
        this.playFrames(texture, ["assets/bird/step1.png", "assets/bird/step2.png", "assets/bird/step3.png", "assets/bird/step4.png"], 1000, true)

        // texture.loop = true;
        texture.animationSpeed = 0.1;

        this.addGravity(app, texture, worldBounds)
        this.jump(texture)
        this.bounds = texture
        console.log(texture.getBounds());
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
                // player.vy = 5;
                player.rotation += this.rotationSpeed
                // console.log(player.y + player.height)

                this.playFrames(player, ["assets/bird/step5.png", "assets/bird/step6.png"], 1000, false)
                if(!worldBounds.contains(player.x, player.y)){
                    this.start = false
                    player.y -= 2
                    
                    const restartText = new Text('Press Space to restart')
                    
                    restartText.style = new TextStyle({
                        fontFamily: 'CustomFont', fontSize: 40, fill: 0xFFFFFF 
                    })
                    restartText.x = isMac ? 560 : 620;
                    restartText.y = isMac ? 370 : 380;
                    app.stage.addChild(restartText)
                    // app.ticker.stop()
                    this.restart();
                }
            }

            if (!worldBounds.contains(player.x, player.y)) {
                this.end = true
                // limit the player to the world bounds
                player.x = Math.min(Math.max(player.x, worldBounds.x), worldBounds.x + worldBounds.width);
                player.y = Math.min(Math.max(player.y, worldBounds.y), worldBounds.y + worldBounds.height);
            
                // reset the velocity to 0 to prevent further movement
                // player.vx = 0;
                // player.vy = 0;

                const gameOverText = new Text('Game Over !!')
                    
                gameOverText.style = new TextStyle({
                    fontFamily: 'CustomFont', fontSize: 90, fill: 0xFFFFFF 
                })
                gameOverText.x = isMac ? 550 : 600;
                gameOverText.y = isMac ? 300 : 300;
                app.stage.addChild(gameOverText)
                setTimeout(() => {
                    app.ticker.stop();
                }, 100)
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

    restart(){
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
}