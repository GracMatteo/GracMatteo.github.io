import Obstacle from "./Obstacle.js";
import { rectsOverlap } from "./collisions.js";

export default class ObstacleAnime extends Obstacle {
    constructor(x, y, w, h, couleur) {
        super(x, y, w, h, couleur);
        this.vitesseX = 0;
        this.vitesseY = 0;
    }

    moveObstacleYaxis(ySpeed, canvasHeight, obstacles) {
        let nextY = this.y + ySpeed;
    
        // Vérifier si l'obstacle entre en collision avec un autre obstacle
        let collision = obstacles.some(obstacle => 
            obstacle !== this && // Éviter de se comparer à lui-même
            rectsOverlap(this.x, nextY, this.w, this.h, obstacle.x, obstacle.y, obstacle.w, obstacle.h)
        );
    
        // Vérifier les limites du canvas et les collisions
        if (nextY <= 0 || nextY + this.h >= canvasHeight || collision) {
            this.vitesseY *= -1; // Inverser la direction en cas de collision
        } else {
            this.y = nextY; // Appliquer le mouvement seulement s'il n'y a pas d'obstacle
        }
    }
    

    moveObstacleXaxis(xSpeed, canvasWidth, obstacles) {
        let nextX = this.x + xSpeed;
    
        // Vérifier si l'obstacle entre en collision avec un autre obstacle
        let collision = obstacles.some(obstacle => 
            obstacle !== this && // Éviter de se comparer à lui-même
            rectsOverlap(nextX, this.y, this.w, this.h, obstacle.x, obstacle.y, obstacle.w, obstacle.h)
        );
    
        // Vérifier les limites du canvas et les collisions
        if (nextX <= 0 || nextX + this.w >= canvasWidth || collision) {
            this.vitesseX *= -1; // Inverser la direction en cas de collision
        } else {
            this.x = nextX; // Appliquer le mouvement seulement s'il n'y a pas d'obstacle
        }
    }
    
}
