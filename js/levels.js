export const levels = [
    {
        playerStart: { x: 100, y: 100 },
        playerSouris: { x: 200, y: 200, w: 25, h: 25, couleur: "orange" },
        sortie: { x: 600, y: 100, r: 15, couleur: "yellow" },
        obstacles: [
            { x: 300, y: 0, w: 50, h: 390, couleur: "red" },
            { x: 480, y: 460, w: 120, h: 80, couleur: "blue" }
        ],
        obstaclesAnimes: [
            { x: 100, y: 400, w: 50, h: 50, couleur: "green", vitesseX: 2, vitesseY: 0 }
        ]
    },
    {
        playerStart: { x: 50, y: 50 },
        playerSouris: { x: 250, y: 250, w: 25, h: 25, couleur: "orange" },
        sortie: { x: 700, y: 50, r: 15, couleur: "yellow" },
        obstacles: [
            { x: 250, y: 0, w: 50, h: 300, couleur: "red" },
            { x: 480, y: 350, w: 100, h: 100, couleur: "blue" }
        ],
        obstaclesAnimes: [
            { x: 100, y: 200, w: 50, h: 50, couleur: "green", vitesseX: 3, vitesseY: 0 },
            { x: 500, y: 100, w: 50, h: 50, couleur: "green", vitesseX: 0, vitesseY: 3 }
        ]
    },
    
    {
        playerStart: { x: 50, y: 50 },
        playerSouris: { x: 300, y: 400, w: 25, h: 25, couleur: "orange" },
        sortie: { x: 750, y: 50, r: 15, couleur: "yellow" },
        obstacles: [
            { x: 200, y: 0, w: 60, h: 300, couleur: "red" },
            { x: 400, y: 350, w: 120, h: 120, couleur: "blue" },
            { x: 200, y: 550, w: 80, h: 100, couleur: "blue" },
            { x: 500, y: 550, w: 80, h: 100, couleur: "blue" },
        ],
        obstaclesAnimes: [
            { x: 200, y: 400, w: 50, h: 50, couleur: "green", vitesseX: 5, vitesseY: 0 },
            { x: 450, y: 50, w: 50, h: 50, couleur: "green", vitesseX: 2, vitesseY: 2 },
            { x: 500, y: 50, w: 50, h: 50, couleur: "green", vitesseX: 0, vitesseY: 2 }
        ]
    }
];


