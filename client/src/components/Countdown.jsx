import { useEffect, useState } from 'react'

const Countdown = ({ weddingData }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(weddingData.date));

    useEffect(() => {
        const weddingDate = weddingData.date;
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(weddingDate));
        }, 1000);
        
        return () => clearInterval(timer);
    }, [weddingData]);

    function calculateTimeLeft(weddingDate) {
        const difference = +new Date(weddingDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

  return (
    <div className='w-full text-center p-12 bg-opacity-10 bg-slate-400'>
        <h5 className='font-medium mb-4 text-rose-950'>Menghitung Hari</h5>
        <div className='flex justify-center items-center gap-4 sm:gap-10'>
            <div className='shadow-lg rounded-lg p-3 w-20 shadow-slate-300' >
                <p className='clash-display font-medium text-2xl sm:text-3xl'  >{timeLeft.days}</p>
                <p>Hari</p>
            </div>
            <div className='shadow-lg rounded-lg p-3 w-20 shadow-slate-300'>
                <p className='clash-display font-medium text-2xl sm:text-3xl' >{timeLeft.hours}</p>
                <p>Jam</p>
            </div>
            <div className='shadow-lg rounded-lg p-3 w-20 shadow-slate-300'>
                <p className='clash-display font-medium text-2xl sm:text-3xl'>{timeLeft.minutes}</p>
                <p>Minit</p>
            </div>
            <div className='shadow-lg rounded-lg p-3 w-20 shadow-slate-300'>
                <p className='clash-display font-medium text-2xl sm:text-3xl'>{timeLeft.seconds}</p>
                <p>Saat</p>
            </div>
        </div>
    </div>
  )
}

export default Countdown