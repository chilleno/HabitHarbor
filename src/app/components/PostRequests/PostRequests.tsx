export const savePomodoro = async (session:any): Promise<Boolean> => {
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
        const response = await fetch('/api/pomodoro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pomodoro: pomodoroData,
            })
        })
        if (response.status === 200) {
            return true;
        }
    }
    return false;
}

export const saveHabits = async (session:any): Promise<Boolean> => {
    if (session?.user?.profile_id === '966536f3-a528-4754-a474-2b7be0cff440') {
        const response = await fetch('/api/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habits: JSON.parse(localStorage.getItem('dailyHabits') || '[]'),
            })
        })
        if (response.status === 200) {
            return true;
        }
    }
    return false;
}

export const saveTasks = async (session:any): Promise<Boolean> => {
    if (session?.user?.profile_id === '966536f3-a528-4754-a474-2b7be0cff440') {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskLists: JSON.parse(localStorage.getItem('taskLists') || '[]'),
            })
        })
        if (response.status === 200) {
            return true;
        }
    }
    return false;
}