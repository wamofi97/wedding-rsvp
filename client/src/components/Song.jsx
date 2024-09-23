import { useRef, useState,useEffect } from 'react';
import { MdOutlineMusicNote } from "react-icons/md";
import { MdOutlineMusicOff } from "react-icons/md";


const Song = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    
    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 0.5; 
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

  const styles = `
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .animate-spin-slow {
      animation: spin-slow 4s linear infinite;
    }
  `;

  return (
    <div className="z-10 max-w-96 right-6 bottom-4 fixed" >
      <audio ref={audioRef} loop autoPlay>
        <source src="/weddingsong.mp3" type="audio/mpeg" />
      </audio>
      <button className={` bg-indigo-200 rounded-xl opacity-50  transition-transform duration-700 ease-in-out ${isPlaying ? 'animate-spin-slow' : ''}`}  style={{fontSize:'36px'}} onClick={togglePlay}>
        {isPlaying ? <MdOutlineMusicNote /> : <MdOutlineMusicOff /> }
      </button>
      <style>{styles}</style>
    </div>
  );
}

export default Song;
