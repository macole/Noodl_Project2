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
        const width = window.innerWidth;
        const height = window.innerHeight;

        // 角度
        let rot = 0;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: inputs.DOM
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // 画面上にグリッド（格子）を配置
        const grid = new THREE.GridHelper(1000, 10);
        scene.add(grid);

        // 画面上に3軸を配置
        const axes = new THREE.AxesHelper(1000);
        scene.add(axes);

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(0, 500, +1000);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight); // シーンに追加

        // 球体を作成
        const geometry = new THREE.SphereGeometry(300, 30, 30);
        // 画像を読み込む
        const loader = new THREE.TextureLoader();
        const texture = loader.load('imgs/earthmap1k.jpg');
        // マテリアルにテクスチャーを設定
        const material = new THREE.MeshStandardMaterial({
          map: texture
        });
        // メッシュを作成
        const mesh = new THREE.Mesh(geometry, material);
        // 3D空間にメッシュを追加
        scene.add(mesh);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          rot += 1;

          // ラジアンに変換
          const radian = (rot * Math.PI) / 180;

          // ライトの座標に反映
          camera.position.x = 1000 * Math.cos(radian);
          camera.position.y = 500;
          camera.position.z = 1000 * Math.sin(radian);

          // カメラは常に中央を向くように指定
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
