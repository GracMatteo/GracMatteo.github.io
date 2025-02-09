import ObjectGraphique from "./ObjectGraphique.js";
import { circRectsOverlap } from "./collisions.js"; 
import { drawCircleImmediat } from "./utils.js";

export default class Sortie extends ObjectGraphique {
    constructor(x, y, radius, couleur) {
        super(x, y, radius * 2, radius * 2, couleur); 
        this.radius = radius;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        drawCircleImmediat(ctx, this.x, this.y, this.radius * 2, this.radius * 2); 
        ctx.restore();
    }
    
}

