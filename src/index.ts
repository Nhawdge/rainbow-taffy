import k from './kaboom';
import Game from './scenes/Game';
import Assets from './assets';

Assets.load();

k.scene('game', Game);
k.go('game');
