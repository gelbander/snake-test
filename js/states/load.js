var loadState = {
        preload: function() {

            /*
            Load all game assets
            Place your load bar, some messages.
            In this case of loading, only text is placed...
            */

            //Load your images, spritesheets, bitmaps...


            //Load your sounds, efx, music...
            //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');

            //Load your data, JSON, Querys...
            //Example: game.load.json('version', 'http://phaser.io/version.json');

        },

        create: function() {
            console.log('Entered load!');
            game.stage.setBackgroundColor('#fff');
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.state.start('game');
        }
    };
