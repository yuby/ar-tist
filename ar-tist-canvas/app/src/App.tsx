import React, { ReactElement } from 'react';
import {
  FreeCamera, Vector3, HemisphericLight, MeshBuilder,
  Scene, Mesh,
} from '@babylonjs/core';
import SceneComponent from './components/SceneComponent';
import * as artist from '../../pkg/ar-tist';

let box: Mesh;

const onSceneReady = (scene: Scene) => {
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  camera.attachControl(canvas, true);

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

  box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

  box.position.y = 1;

  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
};

const onRender = (scene: Scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default function App(): ReactElement {
  return (
    <div>
      App
      <button
        type="button"
        onClick={() => artist.greet()}
      >
        WASM
      </button>
      <SceneComponent
        id="my-canvas"
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
      />
    </div>
  );
}
