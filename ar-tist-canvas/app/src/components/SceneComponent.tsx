import React, { useEffect, useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';

export default function SceneComponent(props: any) {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    id,
  } = props;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);

      if (scene.isReady()) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((_scene) => onSceneReady(_scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }

    return () => {};
  }, [reactCanvas]);

  return (
    <canvas ref={reactCanvas} id={id} style={{ width: '500px', height: '500px' }} />
  );
}
