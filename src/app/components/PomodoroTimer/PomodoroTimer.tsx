"use client";

import React, { useState, useEffect } from 'react';

interface TimerConfig {
    pomodoroDuration?: number;
    shortBreakDuration?: number;
    longBreakDuration?: number;
    pomodorosForLongBreak?: number;
}

const PomodoroTimer: React.FC<TimerConfig> = ({
    pomodoroDuration: initialPomodoroDuration = 25,
    shortBreakDuration: initialShortBreakDuration = 5,
    longBreakDuration: initialLongBreakDuration = 15,
    pomodorosForLongBreak: initialPomodorosForLongBreak = 4,
}) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(initialPomodoroDuration);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [isShortBreak, setIsShortBreak] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [pomodoroTotalCount, setPomodoroTotalCount] = useState(0);
    const [shortBreakCount, setShortBreakCount] = useState(0);
    const [longBreakCount, setLongBreakCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [pomodoroDuration, setPomodoroDuration] = useState(initialPomodoroDuration);
    const [shortBreakDuration, setShortBreakDuration] = useState(initialShortBreakDuration);
    const [longBreakDuration, setLongBreakDuration] = useState(initialLongBreakDuration);
    const [pomodorosForLongBreak, setPomodorosForLongBreak] = useState(initialPomodorosForLongBreak);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(interval);
                    handleTimerFinish();
                    playSound();
                } else if (seconds === 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(pomodoroDuration);
        setSeconds(0);
        setIsBreak(false);
        setPomodoroCount(0);
        setPomodoroTotalCount(0);
        setShortBreakCount(0);
        setLongBreakCount(0);
    };

    const handleTimerFinish = () => {
        setIsActive(false);
        if (isBreak) {
            setMinutes(pomodoroDuration);
            setIsBreak(false);
            if (isShortBreak) {
                setShortBreakCount((prevCount) => prevCount + 1);
                setIsShortBreak(false);
            } else if (isLongBreak) {
                setLongBreakCount((prevCount) => prevCount + 1);
                setIsLongBreak(false);
            }
        } else {
            setIsBreak(true);
            if (pomodoroCount + 1 === pomodorosForLongBreak) {
                setMinutes(longBreakDuration);
                setIsShortBreak(false);
                setIsLongBreak(true);
                setPomodoroCount(0);
            } else {
                setMinutes(shortBreakDuration);
                setIsShortBreak(true);
                setIsLongBreak(false);
                setPomodoroCount(pomodoroCount + 1)
            }
            setPomodoroTotalCount(pomodoroTotalCount + 1)
        }
        setSeconds(0);
    };


    const formatTime = (time: number): string => {
        return time < 10 ? `0${time}` : time.toString();
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        setMinutes(pomodoroDuration);
        setShortBreakDuration(shortBreakDuration);
        setLongBreakDuration(longBreakDuration);
        setPomodorosForLongBreak(pomodorosForLongBreak);
        closeModal();
    };

    const playSound = () => {
        const audio = new Audio('/static/sounds/soundEffect.ogg');
        audio.play();
    };

    return (
        <div className="flex flex-col items-center justify-center h-56 bg-gray-900 text-white text-xl font-bold">
            <div className="text-xl">
                {isBreak ? isLongBreak ? 'Break Largo' : 'Break Corto' : 'Pomodoro'} - {formatTime(minutes)}:{formatTime(seconds)}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex flex-col gap-2">
                    <button
                        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                        onClick={startTimer}
                    >
                        Start
                    </button>
                    <button
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                        onClick={stopTimer}
                    >
                        Stop
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                        onClick={resetTimer}
                    >
                        Reset
                    </button>
                    <button
                        className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
                        onClick={openModal}
                    >
                        Edit Durations
                    </button>
                </div>
            </div>
            <div className="mt-4">
                Pomodoros: {pomodoroTotalCount} | Short Breaks: {shortBreakCount} | Long Breaks: {longBreakCount}
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow w-auto sm:w-80 text-black">
                        <h2 className="text-xl font-bold mb-4">Edit Durations</h2>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="pomodoroDurationInput">Pomodoro Duration (minutes)</label>
                            <input
                                id="pomodoroDurationInput"
                                type="number"
                                min="1"
                                value={pomodoroDuration}
                                onChange={(e) => setPomodoroDuration(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                            <label htmlFor="shortBreakDurationInput">Short Break Duration (minutes)</label>
                            <input
                                id="shortBreakDurationInput"
                                type="number"
                                min="1"
                                value={shortBreakDuration}
                                onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                            <label htmlFor="longBreakDurationInput">Long Break Duration (minutes)</label>
                            <input
                                id="longBreakDurationInput"
                                type="number"
                                min="1"
                                value={longBreakDuration}
                                onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                            <label htmlFor="pomodorosForLongBreakInput">Pomodoros for Long Break</label>
                            <input
                                id="pomodorosForLongBreakInput"
                                type="number"
                                min="1"
                                value={pomodorosForLongBreak}
                                onChange={(e) => setPomodorosForLongBreak(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white mr-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PomodoroTimer;
