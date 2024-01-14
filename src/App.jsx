// TimerApp.js
import React, { useState, useEffect } from 'react';
import './App.css';

const TimerApp = () => {
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [todayTotalTimeInSeconds, setTodayTotalTimeInSeconds] = useState(0);
  const [timeEntries, setTimeEntries] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const updateTimer = () => {
    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const updateTotalTime = () => {
    const totalHours = Math.floor(todayTotalTimeInSeconds / 3600);
    const totalMinutes = Math.floor((todayTotalTimeInSeconds % 3600) / 60);
    const totalSeconds = todayTotalTimeInSeconds % 60;
    return `${pad(totalHours)}:${pad(totalMinutes)}:${pad(totalSeconds)}`;
  };

  const updateEntryTime = (seconds) => {
    const wholeSeconds = Math.floor(seconds);
    const hours = Math.floor(wholeSeconds / 3600);
    const minutes = Math.floor((wholeSeconds % 3600) / 60);
    const entrySeconds = wholeSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(entrySeconds)}`;
  };

  const pad = (num) => {
    return num.toString().padStart(2, '0');
  };

  const startTimer = () => {
    if (!timerInterval) {
      setStartTime(Date.now() / 1000);
      setTimerInterval(
        setInterval(() => {
          setTotalTimeInSeconds((prevTime) => prevTime + 1);
          setTodayTotalTimeInSeconds((prevTotalTime) => prevTotalTime + 1);
          setIsRunning(true);
        }, 1000)
      );
    }
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setIsRunning(false);
    if (isRunning) {
      const endTime = Date.now() / 1000;
      const elapsedTime = endTime - startTime;
      setTimeEntries((prevEntries) => [...prevEntries, elapsedTime]);
    }
    setTotalTimeInSeconds(0);
  };

  const calculateProgressBarWidth = () => {
    // Assuming a maximum time of 10 hours for demonstration purposes
    const maxTimeInSeconds = 10 * 3600;
    const percentage = (todayTotalTimeInSeconds / maxTimeInSeconds) * 100;
    return `${percentage}%`;
  };

  return (
    <div className="container">
      <h1>Time Tracker</h1>
      <div id="timer">{updateTimer()}</div>
      <div id="total-time">Total Time Today: {updateTotalTime()}</div>
      <div className="progress-bar" style={{ width: calculateProgressBarWidth() }}></div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      {timeEntries.length > 0 && (
        <div>
          <h2>Time Intervals:</h2>
          <ul>
            {timeEntries
              .sort((a, b) => b - a)
              .map((entry, index) => (
                <li key={index} id="color">{`Concentration_time ${index + 1}: ${updateEntryTime(entry)}`}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimerApp;
