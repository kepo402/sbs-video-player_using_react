import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr'; // Import XR component
import * as THREE from 'three'; // Import THREE

const VRPlayer = ({ videoSource, onExitVR }) => {
  const videoRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.crossOrigin = 'anonymous'; // Allow cross-origin requests if necessary
      videoElement.src = videoSource;
      videoElement.load();

      const texture = new THREE.VideoTexture(videoElement);
      setTexture(texture);
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

