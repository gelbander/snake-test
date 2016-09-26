var gameState = (function() {
    var grid,
        player,
        moveTimer = 0,
        cursors,
        direction = 'right',
        fruit,
        fruitTimer = 0,
        gridSize = 20,
        moveIncrement = gridSize,
        addBodyPart = false;

    function createGrid(player) {
        var line;

        grid = [];

        for (var i = 0; i <= height; i = player.height + i) {
            line = new Phaser.Line(0, i, width, i);
            grid.push(line);
        }

        for (var i = 0; i <= width; i = player.width + i) {
            line = new Phaser.Line(i, 0, i, height);
            grid.push(line);
        }
    }

    function setUpGame() {
        game.stage.backgroundColor = "#d28ecc";

        cursors = game.input.keyboard.createCursorKeys();

        player = game.add.group();

        createNewBodyPart({
            x: gridSize,
            y: gridSize
        }, true);

        for (var i = 0; i < 200; i++) {
            createNewBodyPart({
                x: gridSize,
                y: gridSize
            });
        }

        fruits = game.add.group();

        createGrid(player);
    }

    function preload() {
        game.load.image('square', 'assets/img/square.png');
        game.load.image('fruit', 'assets/img/fruit.png');
    }

    function create() {
        setUpGame();
    }

    function handleDirectionalInput() {
        if (cursors.left.isDown) {
            direction = 'left';
        } else if (cursors.right.isDown) {
            direction = 'right';
        } else if (cursors.up.isDown) {
            direction = 'up';
        } else if (cursors.down.isDown) {
            direction = 'down';
        }
    }

    function createNewBodyPart(position, addPhysics) {
        var bodyPart = new Phaser.Sprite(game, position.x, position.y, 'square');

        bodyPart.tint = 'black';

        bodyPart.width = gridSize;
        bodyPart.height = gridSize;

        bodyPart.oldPos = {};

        player.add(bodyPart);

        if (addPhysics) {
            game.physics.enable(bodyPart, Phaser.Physics.ARCADE);
            bodyPart.body.collideWorldBounds = true;
        }

        addBodyPart = false;
    }

    function movePlayer() {
        var bodyPart;

        if (game.time.now > moveTimer) {
            bodyPart = player.children[0];

            bodyPart.oldPos.x = bodyPart.x;
            bodyPart.oldPos.y = bodyPart.y;

            if (direction === 'left') {
                bodyPart.x += -moveIncrement;
            } else if (direction === 'right') {
                bodyPart.x += moveIncrement;
            } else if (direction === 'up') {
                bodyPart.y += -moveIncrement;
            } else {
                bodyPart.y += moveIncrement;
            }

            if (player.children.length === 1 && addBodyPart) {
                createNewBodyPart(bodyPart.oldPos);
            }

            for (var i = 0; i < player.children.length; i++) {
                bodyPart = player.children[i];

                if (i !== 0) {
                    bodyPart.oldPos.x = bodyPart.x;
                    bodyPart.oldPos.y = bodyPart.y;

                    bodyPart.x = player.children[i - 1].oldPos.x;
                    bodyPart.y = player.children[i - 1].oldPos.y;

                    if (i === player.children.length - 1 && addBodyPart) {
                        createNewBodyPart(bodyPart.oldPos);
                    }
                }
            }

            moveTimer = game.time.now + 40;
        }
    }

    function handleSpawnFruit() {
        var x,
            y;

        if (!fruit || !fruit.alive) {
            x = Math.round(game.rnd.integerInRange(0, width - gridSize) / gridSize) * gridSize;
            y = Math.round(game.rnd.integerInRange(0, height - gridSize) / gridSize) * gridSize;

            fruit = game.add.sprite(x, y, 'fruit');
            game.physics.enable(fruit, Phaser.Physics.ARCADE);
            fruit.width = gridSize;
            fruit.height = gridSize;
        }
    }

    function changeBackground() {
        var c = Phaser.Color.getRandomColor(50, 255, 255);

        game.stage.backgroundColor = c;

    }

    function handleCollisions() {

        function handlePlayerHitFruit() {
            fruit.kill();

            changeBackground();

            addBodyPart = true;
        }

        game.physics.arcade.overlap(player, fruit, handlePlayerHitFruit, null, this);
    }

    function update() {
        handleDirectionalInput();
        movePlayer();
        handleSpawnFruit();
        handleCollisions();
    }

    function render() {
        grid.forEach(function(line) {
            game.debug.geom(line, '#D3D3D3');
        })
    }

    return {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
}());
