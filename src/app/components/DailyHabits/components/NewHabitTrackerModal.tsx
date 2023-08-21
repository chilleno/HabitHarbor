import React, { useState } from 'react';

const NewHabitTrackerModal: React.FC<NewHabitTrackerModalProps> = ({ closeModal, updateHabits }) => {
    const [icon, setIcon] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [maxValue, setMaxValue] = useState<number>(0);

    const addHabitTracker = () => {
        if (validateForm()) {
            const newHabitTracker: HabitTracker = {
                icon: icon,
                name: name,
                unit: unit,
                color: color,
                maxValue: maxValue,
                currentValue: 0,
                firstTrackerDate: new Date().toString(),
            };

            const dailyHabits: HabitTracker[] = JSON.parse(localStorage.getItem('dailyHabits') || '[]');

            dailyHabits.push(newHabitTracker);

            localStorage.setItem('dailyHabits', JSON.stringify(dailyHabits));
            closeModal();
        }
    }

    const validateForm = (): boolean => {
        if (name === '') {
            window.alert('Please enter a name for the step');
            return false;
        }
        return true;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-main-primary bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-main-primary p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4">New routine step</h2>
                <div className="flex flex-col gap-1 text-main-primary">
                    <h3 className="text-lg font-bold px-1 text-white">Name: </h3>
                    <input
                        type='text'
                        placeholder='Enter tracker name'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <h3 className="text-lg font-bold px-1 text-white">Unit Name: </h3>
                    <input
                        type='text'
                        placeholder='Enter unit name'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={unit} onChange={(e) => setUnit(e.target.value)}
                    />
                    <h3 className="text-lg font-bold px-1 text-white">Icon: </h3>
                    <input
                        type='text'
                        placeholder='Enter icon'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={icon} onChange={(e) => setIcon(e.target.value)}
                    />
                    <h3 className="text-lg font-bold px-1 text-white">Color: </h3>
                    <input
                        type='text'
                        placeholder='Enter color'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={color} onChange={(e) => setColor(e.target.value)}
                    />
                    <h3 className="text-lg font-bold px-1 text-white">Objective amount: </h3>
                    <input
                        type='number'
                        min={0}
                        placeholder='Enter unit amout to track'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        onChange={(e) => setMaxValue(Number(e.target.value))}
                    />
                </div>
                <div className="flex justify-end mt-4 gap-3">
                    <button className="border-2 border-white hover:text-main-primary hover:bg-white px-4 py-2 rounded-full text-white" onClick={addHabitTracker}>
                        Save
                    </button>
                    <button className="border-2 border-white hover:text-main-primary hover:bg-white px-4 py-2 rounded-full text-white" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewHabitTrackerModal;
