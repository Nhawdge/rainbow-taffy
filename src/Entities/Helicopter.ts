
import k from '../kaboom';
import assets from '../assets';
import { scoreboard } from '../scenes/Game.js';

export default function Helicopter() {
    const {
        add,
        pos,
        origin,
        width,
        height,
        sprite
    } = k;

    var copter = add([
        "target",
        area(),
        origin("center"),
        pos(randi(0, 1000), 100 - randi(0, 50)),
        sprite("helicopter", { frame: 0, width: 64 * 2, height: 32 * 2 }),
        health(15),
    ])

    copter.onDeath(() => {
        copter.moveTo(copter.pos.x, copter.pos.y + 10000, 1000);
        wait(3, () => {
            destroy(copter);
        })
        scoreboard.addScore()
    })

    copter.play("Loop");
}