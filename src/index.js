import './main.css';
import kaboom from 'kaboom';

const RECT_COUNT = 10;
const RECT_MARGIN = 5;
const RECTS = [];

const PLAYER = {};

// initialize kaboom context
const k = kaboom({ debug: true, clearColor: [0, .15, .35, 1] });

// define a scene
k.scene("main", () => {
  const canvasWidth = k.width()

  for (let y = 0; y < 4; y++) {
    const row = []
    for (let x = 0; x < RECT_COUNT; x++) {
      const rectSize = canvasWidth / RECT_COUNT

      const xPos = rectSize * x + 2
      const yPos = y * 30 + 10

      const rect = k.add([
        k.pos(xPos, yPos),
        k.rect(rectSize - RECT_MARGIN, 20)
      ])
      row.push(rect)
    }
    RECTS.push(row)
  }

  const player_y = k.height() - 30;

  Object.assign(PLAYER, k.add([
    k.rect(200, 20),
    k.pos(canvasWidth / 2 - 100, player_y)
  ]))

  console.log(PLAYER)

  PLAYER.action(() => {
    PLAYER.pos.x = k.mousePos().x - 100
  })
});

// start the game
k.start("main");
