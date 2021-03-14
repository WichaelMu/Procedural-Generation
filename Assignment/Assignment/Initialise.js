

scene = new THREE.Scene();
    
var ratio = window.innerWidth / window.innerHeight;

// FOV, size, near, far clipping planes.
camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 10000);

var light = new THREE.DirectionalLight(0xFFFFFF, 1, 500);
light.position.set(0, 50, -25);
scene.add(light);

// var light = new THREE.DirectionalLight(0xFFFFFF, 1);
// light.position.set(0,50,100);
// scene.add(light);

renderer = new THREE.WebGLRenderer();
renderer.antialias = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0.1, 0.1, 0.1));
//renderer.setClearColor(new THREE.Color(1, 1, 1));
document.body.appendChild(renderer.domElement);

//  Mouse controls for panning, zooming and rotating the camera.
controls = new THREE.OrbitControls(camera, renderer.domElement);

//  Automatically respond to the screen resizing.
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})