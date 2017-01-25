window.addEventListener('DOMContentLoaded', function() {
      var canvas = document.getElementById('canvas');
      var engine = new BABYLON.Engine(canvas, true);

      var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        var material = new BABYLON.StandardMaterial('material1', scene);
        material.wireframe = true;
        var box = BABYLON.Mesh.CreateBox('Box', 4.0, scene);

        var camera = new BABYLON.ArcRotateCamera('arcCamera',
          BABYLON.Tools.ToRadians(45),
          BABYLON.Tools.ToRadians(45),
          10.0, box.position, scene);
        camera.attachControl(canvas, true);

        var light = new BABYLON.PointLight('pointlight', new BABYLON.Vector3(0,10,0), scene);
        light.diffuse = new BABYLON.Color3(1,0,0);

        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: " "},
          function() {
            light.setEnabled(!light.isEnabled());
          }));

        return scene;
      }

      var scene = createScene();
      engine.runRenderLoop(function() {
        scene.render();
      });
});
