"use client"

import React, { useState, useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { StopIcon } from '@heroicons/react/24/solid';
import { CogIcon } from '@heroicons/react/24/solid';

import { useCookies } from 'react-cookie';
import { ForwardIcon } from '@heroicons/react/24/solid';

const PomodoroTimer = () => {
    const [cookies, setCookie] = useCookies([
        'acceptCookies',
        'pomodoroDuration',
        'shortBreakDuration',
        'longBreakDuration',
        'pomodorosForLongBreak',
        'isBreak',
        'isShortBreak',
        'isLongBreak',
        'pomodoroCount',
        'pomodoroTotalCount',
        'shortBreakCount',
        'longBreakCount',
        'firstPomodoroCountDate',
        'soundEffect',
    ]);
    const [soundEffect, setSoundEffect] = useState(cookies.soundEffect);
    const [pomodoroDuration, setPomodoroDuration] = useState(cookies.pomodoroDuration);
    const [shortBreakDuration, setShortBreakDuration] = useState(cookies.shortBreakDuration);
    const [longBreakDuration, setLongBreakDuration] = useState(cookies.longBreakDuration);
    const [pomodorosForLongBreak, setPomodorosForLongBreak] = useState(cookies.pomodorosForLongBreak);
    const [minutes, setMinutes] = useState(pomodoroDuration);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(cookies.isBreak);
    const [isShortBreak, setIsShortBreak] = useState(cookies.isShortBreak);
    const [isLongBreak, setIsLongBreak] = useState(cookies.isLongBreak);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [pomodoroTotalCount, setPomodoroTotalCount] = useState(0);
    const [shortBreakCount, setShortBreakCount] = useState(0);
    const [longBreakCount, setLongBreakCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formattedTime, setFormattedTime] = useState('00:00');
    const [today] = useState(new Date());


    useEffect(() => {
        setFormattedTime(formatTime(minutes) + ':' + formatTime(seconds));
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(interval);
                    handleTimerFinish();
                    if (soundEffect === 'wow')
                        playSoundWow();
                    if (soundEffect === 'oot')
                        playSoundOOT();
                } else if (seconds === 0) {
                    setMinutes((prevMinutes: number) => prevMinutes - 1);
                    setSeconds(59);
                    setFormattedTime(formatTime(minutes) + ':' + formatTime(seconds));
                } else {
                    setSeconds((prevSeconds: number) => prevSeconds - 1);
                    setFormattedTime(formatTime(minutes) + ':' + formatTime(seconds));
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    const initializeFromCookies = (): void => {
        const savedPomodoroDuration = cookies.pomodoroDuration;
        const savedShortBreakDuration = cookies.shortBreakDuration;
        const savedLongBreakDuration = cookies.longBreakDuration;
        const savedPomodorosForLongBreak = cookies.pomodorosForLongBreak;
        const savedIsBreak = cookies.isBreak;
        const savedIsShortBreak = cookies.isShortBreak;
        const savedIsLongBreak = cookies.isLongBreak;
        const savedPomodoroCount = cookies.pomodoroCount;
        const savedPomodoroTotalCount = cookies.pomodoroTotalCount;
        const savedShortBreakCount = cookies.shortBreakCount;
        const savedLongBreakCount = cookies.longBreakCount;
        const savedSoundEffect = cookies.soundEffect;

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
        if (savedIsBreak !== null) {
            setIsBreak(savedIsBreak);
        }
        if (savedIsShortBreak !== null) {
            setIsShortBreak(savedIsShortBreak);
        }
        if (savedIsLongBreak !== null) {
            setIsLongBreak(savedIsLongBreak);
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
        if (savedSoundEffect) {
            setSoundEffect(String(savedSoundEffect));
        }
    };

    useEffect(() => {
        initializeFromCookies();
    }, []);

    useEffect(() => {
        if (cookies.acceptCookies === 'true') {
            // Save updated values to cookies
            let firstRepaymentDate = new Date(cookies.firstPomodoroCountDate);
            if (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0)) {
                resetTimer(false, false);
            }
            setCookie('pomodoroDuration', pomodoroDuration.toString());
            setCookie('shortBreakDuration', shortBreakDuration.toString());
            setCookie('longBreakDuration', longBreakDuration.toString());
            setCookie('pomodorosForLongBreak', pomodorosForLongBreak.toString());
            setCookie('isBreak', isBreak);
            setCookie('isShortBreak', isShortBreak);
            setCookie('isLongBreak', isLongBreak);
            setCookie('pomodoroCount', pomodoroCount.toString());
            setCookie('pomodoroTotalCount', pomodoroTotalCount.toString());
            setCookie('shortBreakCount', shortBreakCount.toString());
            setCookie('longBreakCount', longBreakCount.toString());
            setCookie('soundEffect', soundEffect);
            if (pomodoroCount === 1) {
                setCookie('firstPomodoroCountDate', today);
            }

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
        soundEffect
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

    const startTimer = (): void => {
        setIsActive(true);
    };

    const stopTimer = (): void => {
        setIsActive(false);
    };

    const nextTimer = (): void => {
        if (window.confirm('Are you sure you want to skip this timer?')) {
            handleTimerFinish();
        }
    };

    function resetTimer(showConfirm: boolean = true, defaultValues: boolean = false): void {
        if (showConfirm == false || window.confirm('Are you sure you want to reset all the data?')) {
            if (defaultValues) {
                setPomodoroDuration(25);
                setShortBreakDuration(5);
                setLongBreakDuration(15);
                setPomodorosForLongBreak(4);
                setSoundEffect('wow');
                setIsActive(false);
                setSeconds(0);
                setIsBreak(false);
                setMinutes(25);
                setIsShortBreak(false);
                setIsLongBreak(false);
                setPomodoroCount(0);
                setPomodoroTotalCount(0);
                setShortBreakCount(0);
                setLongBreakCount(0);
            }
            if (!defaultValues) {
                setPomodoroCount(0);
                setPomodoroTotalCount(0);
                setShortBreakCount(0);
                setLongBreakCount(0);
                setIsActive(false);
                setSeconds(0);
                setIsBreak(false);
                setIsShortBreak(false);
                setIsLongBreak(false);
                setMinutes(pomodoroDuration);
                setShortBreakDuration(shortBreakDuration);
                setLongBreakDuration(longBreakDuration);
                setPomodorosForLongBreak(pomodorosForLongBreak);
            }
        }
    };

    const handleSave = (): void => {
        if (window.confirm('this action will reset the current data, you want to continue?')) {
            resetTimer(false, false);
            closeModal();
        }
    }

    const handleTimerFinish = (): void => {
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
        if (cookies.acceptCookies) {
            return time < 10 ? `0${time}` : time.toString();
        } else {
            return '00';
        }

    };

    const openModal = (): void => {
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const playSoundWow = (): void => {
        const audio = new Audio('/static/sounds/soundEffect.ogg');
        audio.play();
    };

    const playSoundOOT = (): void => {
        const audio = new Audio('/static/sounds/OOT_soundEffect.wav');
        audio.play();
    };

    const handlePomodorosForLongBreakChange = (value: number): void => {
        if(value >= 2){
            setPomodorosForLongBreak(value);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center lg:h-64 text-white font-bold lg:p-5 sm:p-1">
            <div className="flex items-center">
                <div className="flex flex-col lg:w-2/3 sm:w-1/2 items-center">
                    <div className="lg:text-xl sm:text-md xl:text-3xl">
                        {'[ ' + (isBreak == true ? (isLongBreak == true ? 'Long break' : isShortBreak == true ? 'Short break' : null) : 'Pomodoro') + ' ]'}
                    </div>
                    <div className="lg:text-6xl lg:mt-6 sm:text-4xl xl:text-8xl">
                        {formattedTime}
                    </div>
                    <div className="lg:text-xs sm:text-[10px] lg:mt-6 xl:text-lg">
                        <div className="w-full flex justify-center items-center">
                            Pomodoros: {pomodoroTotalCount}
                        </div>
                        <div className="w-full flex justify-center">
                            Short Breaks: {shortBreakCount} |  Long Breaks: {longBreakCount}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap lg:w-1/3  sm:w-1/2 lg:gap-2 sm:gap-1 justify-center">
                    <button
                        className="lg:w-2/3 sm:w-1/6 bg-green-500 hover:bg-green-600 lg:px-2 xl:py-2 lg:py-1 sm:p-1 text-white rounded-full flex justify-center items-center"
                        onClick={startTimer}
                    >
                        <span className="flex items-center justify-center">
                            <PlayIcon className="h-5 w-5 text-white-500" />
                        </span>
                    </button>
                    <button
                        className="lg:w-2/3 sm:w-1/6 bg-red-500 hover:bg-red-600 lg:px-4 xl:py-2 lg:py-1 sm:p-3 text-white rounded-full flex justify-center items-center"
                        onClick={stopTimer}
                    >
                        <span className="flex items-center justify-center">
                            <StopIcon className="h-5 w-5 text-white-500" />
                        </span>
                    </button>
                    <button
                        className="lg:w-2/3 sm:w-1/6 bg-blue-500 hover:bg-blue-600 lg:px-4 xl:py-2 lg:py-1 sm:p-3 text-white rounded-full flex justify-center items-center"
                        onClick={nextTimer}
                    >
                        <span className="flex items-center justify-center">
                            <ForwardIcon className="h-5 w-5 text-white-500" />
                        </span>
                    </button>
                    <button
                        className="lg:w-2/3 sm:w-1/6 bg-purple-500 hover:bg-purple-600 px-4 xl:py-2 lg:py-1 rounded-full text-white flex justify-center items-center"
                        onClick={openModal}
                    >
                        <span className="flex items-center justify-center">
                            <CogIcon className="h-5 w-5 text-white-500" />
                        </span>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                        <h2 className="text-xl font-bold mb-4">Edit Durations</h2>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="pomodoroDurationInput">Pomodoro Duration (minutes)</label>
                            <input
                                id="pomodoroDurationInput"
                                type="number"
                                min="1"
                                value={pomodoroDuration}
                                onChange={(e) => setPomodoroDuration(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                            />
                            <label htmlFor="shortBreakDurationInput">Short Break Duration (minutes)</label>
                            <input
                                id="shortBreakDurationInput"
                                type="number"
                                min="1"
                                value={shortBreakDuration}
                                onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                            />
                            <label htmlFor="longBreakDurationInput">Long Break Duration (minutes)</label>
                            <input
                                id="longBreakDurationInput"
                                type="number"
                                min="1"
                                value={longBreakDuration}
                                onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                            />
                            <label htmlFor="pomodorosForLongBreakInput">Pomodoros for Long Break</label>
                            <input
                                id="pomodorosForLongBreakInput"
                                type="number"
                                min="2"
                                value={pomodorosForLongBreak}
                                onChange={(e) => handlePomodorosForLongBreakChange(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                            />
                            <label htmlFor="pomodorosForLongBreakInput">Sound Effect</label>
                            <select
                                id="soundEffectSelect"
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                                value={soundEffect}
                                onChange={(e) => setSoundEffect(e.target.value)}
                            >
                                <option value={'wow'}>World of Warcraft</option>
                                <option value={'oot'}>Zelda: Ocarina of Time</option>
                            </select>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex w-1/2 justify-start">
                                <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full text-white" onClick={() => (resetTimer(true, true), closeModal())}>
                                    Reset
                                </button>
                            </div>
                            <div className="flex w-1/2 justify-end gap-2">
                                <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white" onClick={() => handleSave()}>
                                    save
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-full text-white" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PomodoroTimer;
