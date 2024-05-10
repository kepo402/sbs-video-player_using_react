import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import * as THREE from 'three';

const VRPlayer = ({ videoSource, onExitVR }) => {
  const videoRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.crossOrigin = 'anonymous';
      videoElement.src = videoSource;
      videoElement.load();

      const texture = new THREE.VideoTexture(videoElement);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;

      setTexture(texture);
    }
  }, [videoSource]);

  return (
    <>
      <Canvas
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.xr.enabled = true;
        }}
      >
        <ambientLight />
        {texture && (
          <mesh>
            <planeGeometry args={[16, 9]} />
            <meshBasicMaterial side={THREE.DoubleSide} map={texture} />
          </mesh>
        )}
        <XR />
      </Canvas>
      <button onClick={onExitVR}>Exit VR Mode</button>
    </>
  );
};

export default VRPlayer;
