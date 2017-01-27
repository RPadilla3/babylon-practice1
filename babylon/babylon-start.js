window.addEventListener('DOMContentLoaded', function() {
  var babylon = BABYLON;
  var canvas = document.getElementById('canvas');
  var engine = new babylon.Engine(canvas, true);

  var createScene = function() {
    var scene = new babylon.Scene(engine);
    scene.clearColor = new babylon.Color3.White();
    var material = new babylon.StandardMaterial('material1', scene);
    material.wireframe = true;
    var ground = babylon.Mesh.CreateGround('ground', 100, 50, 6, scene);
    var box = babylon.Mesh.CreateBox('Box', 4, scene);
    box.position.y = 2;
    var box2 = babylon.Mesh.CreateBox('Box1', 4, scene);
    box2.position.y = 10;

    var fountain = babylon.Mesh.CreateBox('fountain', 2, scene);
    fountain.position.x = 20;
    fountain.position.y = 1;

    var sphere = babylon.Mesh.CreateSphere('sphere', 100, 4, scene);
    sphere.position.x = -7.5;
    sphere.position.y = 2;

    var materialSphere = new babylon.StandardMaterial('texture1', scene);
    materialSphere.wireframe = true;
    sphere.material = materialSphere;

    var cone = babylon.Mesh.CreateCylinder('cone', 3, 0, 3, 20, true, scene);
    cone.position.z = 15;
    cone.position.y = 2;
    var cone2 = babylon.Mesh.CreateCylinder('cone2', 3, 3, 0, 20, true, scene);
    cone2.position.z = 15;
    cone2.position.y = 3;

    var torus = babylon.Mesh.CreateTorus('torus', 3, 0.5, 100, scene);
    torus.position.y = 2.5;
    torus.position.z = 15;

    var knot = babylon.Mesh.CreateTorusKnot('knot', 3, 1, 10, 20, 2, 3, scene);
    knot.position.x = 30;
    knot.position.y = 10;

    var materialKnot = new babylon.StandardMaterial('texture1', scene);
    materialKnot.wireframe = true;
    knot.material = materialKnot;

    var keys = [];
    var animation = new babylon.Animation("animation", "rotation.z", 30, babylon.Animation.ANIMATIONTYPE_FLOAT,
    babylon.Animation.ANIMATIONLOOPMODE_CYCLE);

    keys.push({
      frame: 0,
      value: 0
    });

    keys.push({
      frame: 50,
      value: Math.PI
    });

    keys.push({
      frame: 100,
      value: 0
    });

    animation.setKeys(keys);
    knot.animations.push(animation);
    scene.beginAnimation(knot, 0, 100, true);

    var torusKnot = babylon.Mesh.CreateTorusKnot('torusKnot', 3,1,100,8,2,3, scene);
    torusKnot.position.x = -30;
    torusKnot.position.y = 10;

    var materialtorusKnot1 = new babylon.StandardMaterial('texture1', scene);
    materialtorusKnot1.alpha = 0.7;
    materialtorusKnot1.hasAlpha = true;
    torusKnot.material = materialtorusKnot1;

    var camera = new babylon.ArcRotateCamera('arcCamera',
    babylon.Tools.ToRadians(45),
    babylon.Tools.ToRadians(45),
    10.0, box.position, scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.groundColor = new BABYLON.Color3.FromHexString('#1f32ad');

    scene.actionManager = new babylon.ActionManager(scene);
    scene.actionManager.registerAction(
      new babylon.ExecuteCodeAction({trigger: babylon.ActionManager.OnKeyUpTrigger, parameter: " "},
      function() {
        light.setEnabled(!light.isEnabled());
      }));

      return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function() {
      scene.render();
    });

    window.addEventListener('resize', function() {
      engine.resize();
    });

  });
