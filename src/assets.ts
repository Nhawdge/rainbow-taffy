const MY_DUDE = 'my-dude';
const TILES = 'tiles';

const assets = {
    MY_DUDE,
    load: function () {
        const promises = [
            loadAseprite(MY_DUDE, '/assets/my-dude.png', '/assets/my-dude.json'),
            loadAseprite(TILES, '/assets/walls.png', '/assets/walls.json'),
            loadSprite("laser", "/assets/laser.png"),
            loadSprite("target", "/assets/target.png")
        ];

        return Promise.all(promises);
    }
};

export default assets;
