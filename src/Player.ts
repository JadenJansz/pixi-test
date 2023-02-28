import { Application, Graphics, ICanvas, Rectangle, Resource, Sprite, Texture } from "pixi.js";

export class Player extends Sprite {

    gravity = 0.2;
    vx: number;
    vy: number;
    jumpVelocity = -5;
    start = false;
    end = false;
    rotationSpeed = 0.1;

    constructor(app: Application<ICanvas>, texture: Texture<Resource>) {
        super(texture);

        const player = Sprite.from('../assets/bird.png')
        this.position.set(70, 300)
        this.scale.x = 0.15
        this.scale.y = 0.15
        this.anchor.set(0.5)
        this.interactive = true;
        // this.hitArea = new Rectangle(0.5, 0.5 ,0.5 ,0.5);
        this.vx = 0;
        this.vy = 0;

        const worldBounds = new Rectangle(0, 50, 1250,550)
        this.addGravity(app, this, worldBounds)
        this.jump(this)
        

        app.stage.addChild(this)
    }
    
    addGravity(app: Application<ICanvas>, player: this, worldBounds: Rectangle){
        app.ticker.add((delta) => {

            if(this.start){
                player.vy += this.gravity*delta
                
                player.x += player.vx * delta;
                player.y += player.vy * delta;

            }

            if(this.end){
                player.vy = 5;
                player.rotation += this.rotationSpeed
                // console.log(player.y + player.height)

                if(!worldBounds.contains(player.x, player.y)){
                    this.start = false
                    player.y -= 2
                    app.ticker.stop()
                    console.log("lol")
                    // this.rotationSpeed = -this.rotationSpeed
                }
            }

            if (!worldBounds.contains(player.x, player.y)) {
                // limit the player to the world bounds
                player.x = Math.min(Math.max(player.x, worldBounds.x), worldBounds.x + worldBounds.width);
                player.y = Math.min(Math.max(player.y, worldBounds.y), worldBounds.y + worldBounds.height);
            
                // reset the velocity to 0 to prevent further movement
                player.vx = 0;
                player.vy = 0;
            }
        })
    }
    
    jump(player: this){
        
        document.addEventListener("keydown", (event) => {
            if(event.code === 'Space'){
                player.vy = this.jumpVelocity;
                this.start = true
            }
        })
    }
}