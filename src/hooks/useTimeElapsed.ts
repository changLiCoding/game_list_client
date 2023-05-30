import { useEffect, useState } from 'react';

export default function useTimeElapsed(timestamp: string) {
  const [timeElapsed, setTimeElapsed] = useState<{
    days: number;
    hours: number;
  }>({
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const currentDate = new Date();
      const previousDate = new Date(timestamp);
      const timeDifference = currentDate.getTime() - previousDate.getTime();
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const daysElapsed = Math.floor(timeDifference / millisecondsPerDay);
      const hoursElapsed = Math.floor(
        (timeDifference % millisecondsPerDay) / (60 * 60 * 1000)
      ); // Number of hours in remaining time

      setTimeElapsed({ days: daysElapsed, hours: hoursElapsed });
    };

    calculateTimeElapsed();
  }, [timestamp]);

  return timeElapsed;
}
