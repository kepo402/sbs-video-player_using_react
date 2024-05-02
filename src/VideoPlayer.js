import React from 'react';

const VideoPlayer = ({ sbsVideoSource, onEnterVR }) => {
  return (
    <div>
      <video controls>
        <source src={sbsVideoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={onEnterVR}>Enter VR Mode</button>
    </div>
  );
};

export default VideoPlayer;
