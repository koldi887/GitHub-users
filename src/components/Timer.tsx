import React, { useEffect, useState } from "react";

interface ITimerProps {
  seconds: number;
  onSecondChange: (value: number) => void;
  timerKey: number;
}

export const Timer: React.FC<ITimerProps> = (props) => {
  const [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.onSecondChange(seconds);
  }, [seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [props.timerKey]);

  return (
    <div>
      <h1>{seconds}</h1>
    </div>
  );
};
