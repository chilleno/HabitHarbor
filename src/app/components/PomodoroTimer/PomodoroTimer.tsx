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
    const [soundEffect, setSoundEffect] = useState<string>(cookies.soundEffect);
    const [pomodoroDuration, setPomodoroDuration] = useState<number>(cookies.pomodoroDuration);
    const [shortBreakDuration, setShortBreakDuration] = useState<number>(cookies.shortBreakDuration);
    const [longBreakDuration, setLongBreakDuration] = useState<number>(cookies.longBreakDuration);
    const [pomodorosForLongBreak, setPomodorosForLongBreak] = useState<number>(cookies.pomodorosForLongBreak);
    const [minutes, setMinutes] = useState<number>(pomodoroDuration);
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(cookies.isBreak);
    const [isShortBreak, setIsShortBreak] = useState<boolean>(cookies.isShortBreak);
    const [isLongBreak, setIsLongBreak] = useState<boolean>(cookies.isLongBreak);
    const [pomodoroCount, setPomodoroCount] = useState<number>(0);
    const [pomodoroTotalCount, setPomodoroTotalCount] = useState<number>(0);
    const [shortBreakCount, setShortBreakCount] = useState<number>(0);
    const [longBreakCount, setLongBreakCount] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formattedTime, setFormattedTime] = useState<string>('00:00');
    const [today] = useState<Date>(new Date());


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
        let firstRepaymentDate = new Date(cookies.firstPomodoroCountDate);
        if (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0)) {
            resetTimer(false, false);
        }
    }, []);

    useEffect(() => {
        if (cookies.acceptCookies === 'true') {
            // Save updated values to cookies
            setCookie('pomodoroDuration', pomodoroDuration);
            setCookie('shortBreakDuration', shortBreakDuration);
            setCookie('longBreakDuration', longBreakDuration);
            setCookie('pomodorosForLongBreak', pomodorosForLongBreak);
            setCookie('isBreak', isBreak);
            setCookie('isShortBreak', isShortBreak);
            setCookie('isLongBreak', isLongBreak);
            setCookie('pomodoroCount', pomodoroCount);
            setCookie('pomodoroTotalCount', pomodoroTotalCount);
            setCookie('shortBreakCount', shortBreakCount);
            setCookie('longBreakCount', longBreakCount);
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
                setMinutes(25);
            }
            if (!defaultValues) {
                setPomodoroDuration(cookies.pomodoroDuration);
                setShortBreakDuration(cookies.shortBreakDuration);
                setLongBreakDuration(cookies.longBreakDuration);
                setPomodorosForLongBreak(cookies.pomodorosForLongBreak);
                setMinutes(cookies.pomodoroDuration);
            }
            setIsActive(false);
            setSeconds(0);
            setIsBreak(false);
            setIsShortBreak(false);
            setIsLongBreak(false);
            setPomodoroCount(0);
            setPomodoroTotalCount(0);
            setShortBreakCount(0);
            setLongBreakCount(0);
            setCookie('firstPomodoroCountDate', today);
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
        setSeconds(0);
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
        }
        if (!isBreak) {
            const newPomodoroCount: number = pomodoroCount + 1;
            if (newPomodoroCount.toString() === pomodorosForLongBreak.toString()) {
                setMinutes(longBreakDuration);
                setIsShortBreak(false);
                setIsLongBreak(true);
                setIsBreak(true);
                setPomodoroCount(0);
                setPomodoroTotalCount(pomodoroTotalCount + 1);
            }
            if (newPomodoroCount.toString() !== pomodorosForLongBreak.toString()) {
                setMinutes(shortBreakDuration);
                setIsShortBreak(true);
                setIsLongBreak(false);
                setIsBreak(true);
                setPomodoroCount(newPomodoroCount);
                setPomodoroTotalCount(pomodoroTotalCount + 1);
            }
        }

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
        if (value >= 2) {
            setPomodorosForLongBreak(value);
        }
    }

    const handlePomodoroDurationChange = (value: number): void => {
        if (value >= 1) {
            setPomodoroDuration(value);
        }
    }

    const handleShortBreakDurationChange = (value: number): void => {
        if (value >= 1) {
            setShortBreakDuration(value);
        }
    }

    const handleLongBreakDurationChange = (value: number): void => {
        if (value >= 1) {
            setLongBreakDuration(value);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center lg:h-64 text-white font-bold lg:p-5 sm:p-1">
            <div className="flex items-center w-full">
                <div className="flex flex-col xl:w-2/3 lg:w-2/3 sm:w-1/2 items-center">
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
                <div className="xl:w-1/3 lg:w-1/3 sm:w-1/2">
                    <div className='flex xl:flex-col lg:flex-col sm:flex-row gap-3'>
                        <span className="flex items-center justify-center hover:cursor-pointer">
                            <PlayIcon onClick={startTimer} className="h-5 w-5 text-white-500" />
                        </span>
                        <span className="flex items-center justify-center">
                            <StopIcon
                                onClick={stopTimer}
                                className="h-5 w-5 text-white-500  hover:cursor-pointer" />
                        </span>
                        <span className="flex items-center justify-center">
                            <ForwardIcon
                                onClick={nextTimer}
                                className="h-5 w-5 text-white-500 hover:cursor-pointer" />
                        </span>
                        <span className="flex items-center justify-center">
                            <CogIcon
                                onClick={openModal}
                                className="h-5 w-5 text-white-500 hover:cursor-pointer" />
                        </span>
                    </div>

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
                                onChange={(e) => handlePomodoroDurationChange(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                                onFocus={(event) => event.target.select()}
                            />
                            <label htmlFor="shortBreakDurationInput">Short Break Duration (minutes)</label>
                            <input
                                id="shortBreakDurationInput"
                                type="number"
                                min="1"
                                value={shortBreakDuration}
                                onChange={(e) => handleShortBreakDurationChange(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                                onFocus={(event) => event.target.select()}
                            />
                            <label htmlFor="longBreakDurationInput">Long Break Duration (minutes)</label>
                            <input
                                id="longBreakDurationInput"
                                type="number"
                                min="1"
                                value={longBreakDuration}
                                onChange={(e) => handleLongBreakDurationChange(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                                onFocus={(event) => event.target.select()}
                            />
                            <label htmlFor="pomodorosForLongBreakInput">Pomodoros for Long Break</label>
                            <input
                                id="pomodorosForLongBreakInput"
                                type="number"
                                min="2"
                                value={pomodorosForLongBreak}
                                onChange={(e) => handlePomodorosForLongBreakChange(Number(e.target.value))}
                                className="border border-gray-300 px-2 py-1 rounded-full text-black"
                                onFocus={(event) => event.target.select()}
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
