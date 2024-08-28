import { useEffect, useState } from 'react'

const Countdown = ({ weddingData }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(weddingData.wedding_date));

    useEffect(() => {
        const weddingDate = weddingData.wedding_date; // Declare weddingDate here
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
    <div className='d-flex flex-column align-items-center text-center w-100'>
        <h2>MENGHITUNG HARI</h2>
        <p>{timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds</p>
        <hr className='mt-5 w-100' style={{ height: '2px', backgroundColor: 'black' }} />
    </div>
  )
}

export default Countdown