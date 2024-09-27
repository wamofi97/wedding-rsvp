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
    <div className='w-full text-center '>
        <h5 className='font-medium mb-4 text-rose-950'>Menghitung Hari</h5>
        <div className='flex justify-center items-center gap-10'>
            <div>
                <p className='clash-display font-medium text-3xl'  >{timeLeft.days}</p>
                <p>Hari</p>
            </div>
            {/* <p className='font:bold text-2xl'>,</p> */}
            <div>
                <p className='clash-display font-medium text-3xl' >{timeLeft.hours}</p>
                <p>Jam</p>
            </div>
            {/* <p className='font:bold text-2xl'>,</p> */}
            <div>
                <p className='clash-display font-medium text-3xl'>{timeLeft.minutes}</p>
                <p>Minit</p>
            </div>
            {/* <p className='font:bold text-2xl'>,</p> */}
            <div>
                <p className='clash-display font-medium text-3xl'>{timeLeft.seconds}</p>
                <p>Saat</p>
            </div>
        </div>
        <hr className='my-12 h-1 bg-neutral-500 opacity-10 mx-auto'/>
    </div>
  )
}

export default Countdown