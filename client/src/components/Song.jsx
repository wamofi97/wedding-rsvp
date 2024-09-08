import { useRef, useState,useEffect } from 'react';

const Song = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    
    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 0; 
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
    <div className="background-music d-flex justify-content-center">
      <audio ref={audioRef} loop autoPlay>
        <source src="/weddingsong.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  );
}

export default Song;
