"use client"
import { useState, useEffect } from 'react';

const Timer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [lastTime, setLastTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const countdownDate = new Date(endDate).getTime(); // Використовуємо передану кінцеву дату
    startCountdown(countdownDate);
  }, [endDate]);

  const startCountdown = (endTime) => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00"
        });
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds
      });

      // Перевірка, чи змінилися значення часу для додавання анімації
      if (lastTime.hours !== hours.toString() || lastTime.minutes !== minutes.toString() || lastTime.seconds !== seconds.toString()) {
        setLastTime({
          hours: hours.toString(),
          minutes: minutes.toString(),
          seconds: seconds.toString()
        });
      }
    }, 1000);
  };

  return (
    <div className="text-center grid gap-30 bg-bgSecondary p-30 text-white rounded-img md:h-fit md:w-fit">
      
      <div className="grid gap-10">
        <p className='grid font-secondary text-xs items-center justify-self-start font-normal leading-tight '>Auction ends in:</p>
        <div className='grid grid-cols-3 justify-items-start gap-10'>
          <h3 className="flex gap-10">{timeLeft.hours}  <h3>:</h3></h3>
          <h3 className="flex gap-10">{timeLeft.minutes}  <h3>:</h3></h3>
          <h3 className="">{timeLeft.seconds}</h3>
        </div>
        <div className='font-secondary text-xs font-normal leading-tight grid grid-cols-3 justify-items-start gap-10'>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
      <button className="w-full rounded-img py-20 bg-action text-base font-semibold leading-relaxed transition-all ease-in duration-300 hover:scale-95 ">
        Place Bid
      </button>
    </div>
  );
};

export default Timer;
