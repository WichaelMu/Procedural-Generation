

function MakeTree(x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;

    var box = new THREE.BoxGeometry(1, 1, 1);

    //  The trunk of the tree.
    var trunk_material = new THREE.MeshPhongMaterial();
    trunk_material.color = new THREE.Color(MW.RGB(139, 69, 19));
    var trunk = new THREE.Mesh(box, trunk_material);
    trunk.scale.set(.3, 1.5, .3);

    //  The leaves of the tree.
    var leaves_material_1 = new THREE.MeshLambertMaterial();
    var c = new THREE.Color(MW.RGB(58, 95, 11))
    leaves_material_1.color = c;
    leaves_material_1.emissive = c;
    var leaves_material_2 = new THREE.MeshLambertMaterial();
    var c2 = new THREE.Color(MW.RGB(20, 80, 20));
    leaves_material_2.color = c2;
    leaves_material_2.emissive = c2;

    var leaves1 = new THREE.Mesh(box, leaves_material_1);
    var r1 = Math.random();
    leaves1.position.set(r1, 1.3, -r1);

    var leaves2 = new THREE.Mesh(box, leaves_material_2);
    var r2 = Math.random();
    leaves2.position.set(r2, 1.6, -r2);

    var leaves3 = new THREE.Mesh(box, leaves_material_1);
    var r3 = Math.random();
    leaves3.position.set(-r3, 1.7, r3);

    var leaves4 = new THREE.Mesh(box, leaves_material_2);
    var r4 = Math.random();
    leaves4.position.set(-r4, 2, r4);
    
    var leaves5 = new THREE.Mesh(box, leaves_material_2);
    leaves5.position.set(0, 1, 0);
    
    var tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves1);
    tree.add(leaves2);
    tree.add(leaves3);
    tree.add(leaves4);
    tree.add(leaves5);
    
    tree.position.set(x, y, z);
    tree.scale.set(10, 10, 10);
    
    allTrees.push(tree);
    
    scene.add(tree);
}

//  Creates a plane.
function MakePlane(){
    PerlinGeometry = new THREE.PlaneBufferGeometry(width, height, resolution, resolution);
    PerlinGeometry.receiveShadow = true;
    PerlinGeometry.castShadow = true;
    //var geometry_material = new THREE.MeshBasicMaterial();
    Perlin_Material = new THREE.MeshPhongMaterial();
    Perlin_Material.flatShading = true;
    Perlin_Material.vertexColors = true;
    Perlin_Material.color = new THREE.Color(1, 1, 1);
    Perlin_Material.wireframe = false;
    Perlin_Mesh = new THREE.Mesh(PerlinGeometry, Perlin_Material);
    //  Flip the plane so that it's Z-Axis is facing in the world's positive Y-Axis.
    var rot = 270 * ((Math.PI * 2) / 360); //  Flip using Rad2Deg.
    Perlin_Mesh.rotation.x = rot;
    Perlin_Mesh.rotation.z = rot;
    
    scene.add(Perlin_Mesh);
}

function MakeSea(){
    sea = new THREE.PlaneBufferGeometry(width, height, resolution, resolution);

    //var geometry_material = new THREE.MeshBasicMaterial();
    sea_material = new THREE.MeshPhongMaterial();
    sea_material.flatShading = true;
    sea_material.shininess = 500;
    sea_material.color = new THREE.Color(0, 0, 1);

    //  Ensure the sea plane is see-through.
    sea_material.opacity = .75;
    sea_material.transparent = true;
    sea_material.wireframe = false;
    //sea_material.side = THREE.DoubleSide;
    sea_mesh = new THREE.Mesh(sea, sea_material);

    //  Flip the plane so that it's Z-Axis is facing in the world's positive Y-Axis.
    sea_mesh.rotation.x = 270 * ((Math.PI * 2) / 360); //  Flip using Rad2Deg.
    sea_mesh.position.set(0, 2, 0);
    sea_mesh.receiveShadow = true;

    waveHeight = 4;

    scene.add(sea_mesh);
}