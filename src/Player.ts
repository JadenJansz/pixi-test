import { Application, ICanvas, Rectangle, Resource, Sprite, Texture } from "pixi.js";

export class Player extends Sprite {

    constructor(app: Application<ICanvas>, texture: Texture<Resource>) {
        super(texture);

        const player = Sprite.from('../assets/bird.png')
        this.position.set(10, 300)
        this.scale.x = 0.4
        this.scale.y = 0.4
        this.interactive = true;
        this.hitArea = new Rectangle(10, 10, 100, 100);
        console.log("lol ")
        console.log(this)

        app.stage.addChild(this)
    }
}