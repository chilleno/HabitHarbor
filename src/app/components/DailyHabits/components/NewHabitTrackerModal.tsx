import React, { useState } from 'react';
import EmojiPicker, { EmojiStyle, Emoji } from 'emoji-picker-react';
import { TwitterPicker } from 'react-color';
import { saveHabits } from '../../PostRequests/PostRequests';
import { useSession } from "next-auth/react"

const NewHabitTrackerModal: React.FC<NewHabitTrackerModalProps> = ({ closeModal, updateHabits }) => {
    const [icon, setIcon] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [maxValue, setMaxValue] = useState<number>(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const { data: session } = useSession()
    let colors = ['#CE769C', '#7975D1', '#68A0CA', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

    const addHabitTracker = () => {
        if (validateForm()) {
            const newHabitTracker: HabitTracker = {
                icon: icon,
                name: name,
                color: color,
                maxValue: maxValue,
                currentValue: 0,
                firstTrackerDate: new Date().toString(),
            };

            const dailyHabits: HabitTracker[] = JSON.parse(localStorage.getItem('dailyHabits') || '[]');

            dailyHabits.push(newHabitTracker);

            localStorage.setItem('dailyHabits', JSON.stringify(dailyHabits));

            //save in database
            saveHabits(session);

            closeModal();
        }
    }

    const validateForm = (): boolean => {
        if (name === '') {
            window.alert('Please enter a name for the tracker');
            return false;
        }
        if (icon === '') {
            window.alert('Please select an icon for the tracker');
            return false;
        }
        if (color === '') {
            window.alert('Please select a color for the tracker');
            return false;
        }
        if (maxValue === 0) {
            window.alert('Please enter a max value for the tracker');
            return false;
        }
        return true;
    }

    const handleSetEmoji = (emoji: string) => {
        setIcon(emoji);
        setShowEmojiPicker(false);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-[999999]">
            <div className="bg-main-primary p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4">New habit tracker</h2>
                <div className="flex flex-col gap-2 text-main-primary">
                    <h3 className="text-lg font-bold px-1 text-white">Name: </h3>
                    <input
                        type='text'
                        placeholder='Enter tracker name'
                        className="text-primary-main rounded-full py-2 placeholder:px-3 px-3"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <h3 className="text-lg font-bold px-1 text-white">Icon: </h3>
                    <div className="flex flex-row gap-10 content-center justify-start">
                        <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="border-white border-2 text-white hover:text-main-primary hover:bg-white rounded-full px-5"
                        >
                            Edit Icon
                        </button>
                        <Emoji unified={icon} size={25} />
                    </div>
                    {
                        showEmojiPicker === true &&
                        <div className="absolute z-50">
                            <EmojiPicker
                                emojiStyle={EmojiStyle.APPLE}
                                onEmojiClick={(e) => handleSetEmoji(e.unified)}
                                lazyLoadEmojis={false}
                                searchDisabled={true}
                                skinTonesDisabled={true}
                                autoFocusSearch={false}
                                width={280}
                            />
                        </div>
                    }
                    <h3 className="text-lg font-bold px-1 text-white">Color: </h3>
                    <TwitterPicker
                        color={color}
                        onChange={(e) => setColor(e.hex)}
                        colors={colors}
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
