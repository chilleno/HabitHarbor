import React, { useEffect, useState } from 'react';

const EditRoutineStepModal: React.FC<EditRoutineStepModalProps> = ({ stepIndex, closeModal, setUpdateRoutineStep, updateRoutineStep }) => {
    const [name, setName] = useState<string>('');
    const [pomodoroAmount, setPomodoroAmount] = useState<number>(0);
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [selectedTaskList, setSelectedTaskList] = useState<number>(-1);

    const validateForm = (): boolean => {
        if (name === '') {
            window.alert('Please enter a name for the step');
            return false;
        }
        if (pomodoroAmount === 0) {
            window.alert('Please enter a number of pomodoros');
            return false;
        }
        return true;
    }

    const getCurrentTaskLists = (): TaskList[] => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('taskLists') || '[]');
        }
        return [];
    }

    //function that save the new routine step values in local storage
    const saveRoutineStep = (): void => {
        if (validateForm()) {
            if (typeof window !== 'undefined') {
                const currentRoutine = JSON.parse(localStorage.getItem('routine') || '{}');
                currentRoutine[stepIndex].header = name;
                currentRoutine[stepIndex].pomodoros = pomodoroAmount;
                currentRoutine[stepIndex].assignedTaskList = selectedTaskList;
                localStorage.setItem('routine', JSON.stringify(currentRoutine));
                setUpdateRoutineStep(!updateRoutineStep);
                closeModalWindow();
            }
        }
    }

    useEffect(() => {
        setTaskLists(getCurrentTaskLists());
        initializeStates();
    }, []);

    const initializeStates = (): void => {
        if (typeof window !== 'undefined') {
            const currentRoutine = JSON.parse(localStorage.getItem('routine') || '{}');
            setName(currentRoutine[stepIndex].header);
            setPomodoroAmount(currentRoutine[stepIndex].pomodoros);
            setSelectedTaskList(currentRoutine[stepIndex].assignedTaskList);
        }
    }

    //function that close modal
    const closeModalWindow = (): void => {
        closeModal();
    }

    if (stepIndex === null) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-main-primary bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-main-primary p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4">Update routine step</h2>
                <div className="flex flex-col gap-5 text-main-primary">
                    <input
                        type='text'
                        placeholder='Enter step name'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='number'
                        min={0}
                        placeholder='Enter number of pomodoros'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={pomodoroAmount}
                        onChange={(e) => setPomodoroAmount(Number(e.target.value))}
                    />
                    <select
                        value={selectedTaskList}
                        onChange={(e) => setSelectedTaskList(Number(e.target.value))}
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                    >
                        <option disabled value={-1}>select an option</option>
                        {
                            taskLists.map((taskList, index) => {
                                return (
                                    <option key={index} value={index}>{taskList.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="flex justify-end mt-4 gap-3">
                    <button className="border-2 border-white hover:text-main-primary hover:bg-white px-4 py-2 rounded-full text-white" onClick={() => saveRoutineStep()}>
                        Save
                    </button>
                    <button className="border-2 border-white hover:text-main-primary hover:bg-white px-4 py-2 rounded-full text-white" onClick={closeModalWindow}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRoutineStepModal;
