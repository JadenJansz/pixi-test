import { AnimatedSprite, Application, Container, ICanvas, Texture } from "pixi.js";

export class Explosion extends Container {
    
    constructor(app: Application<ICanvas>){
        super();
        
        const expFrames = ["../assets/Layer1.png", "../assets/Layer2.png", "../assets/Layer3.png", "../assets/Layer4.png", "../assets/Layer5.png", "../assets/Layer6.png"];

        const animation = new AnimatedSprite(expFrames.map((explosion) => Texture.from(explosion)));

        app.stage.addChild(animation);

        animation.onFrameChange = this.onClampyFrameChange.bind(this);

        console.log("lol")
    }
    
    private onClampyFrameChange(currentFrame: any): void {
        console.log("Clampy's current frame is", currentFrame);
    }
}