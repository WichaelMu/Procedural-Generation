

var MW;
var clock;
var camera;
var scene;
var renderer;

var width, height, scale;
var resolution;
var heightMultiplier;

var offsetX, offsetY;
var offsetDeltaX, offsetDeltaY;

var PerlinGeometry, Perlin_Material, Perlin_Mesh;
var bDrawColours = true;

var sea, sea_material, sea_mesh;

var wavesSpeedX = 0, wavesSpeedY = 0;
var waveHeight;

var treeMxN, currentTrees;
var allTrees = [];

var controls;

const gui = new dat.GUI();

BeginPlay();

//  Called before the first frame.
function BeginPlay(){

    MW = new MW();

    clock = new THREE.Clock();

    //  Plane settings.
    width = 2048;
    height = 2048;
    resolution = 600;
    
    //  Perlin noise settings. [PLANE]
    scale = 250;
    heightMultiplier = 105;
    offsetY = 0.0;
    offsetX = 0.0;

    offsetDeltaX = .025;
    offsetDeltaY = .025;
    
    // Set the position of the camera varying to the size of the plane.
    camera.position.set(0, height, 0);
    //camera.lookAt(scene.position);
    
    //const points = [];

    //  Maximum number of Trees.
    treeMxN = 50;
    currentTrees = 0;
    
    MakePlane();
    UpdatePlane();
    MakeSea();
    
    //OnGUI();
}

//  Whether or not to move the plane.
var move = false;

//  Called once per frame.
var Tick = function(){
    requestAnimationFrame(Tick);        //                                              //  Do not modify.
    controls.update();                  //                                              //
    var deltaTime = clock.getDelta();   //  The time taken since the previous frame.    //
    renderer.render(scene, camera);     //                                              //
    
    //  ...
    
    UpdateSea();

    
    //  Apply a spinning rotation to the plane.
    //geometry_mesh.rotation.z += .5 * deltaTime;
    
    if (move) {
        //offsetX += offsetDeltaX;
        offsetY += offsetDeltaY;
        UpdatePlane();
        allTrees.forEach(UpdateTrees);
    }

    wavesSpeedX += .7 * deltaTime;
    //wavesSpeedY += .7 * deltaTime;
}

const cameraMove = 2;
document.addEventListener('keydown', onKeyPress, false);
function onKeyPress(event){
    var key = event.which;

    if (key == 32) { //  Space
        camera.position.set(0,250,250);
        camera.position.y += cameraMove;
    }else if (key == 66) {   //  B
        camera.position.set(0, 0, 10);
    } else if (key == 65) { //  A
        move = !move;
    }

    camera.lookAt(0,0,0);
}

Tick();






function OnGUI(){
    var HUD = {

        //  Plane settings.
        width : 2048,
        height : 2048,
        resolution : 600,

        //  Perlin noise settings. [PLANE]
        scale : 250,
        heightMultiplier : 105,
        move : false,

        //  Waves settings.
        wavesSpeedX : 0,
        wavesSpeedY : 0,
        wavesHeight : 10
    };

    var FTerrain = gui.addFolder('Terrain');
    FTerrain.add(HUD, 'width').min(0).max(2048).step(2);
    FTerrain.add(HUD, 'height').min(0).max(2048).step(2);
    FTerrain.add(HUD, 'resolution').min(100).max(2400).step(50);

    var FPerlin = gui.addFolder('Perlin');
    FPerlin.add(HUD, 'scale').min(0).max(250).step(1);
    FPerlin.add(HUD, 'heightMultiplier');
    FPerlin.add(HUD, 'move');

    var FWaves = gui.addFolder('Waves');
    FWaves.add(HUD, 'wavesSpeedX');
    FWaves.add(HUD, 'wavesSpeedY');
    FWaves.add(HUD, 'wavesHeight');
}   