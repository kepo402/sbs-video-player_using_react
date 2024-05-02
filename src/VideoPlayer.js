// VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ onEnterVR }) => {
  return (
    <div>
      <video controls>
        <source src="path/to/2D/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={onEnterVR}>Enter VR Mode</button>
    </div>
  );
};

export default VideoPlayer;
