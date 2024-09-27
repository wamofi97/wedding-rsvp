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
    <div className="fixed left-0 top-0 z-10 w-full mx-[50%] -translate-x-[50%]" style={{ height:'100dvh', maxWidth: '700px'}} >
      <div className=' p-2 sm:p-4 absolute bottom-0 right-0'>
        <audio ref={audioRef} loop autoPlay>
          <source src="/weddingsong.mp3" type="audio/mpeg" />
        </audio>
        <button className={` bg-indigo-200 rounded-xl opacity-50  transition-transform duration-700 ease-in-out ${isPlaying ? 'animate-spin-slow' : ''}`}  style={{fontSize:'36px'}} onClick={togglePlay}>
          {isPlaying ? <MdOutlineMusicNote /> : <MdOutlineMusicOff /> }
        </button>
      </div>
      <style>{styles}</style>
    </div>
  );
}

export default Song;
