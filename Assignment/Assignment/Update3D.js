
function UpdateTrees(object){
    object.position.x -= 6.25;

    if (-object.position.x > width / 2 || object.position.x > width / 2 || -object.position.z > width / 2 || object.position.z > width / 2) {
        scene.remove(object);
        currentTrees -= 1;
        object.position.set(0, 0, 0);
    }
}

function UpdateSea(){
    var v = sea_mesh.geometry.attributes.position.array;

    for(var i = 0; i < v.length; i += 3) {
        v[i+2] = Noise.PerlinNoise(v[i] / scale + wavesSpeedX, v[i+1] / scale + wavesSpeedY) * waveHeight;
    }

    sea_mesh.geometry.attributes.position.needsUpdate = true;
}

//  Updates the plane's attributes.
function UpdatePlane() {
    //  Converts the positions of the vertices that make up the plane into an array.
    //  Later used for modifying the Z-Axis points with Perlin noise.
    var v = Perlin_Mesh.geometry.attributes.position.array;

    const colours = [];

    for(var i = 0; i <= v.length; i += 3){
        //  X = v[i].
        //  Y = v[i+1].
        //  Z = v[i+2].
        //  Modify the Z-Axis of this vertex to push it upwards by perlin noise and height multiplier.
        //  This modification is based on the X and Y positions of the plane in world space.
        var x = v[i] / scale + offsetX;
        var y = v[i+1] / scale + offsetY;
        var Perlin = Noise.PerlinNoise(x, y);

        //  Plane colours and heights according to their Perlin noise value.
        if (Perlin < -.8) {                 //  Deep ocean.
            colours.push(0, 0, 0);
        }
        else if (Perlin < -.7) {            //  Ocean.
            colours.push(0, 0, .1)
            v[i+2] = Perlin * heightMultiplier;
        }
        else if (Perlin < -.6) {            //  Ocean 2.
            colours.push(0, 0, .25)
            v[i+2] = Perlin * heightMultiplier * .9;
        }
        else if (Perlin < -.5) {            //  Ocean 3.
            colours.push(0, 0, .5)
            v[i+2] = Perlin * heightMultiplier * .85;
        }
        else if (Perlin < -.4) {            //  Deep Waters.
            colours.push(0, 0, .75)
            v[i+2] = Perlin * heightMultiplier * .8;
        }
        else if (Perlin < -.3) {            //  Deep Waters 2.
            colours.push(0, 0, .85)
            v[i+2] = Perlin * heightMultiplier * .8;
        }
        else if (Perlin < -.2) {            //  Shoreline.
            colours.push(.25, .25, .75);
            v[i+2] = Perlin * heightMultiplier * .7;
        }
        else if (Perlin < -.1) {            //  Shoreline 2.
            colours.push(.25, .25, .75);
            v[i+2] = Perlin * heightMultiplier * .75;
        }
        else if (Perlin < -.05) {            //  Shoreline 2.
            colours.push(.25, .25, .65);
            v[i+2] = Perlin * heightMultiplier * .77;
        }
        else if (Perlin < 0) {              //  Beach.
            colours.push(.7, .7, 1);
            v[i+2] = Perlin * heightMultiplier * .8;
        }
        else if (Perlin < .025) {             //  Beach 2.
            colours.push(.8, .8, 1)
            v[i+2] = Perlin * heightMultiplier * .2;
        }
        else if (Perlin < .05) {             //  Beach 3.
            colours.push(.8, .8, 0)
            v[i+2] = Perlin * heightMultiplier * .5;
        }
        else if (Perlin < .075) {             //  Beach 4.
            colours.push(1, 1, .5)
            v[i+2] = Perlin * heightMultiplier * .5;
        }
        else if (Perlin < .1) {             //  Beach 2.
            colours.push(1, 1, 0)
            v[i+2] = Perlin * heightMultiplier * .5;
        }
        else if (Perlin < .15) {            //  Grassland.
            colours.push(1, 1, 0);
            v[i+2] = Perlin * heightMultiplier * .6;
        }
        else if (Perlin < .25) {            //  Grassland 2.
            colours.push(.5, 1, 0);

            if (currentTrees < treeMxN) {
                if (Math.random() < .001) {
                    MakeTree(v[i+1] + offsetY, Perlin * heightMultiplier * .6, v[i] + offsetX);
                    currentTrees += 1;
                }
            }

            v[i+2] = Perlin * heightMultiplier * .6;
        }
        else if (Perlin < .3) {             //  Grassland 3.
            colours.push(0, 1, 0);
            v[i+2] = Perlin * heightMultiplier * .6;
        }
        else if (Perlin < .35){              //  Low Mountain.
            colours.push(.62, .32, .17)
            v[i+2] = Perlin * heightMultiplier * .65;
        }
        else if (Perlin < .4){              //  Low Mountain 2.
            colours.push(.54, .27, .07);
            v[i+2] = Perlin * heightMultiplier;
        }
        else if (Perlin < .5){              //  Mountain 1.
            colours.push(.66, .66, .66);
            v[i+2] = Perlin * heightMultiplier * 1.1;
        }
        else if (Perlin < .55){             //  Mountain 2.
            colours.push(.5, .5, .5);
            v[i+2] = Perlin * heightMultiplier * 1.3;
        }
        else if (Perlin < .60){             // High Mountain.
            colours.push(.41, .41, .41);
            v[i+2] = Perlin * heightMultiplier * 1.5;
        }
        else if (Perlin < .61){             // High Mountain.
            colours.push(.51, .51, .51);
            v[i+2] = Perlin * heightMultiplier * 1.6;
        }
        else if (Perlin < .62){             // High Mountain.
            colours.push(.71, .71, .71);
            v[i+2] = Perlin * heightMultiplier * 1.65;
        }
        else if (Perlin < .63){             // High Mountain.
            colours.push(.81, .81, .81);
            v[i+2] = Perlin * heightMultiplier * 1.675;
        }
        else if (Perlin < .64){             // High Mountain.
            colours.push(.91, .91, .91);
            v[i+2] = Perlin * heightMultiplier * 1.68;
        }
        else if (Perlin < .65){             //  Snow Summit.
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 1.7;
        }
        else if (Perlin < .66){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 1.75;
        }
        else if (Perlin < .67){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 1.8;
        }
        else if (Perlin < .68){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 1.85;
        }
        else if (Perlin < .69){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 1.9;
        }
        else if (Perlin < .7){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 1.95;
        }
        else if (Perlin < .71){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2;
        }
        else if (Perlin < .72){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.05;
        }
        else if (Perlin < .73){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.1;
        }
        else if (Perlin < .74){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.15;
        }
        else if (Perlin < .75){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.2;
        }
        else if (Perlin < .76){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.25;
        }
        else if (Perlin < .77){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.3;
        }
        else if (Perlin < .78){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.35;
        }
        else if (Perlin < .79){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.4;
        }
        else if (Perlin < .8){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.45;
        }
        else if (Perlin < .81){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.5;
        }
        else if (Perlin < .82){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.55;
        }
        else if (Perlin < .83){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.6;
        }
        else if (Perlin < .84){
            colours.push(1, 1, 1);
            v[i+2] = Perlin * heightMultiplier * 2.65;
        }
        else {                              //  Failure / Default.
            colours.push(1, 1, 1);
        }
    }

    //  Ensures the mesh moves along with the Perlin noise offset/s.
    Perlin_Mesh.geometry.attributes.position.needsUpdate = true;

    //  Set the colours of the triangle faces.
    if (bDrawColours)
        PerlinGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colours), 3));
}