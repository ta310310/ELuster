var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.VRControls(camera);
var effect = new THREE.VREffect(renderer);
var manager = new WebVRManager(renderer, effect);

var sceneCube  = new THREE.Scene();
var sceneSphere = new THREE.Scene();

var meshCube = new THREE.Mesh();



var SpaceSize = 50


var fps = 29.97;//1000 / 30;

var EarthRag = 180;
var EarthRagD= 0.001;
var EarthX=0;
var EarthY=0;
var EarthZ=0;
var EarthD= 15;
var EarthSize = 1

var MoonRag = 0;
var MoonRagD= 0.003;
var MoonX=0;
var MoonY=0;
var MoonZ=0;
var MoonD= 8;


function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

camera.position.set( 0, 0, 0 );

    controls.standing = true;

    effect.setSize(window.innerWidth, window.innerHeight);

    var light = new THREE.DirectionalLight(0xFFFFFF);
//    light.position.set(1.0, 1.0, 1.0);
    light.position.set(0, 0, 0);
    scene.add( light );

    var ambientLight = new THREE.AmbientLight(0x888888);
    scene.add( ambientLight );

    var scenePhoto = new THREE.Scene();
    var loaderPhoto = new THREE.TextureLoader();
    var texturePhoto = loaderPhoto.load( './img/starfield.jpg');
    var materialPhoto = new THREE.MeshLambertMaterial({ map:texturePhoto, side:THREE.DoubleSide });
    var geometryPhoto = new THREE.SphereGeometry(SpaceSize,64,64);
    var meshPhoto = new THREE.Mesh( geometryPhoto, materialPhoto );
    scenePhoto.position.set( 0,0,0);
    scenePhoto.add( meshPhoto );
    scene.add( scenePhoto );

//ちきう
    var sceneEarth = new THREE.Scene();
    var loaderEarth = new THREE.TextureLoader();
    var textureEarth = loaderPhoto.load( './img/Earth.jpg');
    var materialEarth = new THREE.MeshLambertMaterial({ map:textureEarth, side:THREE.DoubleSide });
    var geometryEarth = new THREE.SphereGeometry(EarthSize,64,64);
    var meshEarth = new THREE.Mesh( geometryEarth, materialEarth );
    sceneEarth.position.set( 10,0,0);
    sceneEarth.add( meshEarth );
    scene.add( sceneEarth );

//つ↑き↓

    var sceneMoon = new THREE.Scene();
    var loaderMoon = new THREE.TextureLoader();
    var textureMoon = loaderPhoto.load( './img/Mercator_Moon.png');
    var materialMoon = new THREE.MeshLambertMaterial({ map:textureMoon, side:THREE.DoubleSide });
//    var materialMoon = new THREE.MeshLambertMaterial({ color: 0xEEEEEE, side:THREE.DoubleSide });
    var geometryMoon = new THREE.SphereGeometry(EarthSize/4,64,64);
    var meshMoon = new THREE.Mesh( geometryMoon, materialMoon );
    sceneMoon.position.set( 10,0,0);
    sceneMoon.add( meshMoon );
    scene.add( sceneMoon );


    // ループ処理を呼び出す
    (function(){
    	EarthRag = EarthRag + EarthRagD;
    	if(EarthRag>=360)EarthRag=0;
    	EarthX = Math.cos(EarthRag)*EarthD;
    	EarthZ = Math.sin(EarthRag)*EarthD;
	    sceneEarth.position.set( EarthX , EarthY , EarthZ );
    	sceneEarth.rotation.set(0,
    							sceneEarth.rotation.y -= 0.1,
    							0);


    	MoonRag = MoonRag + MoonRagD;
    	if(MoonRag>=360)MoonRag=0;
    	MoonX = Math.cos(MoonRag)*MoonD;
    	MoonZ = Math.sin(MoonRag)*MoonD;
	    sceneMoon.position.set( sceneEarth.position.x + MoonX,
	    						sceneEarth.position.y + MoonY,
	    						sceneEarth.position.z + MoonZ);
    	sceneMoon.rotation.set(0,
    							sceneMoon.rotation.y -= 0.033,
    							0);



        // フラグにより再帰呼び出し
        setTimeout(arguments.callee, fps);
    })();





}

var lastRender = 0;
function render(timestamp) {
    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;

    meshCube.rotation.x += delta * 0.0005
    meshCube.rotation.z += delta * 0.001

    requestAnimationFrame(render);
    controls.update();
    manager.render(scene, camera, timestamp);
}

init();
render(performance ? performance.now() : Date.now());
