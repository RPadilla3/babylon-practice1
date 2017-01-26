window.addEventListener('DOMContentLoaded', function() {
  var babylon = BABYLON;
  var canvas = document.getElementById('canvas');
  var engine = new babylon.Engine(canvas, true);

  var createScene = function() {
    var scene = new babylon.Scene(engine);
      scene.clearColor = new babylon.Color3.White();
    var material = new babylon.StandardMaterial('material1', scene);
      material.wireframe = true;
    var box = babylon.Mesh.CreateBox('Box', 4.0, scene);
    var sphere = babylon.Mesh.CreateSphere('sphere', 10, 4, scene);
    sphere.position.x = -7.5;
    var cone = babylon.Mesh.CreateCylinder('cone', 3,0,3,20, true, scene);
    cone.position.z = -15;

    var camera = new babylon.ArcRotateCamera('arcCamera',
      babylon.Tools.ToRadians(45),
      babylon.Tools.ToRadians(45),
      10.0, box.position, scene);
    camera.attachControl(canvas, true);

    var light = new babylon.PointLight('pointlight', new babylon.Vector3(0,10,0), scene);
         light.diffuse = new babylon.Color3(1,0,0);

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
