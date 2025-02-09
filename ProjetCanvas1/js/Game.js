import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObstacleAnime from "./obstacleAnime.js";
import ObjetSouris from "./ObjetSouris.js";
import { rectsOverlap , circRectsOverlap} from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import Sortie from "./sortie.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(50, 50);
        this.objetsGraphiques.push(this.player);

        // Un objert qui suite la souris
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "orange");
        this.objetsGraphiques.push(this.objetSouris);


        // On cree des obstacles
        let obstacle1 = new Obstacle(300, 0, 40, 600, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(500, 500, 100, 100, "blue");
        this.objetsGraphiques.push(obstacle2);

        
        let obstacleAnime = new ObstacleAnime(200, 300, 50, 50, "green");
        obstacleAnime.vitesseY = 2; // Définit une vitesse initiale
        this.objetsGraphiques.push(obstacleAnime);
        
        let obstacleAnime2 = new ObstacleAnime(500, 300, 50, 50, "green");
        obstacleAnime2.vitesseY = -2; // Définit une vitesse initiale
        this.objetsGraphiques.push(obstacleAnime2);
        

        let obstacleAnime3 = new ObstacleAnime(200, 500, 50, 50, "green");
        obstacleAnime3.vitesseX = -2; // Définit une vitesse initiale
        this.objetsGraphiques.push(obstacleAnime3);
        
        // On ajoute la sortie
        this.sortie = new Sortie(700, 200, 15, "yellow");
        this.objetsGraphiques.push(this.sortie);

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer();

        // on met à jouer la position de objetSouris avec la position de la souris
        // Pour un objet qui "suit" la souris mais avec un temps de retard, voir l'exemple
        // du projet "charQuiTire" dans le dossier COURS
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;

        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof ObstacleAnime) {
                obj.moveObstacleXaxis(obj.vitesseX, this.canvas.width, this.objetsGraphiques);
                obj.moveObstacleYaxis(obj.vitesseY, this.canvas.height, this.objetsGraphiques);
            }
        });
        
        //this.movePlayer();

    }

    // Charger le niveau suivant
    nextLevel() {
        console.log("Chargement du prochain niveau...");
    
        // Ex. : Réinitialiser la position du joueur et charger un nouveau niveau
        this.player.x = 100;
        this.player.y = 100;

        // Générer un nouveau niveau (changer les obstacles, la sortie...)
        this.objetsGraphiques = [this.player, this.objetSouris];

        let obstacleNouveau = new Obstacle(400, 200, 50, 50, "purple");
        this.objetsGraphiques.push(obstacleNouveau);

        this.sortie = new Sortie(600, 300, 50, 50, "yellow");
        this.objetsGraphiques.push(this.sortie);

        console.log("Nouveau niveau chargé !");
    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 3;
        } 
        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -3;
        } 

        if(this.inputStates.ArrowUp) {
            this.player.vitesseY = -3;
        } 

        if(this.inputStates.ArrowDown) {
            this.player.vitesseY = 3;
        } 

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();

        // Teste collision avec la sortie
        this.testCollisionPlayerSortie();
       
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w/2;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision

                    // ICI TEST BASIQUE QUI ARRETE LE JOUEUR EN CAS DE COLLIION.
                    // SI ON VOULAIT FAIRE MIEUX, ON POURRAIT PAR EXEMPLE REGARDER OU EST LE JOUEUR
                    // PAR RAPPORT A L'obstacle courant : il est à droite si son x est plus grand que le x de l'obstacle + la largeur de l'obstacle
                    // il est à gauche si son x + sa largeur est plus petit que le x de l'obstacle
                    // etc.
                    // Dans ce cas on pourrait savoir comment le joueur est entré en collision avec l'obstacle et réagir en conséquence
                    // par exemple en le repoussant dans la direction opposée à celle de l'obstacle...
                    // Là par défaut on le renvoie en x=10 y=10 et on l'arrêtedzee
                    console.log("Collision avec obstacle");
                    this.player.x = 10;
                    this.player.y = 10;
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                }
            }
        });
    }
    
    testCollisionPlayerSortie() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Sortie) { // Vérifie si l'objet est une Sortie
                if (circRectsOverlap(
                    this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, 
                    obj.x, obj.y, obj.radius // Utilisation du rayon de la sortie
                )) {
                    console.log(" Niveau terminé !");
                    this.nextLevel(); // Change de niveau
                }
            }
        });
    }

}