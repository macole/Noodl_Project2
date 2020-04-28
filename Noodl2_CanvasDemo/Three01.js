define({
    // The input ports of the Javascript node, name of input and type
    inputs: {
        // ExampleInput:'number',
        // Available types are 'number', 'string', 'boolean', 'color' and 'signal',
        mySignal: 'signal',
        DOM: 'domelement',
        scriptLoaded: 'string',
    },

    // The output ports of the Javascript node, name of output and type
    outputs: {
        // ExampleOutput:'string',
    },

    // All signal inputs need their own function with the corresponding name that
    // will be run when a signal is received on the input.
    mySignal: function (inputs, outputs) {
        // サイズを指定
        const width = window.innerWidth;
        const height = window.innerHeight;
        let rot = 0;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
            //canvas: document.querySelector('#myCanvas')
            canvas: inputs.DOM
        });
        renderer.setSize(width, height);

        console.log("Test2");
        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);

        // 直方体を作成
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        const geometry = new THREE.SphereGeometry(300, 30, 30);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
            rot += 0.5; // 毎フレーム角度を0.5度ずつ足していく
            // ラジアンに変換する
            const radian = (rot * Math.PI) / 180;
            // 角度に応じてカメラの位置を設定
            camera.position.x = 1000 * Math.sin(radian);
            camera.position.z = 1000 * Math.cos(radian);
            // 原点方向を見つめる
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            // レンダリング
            renderer.render(scene, camera);

            requestAnimationFrame(tick);
        }
    },

    // This function will be called when any of the inputs have changed
    change: function (inputs, outputs) {
        // ...
        console.log("Test3");
    }
})
