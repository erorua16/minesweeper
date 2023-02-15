import React from 'react';

const Timer = () => {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes => minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return <>
    <div className="w-24 mx-1 p-2 bg-white text-indigo-700 rounded-lg">
        <div className="font-mono leading-none" x-text="minutes">{minutes}</div>
        <div className="font-mono uppercase text-sm leading-none">Minutes</div>
    </div>

    <div className="w-24 mx-1 p-2 bg-white text-indigo-700 rounded-lg">
        <div className="font-mono leading-none" x-text="seconds">{seconds}</div>
        <div className="font-mono uppercase text-sm leading-none">Seconds</div>
    </div>
  </>
};

export default Timer;