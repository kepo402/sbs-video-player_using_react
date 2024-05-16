import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import * as THREE from 'three';

const VRPlayer = ({ videoSource, onExitVR }) => {
  const videoRef = useRef();
  const [textureLeft, setTextureLeft] = useState(null);
  const [textureRight, setTextureRight] = useState(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.crossOrigin = 'anonymous';
      videoElement.src = videoSource;
      videoElement.load();

      console.log('Video element:', videoElement);

      videoElement.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded:', videoElement.duration);
      });

      const textureLeft = new THREE.VideoTexture(videoElement);
      const textureRight = new THREE.VideoTexture(videoElement);

      console.log('Texture left:', textureLeft);
      console.log('Texture right:', textureRight);

      // Set offsets to display left and right eye parts of the video
      textureLeft.offset.set(0, 0);
      textureLeft.repeat.set(0.5, 1);
      textureRight.offset.set(0.5, 0);
      textureRight.repeat.set(0.5, 1);

      setTextureLeft(textureLeft);
      setTextureRight(textureRight);
    }
  }, [videoSource]);

  return (
    <>
      <Canvas
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 0], fov: 75 }}
        onCreated={({ gl }) => {
          gl.xr.enabled = true;
        }}
      >
        <color attach="background" args={['#000']} />
        <ambientLight />
        {textureLeft && textureRight && (
          <>
            <mesh position={[-4, 0, 0]}>
              <planeGeometry args={[8, 9]} />
              <meshBasicMaterial side={THREE.DoubleSide} map={textureLeft} />
            </mesh>
            <mesh position={[4, 0, 0]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[8, 9]} />
              <meshBasicMaterial side={THREE.DoubleSide} map={textureRight} />
            </mesh>
          </>
        )}
        <XR />
      </Canvas>
      <button onClick={onExitVR}>Exit VR Mode</button>
    </>
  );
};

export default VRPlayer;



