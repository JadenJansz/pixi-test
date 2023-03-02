import { AnimatedSprite, Application, Container, ICanvas, Texture } from "pixi.js";
import { TweenMax, Power0 } from 'gsap'

export class Explosion extends Container {

    app;
    
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
    }
    
    onClampyFrameChange(currentFrame: any): void {
        // console.log("Clampy's current frame is", currentFrame);
    }
}