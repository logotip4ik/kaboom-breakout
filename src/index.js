import './main.css';
import kaboom from 'kaboom';

const RECT_COUNT = 10;
const RECT_MARGIN = 5;

const RECTS = [];
const PLAYER = {};
const BALL = {};
let SCORE = 0;

const X = Math.random() * 100 - 50;

// initialize kaboom context
const k = kaboom({ debug: true, clearColor: [0, 0.15, 0.35, 1] });

k.layers(['ui', 'game']);

// define a scene
k.scene('main', () => {
  const canvasWidth = k.width();
  const canvasHeight = k.height();

  for (let y = 0; y < 4; y++) {
    const row = [];
    for (let x = 0; x < RECT_COUNT; x++) {
      const rectSize = canvasWidth / RECT_COUNT;

      const xPos = rectSize * x + 2.5;
      const yPos = y * 30 + 20;

      const rect = k.add([
        'ITEM',
        k.pos(xPos, yPos),
        k.rect(rectSize - RECT_MARGIN, 20),
        k.layer('game'),
        // k.color([10 * x, 10 * y, 123, 1]),
      ]);
      row.push(rect);
    }
    RECTS.push(row);
  }

  const player_y = canvasHeight - 30;
  // DEFINE PLAYER
  Object.assign(
    PLAYER,
    k.add([
      'PLAYER',
      k.rect(100, 20),
      k.pos(canvasWidth / 2 - 50, player_y),
      k.layer('game'),
    ]),
  );
  // DEFINE THE BALL
  Object.assign(
    BALL,
    k.add([
      'BALL',
      k.origin('center'),
      k.rect(5, 5),
      k.pos(canvasWidth / 2, canvasHeight / 2),
      k.color([1, 1, 0, 1]),
      k.layer('game'),
    ]),
  );

  PLAYER.action(() => {
    PLAYER.pos.x = k.mousePos().x - 50;
  });

  let BALL_DIR_X = 1;
  let BALL_DIR_Y = 1;
  let BALL_SPEED = 1;

  BALL.collides('PLAYER', () => (BALL_DIR_Y *= -1));
  BALL.collides('ITEM', (i) => {
    BALL_DIR_Y *= -1;
    BALL_SPEED += 1;
    k.destroy(i);
    SCORE += 1;
  });
  BALL.action(() => {
    if (BALL.pos.x <= 0 || BALL.pos.x >= canvasWidth) BALL_DIR_X *= -1;
    if (BALL.pos.y <= 0) BALL_DIR_Y *= -1;
    if (BALL.pos.y >= canvasHeight) k.go('endgame', SCORE);

    BALL.move(X * BALL_DIR_X * BALL_SPEED, 100 * BALL_DIR_Y);
  });
});

k.scene('endgame', (score) => {
  const canvasWidth = k.width();
  const canvasHeight = k.height();
  k.add([
    k.origin('center'),
    k.text(`YOUR SCORE: ${score}`, 36),
    k.pos(canvasWidth / 2, canvasHeight / 2),
  ]);
});

// start the game
k.start("main");
