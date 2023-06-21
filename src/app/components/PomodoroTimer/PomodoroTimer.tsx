"use client"

import React, { useState, useEffect } from 'react';

;
interface TimerConfig {
    pomodoroDuration?: number;
    shortBreakDuration?: number;
    longBreakDuration?: number;
    pomodorosForLongBreak?: number;
}

const PomodoroTimer: React.FC<TimerConfig> = ({
 
}) => {
    const cookieCutter = require('cookie-cutter');
    const [pomodoroDuration, setPomodoroDuration] = useState(cookieCutter.get('pomodoroDuration') > 0 ? cookieCutter.get('pomodoroDuration') : 25);
    const [shortBreakDuration, setShortBreakDuration] = useState(cookieCutter.get('shortBreakDuration') > 0 ? cookieCutter.get('shortBreakDuration') : 5);
    const [longBreakDuration, setLongBreakDuration] = useState(cookieCutter.get('longBreakDuration') > 0 ? cookieCutter.get('longBreakDuration') : 15);
    const [pomodorosForLongBreak, setPomodorosForLongBreak] = useState(cookieCutter.get('pomodorosForLongBreak') > 0 ? cookieCutter.get('pomodorosForLongBreak') : 4);
    const [minutes, setMinutes] = useState(pomodoroDuration);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [isShortBreak, setIsShortBreak] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [pomodoroTotalCount, setPomodoroTotalCount] = useState(0);
    const [shortBreakCount, setShortBreakCount] = useState(0);
    const [longBreakCount, setLongBreakCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(interval);
                    handleTimerFinish();
                    playSound();
                } else if (seconds === 0) {
                    setMinutes((prevMinutes: number) => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds((prevSeconds: number) => prevSeconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    const initializeFromCookies = () => {
        const savedPomodoroDuration = cookieCutter.get('pomodoroDuration');
        const savedShortBreakDuration = cookieCutter.get('shortBreakDuration');
        const savedLongBreakDuration = cookieCutter.get('longBreakDuration');
        const savedPomodorosForLongBreak = cookieCutter.get('pomodorosForLongBreak');
        const savedIsBreak = cookieCutter.get('isBreak');
        const savedIsShortBreak = cookieCutter.get('isShortBreak');
        const savedIsLongBreak = cookieCutter.get('isLongBreak');
        const savedPomodoroCount = cookieCutter.get('pomodoroCount');
        const savedPomodoroTotalCount = cookieCutter.get('pomodoroTotalCount');
        const savedShortBreakCount = cookieCutter.get('shortBreakCount');
        const savedLongBreakCount = cookieCutter.get('longBreakCount');

        if (savedPomodoroDuration) {
            setPomodoroDuration(Number(savedPomodoroDuration));
        }
        if (savedShortBreakDuration) {
            setShortBreakDuration(Number(savedShortBreakDuration));
        }
        if (savedLongBreakDuration) {
            setLongBreakDuration(Number(savedLongBreakDuration));
        }
        if (savedPomodorosForLongBreak) {
            setPomodorosForLongBreak(Number(savedPomodorosForLongBreak));
        }
        if (savedIsBreak) {
            setIsBreak(savedIsBreak === 'true');
        }
        if (savedIsShortBreak) {
            setIsShortBreak(savedIsShortBreak === 'true');
        }
        if (savedIsLongBreak) {
            setIsLongBreak(savedIsLongBreak === 'true');
        }
        if (savedPomodoroCount) {
            setPomodoroCount(Number(savedPomodoroCount));
        }
        if (savedPomodoroTotalCount) {
            setPomodoroTotalCount(Number(savedPomodoroTotalCount));
        }
        if (savedShortBreakCount) {
            setShortBreakCount(Number(savedShortBreakCount));
        }
        if (savedLongBreakCount) {
            setLongBreakCount(Number(savedLongBreakCount));
        }
    };

    useEffect(() => {
        initializeFromCookies();
    }, []);

    useEffect(() => {
        if (cookieCutter.get('acceptCookies') === 'true') {
            // Save updated values to cookies
            cookieCutter.set('pomodoroDuration', pomodoroDuration.toString());
            cookieCutter.set('shortBreakDuration', shortBreakDuration.toString());
            cookieCutter.set('longBreakDuration', longBreakDuration.toString());
            cookieCutter.set('pomodorosForLongBreak', pomodorosForLongBreak.toString());
            cookieCutter.set('isBreak', isBreak.toString());
            cookieCutter.set('isShortBreak', isShortBreak.toString());
            cookieCutter.set('isLongBreak', isLongBreak.toString());
            cookieCutter.set('pomodoroCount', pomodoroCount.toString());
            cookieCutter.set('pomodoroTotalCount', pomodoroTotalCount.toString());
            cookieCutter.set('shortBreakCount', shortBreakCount.toString());
            cookieCutter.set('longBreakCount', longBreakCount.toString());
        }
    }, [
        pomodoroDuration,
        shortBreakDuration,
        longBreakDuration,
        pomodorosForLongBreak,
        isBreak,
        isShortBreak,
        isLongBreak,
        pomodoroCount,
        pomodoroTotalCount,
        shortBreakCount,
        longBreakCount,
    ]);

    useEffect(() => {
        if (isActive) {
            // Handle page reload or navigation
            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                event.preventDefault();
                event.returnValue = '';
            };

            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [isActive]);

    const confirmPageReload = () => {
        const confirmMessage = 'Are you sure you want to leave? Your current progress will be lost.';
        if (!isActive && (minutes !== pomodoroDuration || seconds !== 0)) {
            if (!window.confirm(confirmMessage)) {
                return;
            }
        }
        resetTimer();
    };

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
                setPomodoroCount(pomodoroCount + 1);
            }
            setPomodoroTotalCount(pomodoroTotalCount + 1);
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
                {isBreak ? (isLongBreak ? 'Break Largo' : 'Break Corto') : 'Pomodoro'} - {formatTime(minutes)}:
                {formatTime(seconds)}
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
                            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white" onClick={closeModal}>
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
