define({
	inputs:{
	    mySignal:'signal',
	    domElement:'domelement',
	    scriptLoaded: "string",
	},
	
	outputs:{
	    id:'string',
	},
	mySignal:function(inputs,outputs) {
        //if (!inputs.scriptLoaded) {
        //        return;
        //}
        var canvas = inputs.domElement;
        var engine = new BABYLON.Engine(canvas, true); 
        function createScene() {
            // 新しいシーンオブジェクトを作成する
            const scene = new BABYLON.Scene(engine);
            // 自由移動出来るカメラを生成
            // ドラッグで視点回転、矢印キーで移動
            const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
            // カメラの向きを座標0地点にする
            camera.setTarget(BABYLON.Vector3.Zero());
            // canvas 要素をクリックやドラッグなどで操作出来るようにする
            camera.attachControl(canvas, false);
            // 照明を追加
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
            // 球体メッシュを生成
            var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
            // 少し上に持ち上げる
            sphere.position.y = 1;
            // 地面メッシュを生成
            var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
            return scene;
        }
        const scene = createScene();
        // 描画ループ関数を定義する
        engine.runRenderLoop(() => {
            scene.render();
        });
        // リサイズ処理
        window.addEventListener('resize', () => {
            engine.resize();
        });

    }
})

