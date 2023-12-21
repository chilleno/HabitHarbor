"use client";
import React, { ReactNode, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, getSession, signIn } from "next-auth/react"


interface EventProviderProps {
    children: ReactNode;
}

const EventProvider = (props: EventProviderProps) => {
    const [saveCooldown, setSaveCooldown] = React.useState<number>(-1);
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [firstRender, setFirstRender] = React.useState<boolean>(true);
    const { data: session, status } = useSession()

    const startCountdown = () => {
        setIsActive(true);
        setSaveCooldown(1);
    }

    const saveData = async () => {
        if (session?.user?.profile_id === '966536f3-a528-4754-a474-2b7be0cff440') {
            const pomodoroData = {
                'isShortBreak': localStorage.getItem('isShortBreak'),
                'pomodoroTotalCount': localStorage.getItem('pomodoroTotalCount'),
                'autoStart': localStorage.getItem('autoStart'),
                'longBreakDuration': localStorage.getItem('longBreakDuration'),
                'pomodoroDuration': localStorage.getItem('pomodoroDuration'),
                'shortBreakDuration': localStorage.getItem('shortBreakDuration'),
                'firstPomodoroCountDate': localStorage.getItem('firstPomodoroCountDate'),
                'shortBreakCount': localStorage.getItem('shortBreakCount'),
                'isBreak': localStorage.getItem('isBreak'),
                'pomodorosForLongBreak': localStorage.getItem('pomodorosForLongBreak'),
                'pomodoroCount': localStorage.getItem('pomodoroCount'),
                'isLongBreak': localStorage.getItem('isLongBreak'),
                'longBreakCount': localStorage.getItem('longBreakCount'),
            }

            // request to /sync endpoint with jwt token
            const response = await fetch('/api/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pomodoro: pomodoroData,
                    taskLists: JSON.parse(localStorage.getItem('taskLists') || '[]'),
                    habits: JSON.parse(localStorage.getItem('dailyHabits') || '[]'),
                })
            })
            if (response.status === 200) {
                toast("data saved!");
            }
        }
    }

    const loadData = async () => {
        if (session?.user?.profile_id === '966536f3-a528-4754-a474-2b7be0cff440') {
            // request to /sync endpoint with jwt token
            const response = await fetch('/api/load', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                const {habits, pomodoro, taskLists} = await response.json();
               
                if(habits !== undefined && habits !== null && habits.length > 0){
                    localStorage.setItem('dailyHabits', JSON.stringify(habits));
                }
                if(pomodoro !== undefined && pomodoro !== null){
                    localStorage.setItem('isShortBreak', pomodoro.isShortBreak);
                    localStorage.setItem('pomodoroTotalCount', pomodoro.pomodoroTotalCount);
                    localStorage.setItem('autoStart', pomodoro.autoStart);
                    localStorage.setItem('longBreakDuration', pomodoro.longBreakDuration);
                    localStorage.setItem('pomodoroDuration', pomodoro.pomodoroDuration);
                    localStorage.setItem('shortBreakDuration', pomodoro.shortBreakDuration);
                    localStorage.setItem('firstPomodoroCountDate', pomodoro.firstPomodoroCountDate);
                    localStorage.setItem('shortBreakCount', pomodoro.shortBreakCount);
                    localStorage.setItem('isBreak', pomodoro.isBreak);
                    localStorage.setItem('pomodorosForLongBreak', pomodoro.pomodorosForLongBreak);
                    localStorage.setItem('pomodoroCount', pomodoro.pomodoroCount);
                    localStorage.setItem('isLongBreak', pomodoro.isLongBreak);
                    localStorage.setItem('longBreakCount', pomodoro.longBreakCount);
                }
                if(taskLists !== undefined && taskLists !== null && taskLists.length > 0){
                    localStorage.setItem('taskLists', JSON.stringify(taskLists));
                }
                setFirstRender(false);
                toast("data Loaded!");
            }
        }else{
            setFirstRender(false);
        }
    }

    useEffect(() => {
        document.addEventListener('pomodorodatachanged', startCountdown);
        document.addEventListener('routinedatachanged', startCountdown);
        document.addEventListener('taskListdatachanged', startCountdown);
        document.addEventListener('tasksdatachanged', startCountdown);
        document.addEventListener('habitsdatachanged', startCountdown);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive === true && saveCooldown >= 0) {
            interval = setInterval(() => {
                console.log("saveCooldown", saveCooldown);
                if (saveCooldown === 0) {
                    if (firstRender === true) {
                        loadData();
                    } else {
                        saveData();
                    }
                    clearInterval(interval);
                    setIsActive(false);
                    setSaveCooldown(-1);
                } else {
                    setSaveCooldown(saveCooldown - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);

    }, [isActive, saveCooldown]);

    return <>
        {
            firstRender === true &&
            <div className="absolute align-middle items-center justify-center w-full h-full bg-black bg-opacity-75 z-50">
                <div className="flex align-middle justify-center items-center content-center space-x-1 text-sm text-gray-700">
                    <div>Loading ...</div>
                </div>
            </div>
        }

        {props.children}
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="dark"
        />
    </>;
}

export default EventProvider;