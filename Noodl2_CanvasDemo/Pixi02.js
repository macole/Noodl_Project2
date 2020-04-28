define({
    // The input ports of the Javascript node, name of input and type
    inputs: {
        // ExampleInput:'number',
        // Available types are 'number', 'string', 'boolean', 'color' and 'signal',
        mySignal: 'signal',
        DOM: 'domelement',
        scriptLoaded: "string",
    },

    // The output ports of the Javascript node, name of output and type
    outputs: {
        // ExampleOutput:'string',
    },

    // All signal inputs need their own function with the corresponding name that
    // will be run when a signal is received on the input.
    mySignal: function (inputs, outputs) {
        // ...
        var canvas = inputs.DOM;
        let app = new PIXI.Application( { view:canvas,backgroundColor: 0x000000});

        //表示をする画像の数
        let totalSprites = 100;

        //パーティクルの設定
        let sprites = new PIXI.particles.ParticleContainer(totalSprites, {
            scale: true,
            position: true
        });

        //ステージに反映
        app.stage.addChild(sprites);

        // 複数の画像を設定
        let hayachi = [];

        //画像分をtotalSprites回数分ループ
        for (let i = 0; i < totalSprites; i++) {

            // 画像の設定
            let dude = PIXI.Sprite.fromImage('imgs/star.png');

            // 画像の中心地をきめる
            dude.anchor.set(0.5);

            // 画像のサイズのランダムにきめる
            dude.scale.set(0.01 + Math.random() * 0.1);

            // ランダムに散らす
            dude.x = Math.random() * app.screen.width;
            dude.y = Math.random() * app.screen.height;

            // ランダムな速度を0?2の間で作ります。
            dude.speed = (200 + Math.random() * 0.5) * 0.5;

            // 生成された画像の配列をpushして簡単にアクセスできるようにします
            hayachi.push(dude);

            // ループのデータを反映
            sprites.addChild(dude);
        }

        //アニメーションの初期値値
        let tick = 0;
        //ステージの高さ
        const HEIGHT = 620;

        app.ticker.add(function () {

            // 画像を繰り返し処理して位置を更新する
            for (let i = 0; i < hayachi.length; i++) {
                //配列を代入
                let dude = hayachi[i];
                //横の位置
                dude.x += (Math.random() - 0.5) * 1 * dude.scale.x;
                //縦の位置
                dude.y += dude.scale.y * dude.speed;

                //画面の一番下に行った時縦の位置をリセット、横の位置をランダムに配置
                if (dude.y > HEIGHT) {
                    dude.y = -10;
                    dude.x += (Math.random() - 0.5) * 1 * dude.scale.x;
                }
            }

            // ティッカーを増やす
            tick += 0.1;
        });

        //------テキストの描画-----//

        // スタイルを指定
        let styleBig = new PIXI.TextStyle({
            fontFamily: 'Comfortaa',
            fontSize: 60,
            fill: '#ffffff',
            lineJoin: 'round',
            stroke: '#1099bb',
            strokeThickness: 30,
            align: 'center',
            wordWrapWidth: 1000,
            wordWrap: true
        });
        let styleSmall = new PIXI.TextStyle({
            fontFamily: 'Comfortaa',
            fontSize: 40,
            fill: '#ffffff',
            lineJoin: 'round',
            stroke: '#1099bb',
            strokeThickness: 30,
            align: 'center',
            wordWrapWidth: 1000,
            wordWrap: true
        });

        // スタイルを反映
        let textBig = new PIXI.Text('Pixi.js on Noodl', styleBig);
        let textSmall = new PIXI.Text('Particle animation', styleSmall);

        // テキストの位置を指定
        textBig.x = 200;
        textBig.y = 200;
        textSmall.x = 200+50;
        textSmall.y = 200+100;

        // ステージに表示させる
        app.stage.addChild(textBig);
        app.stage.addChild(textSmall);
    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
    }
})