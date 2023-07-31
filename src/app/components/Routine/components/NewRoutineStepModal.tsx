import React, { useState } from 'react';

interface NewRoutineStepModalProps {
    closeModal: () => void;
    renderList: () => void;
}

interface Step {
    header: string;
    pomodoros: number;
    currentPomodorosCount: number;
    order: number;
}

const NewRoutineStepModal: React.FC<NewRoutineStepModalProps> = ({ closeModal, renderList }) => {
    const [name, setName] = useState<string>('');
    const [pomodoroAmount, setPomodoroAmount] = useState<number>(1);

    const createNewRoutineStep = (): void => {
        if (typeof window !== 'undefined') {
            let currentRoutine = JSON.parse(localStorage.getItem('routine') || '[]');
            let newStep: Step = {
                header: name,
                pomodoros: pomodoroAmount,
                currentPomodorosCount: 0,
                order: currentRoutine.length,
            }
            currentRoutine.push(newStep);
            localStorage.setItem('routine', JSON.stringify(currentRoutine))
            renderList();
            closeModal();
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4">New Task List</h2>
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
                        value={pomodoroAmount} onChange={(e) => setPomodoroAmount(Number(e.target.value))}
                    />
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
