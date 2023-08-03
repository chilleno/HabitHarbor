import React, { useEffect, useState } from 'react';
import TaskList from '../../TaskList/TaskList';

interface NewRoutineStepModalProps {
    closeModal: () => void;
    setUpdateRoutineStep: (newValue:boolean) => void;
    updateRoutineStep: boolean;
}

interface Step {
    header: string;
    pomodoros: number;
    currentPomodorosCount: number;
    assignedTaskList: number;
    order: number;
}

const NewRoutineStepModal: React.FC<NewRoutineStepModalProps> = ({ closeModal, setUpdateRoutineStep, updateRoutineStep }) => {
    const [name, setName] = useState<string>('');
    const [pomodoroAmount, setPomodoroAmount] = useState<number>(0);
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [selectedTaskList, setSelectedTaskList] = useState<number>(-1);

    const createNewRoutineStep = (): void => {
        if (typeof window !== 'undefined' && validateForm()) {
            let currentRoutine: Step[] = JSON.parse(localStorage.getItem('routine') || '[]');
            let newStep: Step = {
                header: name,
                pomodoros: pomodoroAmount,
                currentPomodorosCount: 0,
                assignedTaskList: selectedTaskList,
                order: currentRoutine.length,
            }
            currentRoutine.push(newStep);
            localStorage.setItem('routine', JSON.stringify(currentRoutine))
            if (currentRoutine.length === 1) {
                localStorage.setItem('currentRoutineStep', JSON.stringify(0));
            }
            setUpdateRoutineStep(!updateRoutineStep);
            closeModal();
        }
    }

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

    useEffect(() => {
        setTaskLists(getCurrentTaskLists());
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4">New routine step</h2>
                <div className="flex flex-col gap-5">
                    <input
                        type='text'
                        placeholder='Enter step name'
                        className="text-black rounded-full py-2 placeholder:px-3 px-3"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='number'
                        min={0}
                        placeholder='Enter number of pomodoros'
                        className="text-black rounded-full py-2 placeholder:px-3 px-3"
                        onChange={(e) => setPomodoroAmount(Number(e.target.value))}
                    />
                    <select
                        value={selectedTaskList}
                        onChange={(e) => setSelectedTaskList(Number(e.target.value))}
                        className="text-black rounded-full py-2 placeholder:px-3 px-3"
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
                    <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white" onClick={createNewRoutineStep}>
                        Save
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewRoutineStepModal;
