define({
	inputs:{
	    mySignal:'signal',
	    DOM:'domelement',
	    scriptLoaded:'string',
	},
	
	outputs:{
	    // ExampleOutput:'string',
	},
	
	mySignal:function(inputs,outputs) {
	//if (!inputs.scriptLoaded) {
        //        return;
        //}
        // レンダラーを作成
        // サイズを指定
        const width =1920;window.width;//inputs.DOM.width;
        const height =1200;window.height; //inputs.DOM.height;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: inputs.DOM
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0xf9f9f9, 1.0);

        // シーンを作成
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xf9f9f9, 200, 300);

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);

        // マテリアルを作成する
        const material = new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load('imgs/shimizu.png')
        });
        // フォグ（霞）を有効にする
        material.fog = true;

        // ビルボードを作成
        for (let i = 0; i < 1000; i++) {
          const sprite = new THREE.Sprite(material);
          // ランダムな座標に配置
          sprite.position.x = 500 * (Math.random() - 0.5);
          sprite.position.y = 100 * Math.random() - 40;
          sprite.position.z = 500 * (Math.random() - 0.5);
          // 必要に応じてスケールを調整
          sprite.scale.set(10, 10, 10);

          scene.add(sprite);
        }

        // 地面を作成
        const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
        plane.position.y = -40;
        scene.add(plane);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          // カメラの自動移動
          camera.position.x = 100 * Math.sin(Date.now() / 2000);
          camera.position.z = 100 * Math.cos(Date.now() / 2000);
          camera.position.y = 50 * Math.sin(Date.now() / 1000) + 60;
          camera.lookAt(new THREE.Vector3(0, 0, 0));

          // レンダリング
          renderer.render(scene, camera);
          requestAnimationFrame(tick);
        }

	},
	
	// This function will be called when any of the inputs have changed
	change:function(inputs,outputs) {
		// ...
		      console.log("change");
	}
})
