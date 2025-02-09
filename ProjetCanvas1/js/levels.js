export const levels = [
    {
        playerStart: { x: 0, y: 0 },
        playerSouris : { x: 200, y: 200, w: 25, h: 25, couleur: "orange"},
        sortie: { x: 700, y: 100, r: 15, couleur: "yellow" },
        obstacles: [
            { x: 300, y: 0, w: 40, h: 600, couleur: "red" },
            { x: 500, y: 500, w: 100, h: 100, couleur: "blue" }
        ],
        obstaclesAnimes: [
            { x: 200, y: 300, w: 50, h: 50, couleur: "green", vitesseX: 0, vitesseY: 2 },
            { x: 500, y: 300, w: 50, h: 50, couleur: "green", vitesseX: 0, vitesseY: -2 }
        ]
    },
    
    {
        playerStart: { x: 100, y: 100 },
        playerSouris : { x: 200, y: 200, w: 25, h: 25, couleur: "orange"},
        sortie: { x: 600, y: 100, r: 15 , couleur: "yellow" },
        obstacles: [
            { x: 300, y: 0, w: 50, h: 390, couleur: "red" },
            { x: 450, y: 460, w: 120, h: 80, couleur: "blue" }
        ],
        obstaclesAnimes: [
            { x: 100, y: 400, w: 50, h: 50, couleur: "green", vitesseX: 2, vitesseY: 0 },
            { x: 400, y: 250, w: 50, h: 50, couleur: "green", vitesseX: -2, vitesseY: 0 },
            { x: 700, y: 0, w: 50, h: 50, couleur: "green", vitesseX: 0, vitesseY: 2 }
        ]
    },
    
    

];