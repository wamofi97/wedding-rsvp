import { useRef, useState,useEffect } from 'react';

const Song = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    
    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 1; 
      }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        setIsPlaying(!isPlaying);
        if (isPlaying) {
        audio.pause();
        } else {
        audio.play();
        }
    };

  return (
    <div className="background-music">
      <audio ref={audioRef} loop>
        <source src="/weddingsong.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  );
}

export default Song;
