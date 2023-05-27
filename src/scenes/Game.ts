import k from '../kaboom';
import assets from '../assets';
import Helicopter from '../Entities/Helicopter.js';

export default function Game() {
  const {
    add,
    pos,
    origin,
    width,
    height,
    sprite
  } = k;

  const world = [[
    "qwwwwwwwwwwwwwwwwwwwwwwww",
    "a                        ",
    "a                        ",
    "a                        ",
    "a           x            ",
    "a          xxx           ",
    "a                        ",
    "zxxxxxxxxxxxxxxxxxxxxxxxxc"
  ]]

  const leveloptions = {
    width: 32,
    height: 32,

    q: () => [
      sprite("tiles", { frame: 0, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],
    w: () => [
      sprite("tiles", { frame: 1, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],
    e: () => [
      sprite("tiles", { frame: 2, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],

    a: () => [
      sprite("tiles", { frame: 4, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],
    d: () => [
      sprite("tiles", { frame: 6, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],

    z: () => [
      sprite("tiles", { frame: 7, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],
    x: () => [
      sprite("tiles", { frame: 8, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],
    c: () => [
      sprite("tiles", { frame: 9, width: 32, height: 32 }),
      area(), solid(true), "block"
    ],

    " ": () => [sprite("tiles", { frame: 5, width: 32, height: 32 })],
  }


  addLevel(world[0], leveloptions);

  let obj = add([
    pos(100,100),
    origin('center'),
    sprite(assets.MY_DUDE),
    area(),
    body({ jumpForce: 320, weight: 1 }),
    solid(),
    {
      shootspeed: 1,
      id: "canShoot",
      value: true,
      canShoot() { return this.value },
      stopShoot() { this.value = false },
      startShoot() { this.value = true }
    }
  ]);

  obj.onUpdate(() => {
    camPos(obj.pos)
  })

  obj.play('Idle', { speed: 0.2, loop: true });

  var walkspeed = 50;
  var animationSpeed = 5;

  onKeyPress("space", function () {
    obj.doubleJump();
  })

  onKeyDown("s", function () {
    obj.move(0, walkspeed);
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: animationSpeed, loop: true });
    }
  })

  onKeyDown("a", function () {
    obj.move(-walkspeed, 0);
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: animationSpeed, loop: true });
    }
  })

  onKeyDown("d", function () {
    obj.move(walkspeed, 0);
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: animationSpeed, loop: true });
    }
  })

  onKeyRelease(["w", "s", "a", "d"], function () {
    obj.play('Idle', { speed: 0.2, loop: true });
  })

  onMouseDown(() => {
    if (obj.canShoot() == false) return;
    obj.stopShoot();
    wait(1 / obj.shootspeed, () => {
      obj.startShoot();
    });
    var mousePos = mouseWorldPos();
    //var mousePos = toWorld(mousePos())

    var velocity = mousePos.sub(obj.pos).unit().scale(40);
    var angle = velocity.angle();

    add([
      area(),
      sprite("laser"),
      scale(0.25),
      rotate(angle),
      pos(obj.pos.x, obj.pos.y),
      origin("center"),
      move(velocity, 500),
      cleanup(),
      "laser"
    ])
  })

  scoreboard = add([
    fixed(),
    text(`Score: 0000`, {
      size: 12
    }),
    pos(10, 10),
    { value: 0 },
    {
      addScore() {
        this.value++;
        this.text = `Score: ${this.value.toString().padStart(4, "0")}`;

      }
    },
    z(100)
  ])
  console.log(scoreboard);

  add([
    loop(10, () => {
      console.log("spawn")
      let target = add([
        health(5),
        pos(randi(0, 1000), randi(0, 1000)),
        sprite("target"),
        area(),
        "target",
      ]);
      target.onDeath(() => {
        destroy(target);
        obj.shootspeed += 1;
        scoreboard.addScore()
      })
      Helicopter();

    })
  ])



  onCollide("laser", "target", (l, t) => {
    destroy(l);
    t.hurt(1);
  })
};

export var scoreboard