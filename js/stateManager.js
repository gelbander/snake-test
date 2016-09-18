var width = window.innerWidth,
    height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('game', gameState);

game.state.start('boot');
