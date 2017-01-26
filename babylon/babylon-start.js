window.addEventListener('DOMContentLoaded', function() {
  var babylon = BABYLON;
  var canvas = document.getElementById('canvas');
  var engine = new babylon.Engine(canvas, true);

  var createScene = function() {
    var scene = new babylon.Scene(engine);
      scene.clearColor = new babylon.Color3.White();
    var material = new babylon.StandardMaterial('material1', scene);
      material.wireframe = true;
    var ground = babylon.Mesh.CreateGround('ground', 10,20,6, scene);
    var box = babylon.Mesh.CreateBox('Box', 4, scene);
    var box2 = babylon.Mesh.CreateBox('Box1', 4, scene);
      box2.position.y = 5;
    var fountain = babylon.Mesh.CreateBox('fountain', 2, scene);
      fountain.position.x = 20;
    var sphere = babylon.Mesh.CreateSphere('sphere', 10, 4, scene);
      sphere.position.x = 7.5;
    var cone = babylon.Mesh.CreateCylinder('cone', 3,0,3,20, true, scene);
      cone.position.z = 15;
    var cone2 = babylon.Mesh.CreateCylinder('cone2', 3,3,0,20, true, scene);
      cone2.position.z = 15;
      cone2.position.y = 3;
    var camera = new babylon.ArcRotateCamera('arcCamera',
      babylon.Tools.ToRadians(45),
      babylon.Tools.ToRadians(45),
      10.0, box.position, scene);
    camera.attachControl(canvas, true);

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
   fountain.animations.push(animation);
   scene.beginAnimation(fountain, 0, 100, true);


    var light = new babylon.PointLight('pointlight', new babylon.Vector3(0,50,0), scene);
      light.diffuse = new babylon.Color3(1,2,0);

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
