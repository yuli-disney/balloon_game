window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
    });
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = '../fireroom.glb';

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(400.0, 400.0, 400.0);
            model.position.set(0, -400, 0);
            scene.add(gltf.scene);
            playbutton = document.getElementById("play_action");
            playbutton.onclick = function(){
            console.log("クリックされたよ");
            const mixer = new THREE.AnimationMixer(gltf.scene);
            const action = mixer.clipAction(animation);
            action.play()
            }
            
            // model["test"] = 100;
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    playbutton = document.getElementById("play_action");
    playbutton.onclick = function(){
        console.log("クリックされたよ");
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animation[0]);
        action.play()
    }

    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    // シーンに追加
    scene.add(light);

    // 初回実行
    tick();

    function tick() {
        controls.update();

        if (model != null) {
            console.log(model);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}