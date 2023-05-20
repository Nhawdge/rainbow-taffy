import k from '../kaboom';
import assets from '../assets';

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
    "xxxxxxxx",
    "x      x",
    "x      x",
    "x      x",
    "x      x",
    "xxxxxxxx"
  ]]

  const leveloptions = {
    width: 32,
    height: 32,
    x: () => [sprite("tiles", { frame: 0, width: 32, height: 32, tiled: true, })],
    //" ": () => [ sprite("tiles", { frame: 0, tiled: true, })],
  }

  addLevel(world[0], leveloptions);
  let obj = add([
    pos(width() * 0.5, height() * 0.5),
    origin('center'),
    sprite(assets.MY_DUDE),
    area(),
  ]);

  obj.play('Idle', { speed: 0.2, loop: true });

  var walkspeed = 5;
  onKeyDown("w", function () {
    obj.pos.y -= 1;
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: walkspeed, loop: true });
    }
  })

  onKeyDown("s", function () {
    obj.pos.y += 1;
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: walkspeed, loop: true });
    }
  })

  onKeyDown("a", function () {
    obj.pos.x -= 1;
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: walkspeed, loop: true });
    }
  })

  onKeyDown("d", function () {
    obj.pos.x += 1;
    if (obj.curAnim() != "Walk") {
      obj.play('Walk', { speed: walkspeed, loop: true });
    }
  })

  onKeyRelease(["w", "s", "a", "d"], function () {
    obj.play('Idle', { speed: 0.2, loop: true });
  })
};
