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
        //if (!inputs.scriptLoaded) {
        //    return;
        //}
        var canvas = inputs.DOM;
        const width = canvas.width;
        const height = canvas.height;

        //var context = canvas.getContext("2d");
        // 表示するcanvasを用意
        //------画像のアニメーション-----//
        // 表示するcanvasを用意
        let app = new PIXI.Application(width/4,height/4, { backgroundColor: 0xDAE8F4 });
        //let app = new PIXI.Application(800, 600, { backgroundColor: 0xFFFFFF });
        document.body.appendChild(app.view);

        // イメージを指定
        let hayachi = PIXI.Sprite.fromImage('imgs/star.png');

        // 画像のアンカーポイントの指定
        hayachi.anchor.set(0.5);

        // 画像を画面中央に移動
        hayachi.x = app.screen.width / 2;
        hayachi.y = app.screen.height / 2.5;

        // ステージに表示させる
        app.stage.addChild(hayachi);

        // アニメーションの再生、ループ
        app.ticker.add(function (delta) {
            // 画像を回転
            hayachi.rotation += 0.1 * delta;
        });

        //------テキストの描画-----//

        // スタイルを指定
        let styleBig = new PIXI.TextStyle({
            fontFamily: 'Comfortaa',
            fontSize: 70,
            align: 'center',
            wordWrapWidth: 1000,
            wordWrap: true
        });
        let styleSmall = new PIXI.TextStyle({
            fontFamily: 'Comfortaa',
            fontSize: 40,
            align: 'center',
            wordWrapWidth: 1000,
            wordWrap: true
        });

        // スタイルを反映
        let textBig = new PIXI.Text('Pixi.js', styleBig);
        let textSmall = new PIXI.Text('Standard animation', styleSmall);

        // テキストの位置を指定
        textBig.x = 300;
        textBig.y = 430;
        textSmall.x = 180;
        textSmall.y = 530;

        // ステージに表示させる
        app.stage.addChild(textBig);
        app.stage.addChild(textSmall);
    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
    }
})