import { AnimatedSprite, Application, Container, ICanvas, Texture, Text, TextStyle, Rectangle } from "pixi.js";
import { TweenMax, Power0 } from 'gsap'
import { isMac } from ".";

export class Explosion extends Container {

    app;
    rotationSpeed = 0.1;
    
    constructor(app: Application<ICanvas>, x: number | undefined, y: number | undefined){
        super();
        this.app = app
        const expFrames = ["../assets/explosion/Layer1.png", "../assets/explosion/Layer2.png", "../assets/explosion/Layer3.png", "../assets/explosion/Layer4.png", "../assets/explosion/Layer5.png", "../assets/explosion/Layer6.png"];

        const animation = new AnimatedSprite(expFrames.map((explosion) => Texture.from(explosion)));

        app.stage.addChildAt(animation, 4);

        animation.position.set(x, y)
        animation.play();
        animation.loop = false
        animation.animationSpeed = 0.1

        TweenMax.to(animation.position, 1, {
            x: x! - 300,
            repeat: 0,
            yoyo: true
        })

        animation.onComplete = () => {
            animation.destroy();
        }
        animation.onFrameChange = this.onClampyFrameChange.bind(this);

        console.log("lol")
    }

    playerDead(x: number | undefined, y: number | undefined){
        const birdFrames =  ["../assets/Asset3.png", "../assets/Asset4.png"];
        const animation = new AnimatedSprite(birdFrames.map((bird) => Texture.from(bird)));

        animation.scale.x = 0.15
        animation.scale.y = 0.15
        animation.anchor.set(0.5)
        animation.interactive = true;
        this.app.stage.addChild(animation)

        animation.position.set(x, y)
        animation.play();
        animation.loop = false
        animation.animationSpeed = 0.07

        animation.rotation += this.rotationSpeed
                // console.log(player.y + player.height)
        const worldBounds = new Rectangle(0, 160, 1250, 360)
        if(!worldBounds.contains(animation.x, animation.y)){
            // this.start = false
            animation.y -= 2
            
            const restartText = new Text('Press Space to restart')
            
            restartText.style = new TextStyle({
                fontFamily: 'CustomFont', fontSize: 40, fill: 0xFFFFFF 
            })
            restartText.x = 620;
            restartText.y = 380;
            // this.app.stage.addChild(restartText)
            // app.ticker.stop()
            // this.restart();
        }
    }
    
    onClampyFrameChange(currentFrame: any): void {
        // console.log("Clampy's current frame is", currentFrame);
    }
}