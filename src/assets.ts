const MY_DUDE = 'my-dude';
const TILES = 'tiles';

const assets = {
    MY_DUDE,
    load: function () {
        const promises = [
            loadAseprite(MY_DUDE, '/assets/my-dude.png', '/assets/my-dude.json'),
            loadAseprite(TILES, '/assets/lazy-metallic-walls.png', '/assets/lazy-metallic-walls.json')

        ];

        return Promise.all(promises);
    }
};

export default assets;
