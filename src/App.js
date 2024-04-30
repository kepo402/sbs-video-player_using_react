// App.js
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VRPlayer from './VRPlayer';

function App() {
  const [isInVR, setIsInVR] = useState(false);

  const toggleVRMode = () => {
    setIsInVR(!isInVR);
  };

  return (
    <div className="App">
      {isInVR ? (
        <VRPlayer onExitVR={toggleVRMode} />
      ) : (
        <VideoPlayer onEnterVR={toggleVRMode} />
      )}
    </div>
  );
}

export default App;
