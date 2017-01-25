window.addEventListener('DOMContentLoaded', function() {
      var canvas = document.getElementById('canvas');
      var engine = new BABYLON.Engine(canvas, true);

      var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        var box = BABYLON.Mesh.CreateBox('Box', 4.0, scene)

        var camera = new BABYLON.ArcRotateCamera('arcCamera',
          BABYLON.Tools.ToRadians(45),
          BABYLON.Tools.ToRadians(45),
          10.0, box.position, scene);
        camera.attachControl(canvas, true);

        return scene;
      }

      var scene = createScene();
      engine.runRenderLoop(function() {
        scene.render();
      });
});
