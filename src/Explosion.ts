import { AnimatedSprite, Application, Container, ICanvas, Texture } from "pixi.js";
import { TweenMax, Power0 } from 'gsap'

export class Explosion extends Container {
    
    constructor(app: Application<ICanvas>, x: number | undefined, y: number | undefined){
        super();
        
        const expFrames = ["../assets/Layer1.png", "../assets/Layer2.png", "../assets/Layer3.png", "../assets/Layer4.png", "../assets/Layer5.png", "../assets/Layer6.png"];

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
    
    onClampyFrameChange(currentFrame: any): void {
        // console.log("Clampy's current frame is", currentFrame);
    }
}