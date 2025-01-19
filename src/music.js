import React, { useState, useEffect } from "react";
import ReactHowler from "react-howler";

const Music = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent space from scrolling the page
        setIsMuted(prev => !prev); // Use state updater function instead
      }
    };

    const handleVisibilityChange = () => {
      setIsPlaying(!document.hidden);
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Remove dependency since we're using state updater

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 1000,
    }}>
      <div 
        onClick={toggleMute}
        style={{
          display: 'flex',
          gap: '2px',
          padding: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'opacity 0.3s ease',
          opacity: (isMuted || !isPlaying) ? 0.5 : 1,
        }}
      >
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            style={{
              width: '3px',
              height: '12px',
              backgroundColor: '#1DB954', // Spotify green
              animation: (isMuted || !isPlaying) ? 'none' : `musicBar${bar} 1.5s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <ReactHowler
        src="/music.mp3"
        playing={isPlaying}
        loop={true}
        volume={isMuted ? 0 : 0.5} // Fixed volume at 50%
      />
      <style>
        {`
          @keyframes musicBar1 {
            0%, 100% { transform: scaleY(0.5); }
            50% { transform: scaleY(1); }
          }
          @keyframes musicBar2 {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.5); }
          }
          @keyframes musicBar3 {
            0%, 100% { transform: scaleY(0.7); }
            50% { transform: scaleY(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Music;
