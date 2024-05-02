import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VRPlayer from './VRPlayer';

function App() {
  const [isInVR, setIsInVR] = useState(false);

  const toggleVRMode = () => {
    setIsInVR(!isInVR);
  };

  // Example SBS video URL for testing
  const sbsVideoSource = "https://www.images.depthify.ai/dirtbike_sbs.mp4";

  return (
    <div className="App">
      {isInVR ? (
        <VRPlayer videoSource={sbsVideoSource} onExitVR={toggleVRMode} />
      ) : (
        <VideoPlayer sbsVideoSource={sbsVideoSource} onEnterVR={toggleVRMode} />
      )}
    </div>
  );
}

export default App;



