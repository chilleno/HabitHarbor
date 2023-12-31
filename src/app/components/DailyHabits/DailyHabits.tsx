"use client"
import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import NewHabitTrackerModal from './components/NewHabitTrackerModal';
import Tracker from './components/Tracker';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { saveHabits } from '../PostRequests/PostRequests';
import { useSession } from "next-auth/react"

const DailyHabits = () => {
    const [updateRender, setUpdateRender] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [dailyHabits, setDailyHabits] = useState<HabitTracker[]>([]);
    const { data: session } = useSession()

    const handleUpdateRender = () => {
        setUpdateRender(!updateRender);
    }

    const handleCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    }

    useEffect(() => {
        setDailyHabits([]);
        setInterval(() => {
            const dailyHabits: HabitTracker[] = JSON.parse(localStorage.getItem('dailyHabits') || '[]');
            setDailyHabits(dailyHabits);
        }, 100);
    }, [updateRender]);

    useEffect(() => {
        const dailyHabits: HabitTracker[] = JSON.parse(localStorage.getItem('dailyHabits') || '[]');
        setDailyHabits(dailyHabits);
    }, []);

    //function that create 3 examples of trackers
    const createExamples = () => {
        const dailyHabits: HabitTracker[] = JSON.parse(localStorage.getItem('dailyHabits') || '[]');
        const example1: HabitTracker = {
            icon: '1f4a7',
            name: 'drink water',
            color: '#68A0CA',
            maxValue: 3,
            currentValue: 0,
            firstTrackerDate: new Date().toString(),
        };
        const example2: HabitTracker = {
            icon: '1f9d8',
            name: 'meditate',
            color: '#7975D1',
            maxValue: 1,
            currentValue: 0,
            firstTrackerDate: new Date().toString(),
        };
        const example3: HabitTracker = {
            icon: '1f4d6',
            name: 'Reading',
            color: '#CE769C',
            maxValue: 1,
            currentValue: 0,
            firstTrackerDate: new Date().toString(),
        };
        dailyHabits.push(example1);
        dailyHabits.push(example2);
        dailyHabits.push(example3);
        localStorage.setItem('dailyHabits', JSON.stringify(dailyHabits));

        //save in database
        saveHabits(session);

        setUpdateRender(!updateRender);
        
    }

    return (
        <>
            <div className="daily-habits flex-1 w-full xl:px-10 lg:px-6 md:px-4">
                <div className="flex font-bold gap-3">
                    <div className="text-white xl:text-xl lg:text-md md:tex-md w-8/12 justify-start flex">
                        <h1 className="text-white xl:text-xl lg:text-md md:tex-md">Daily habits</h1>
                    </div>
                    <div className="flex justify-end w-3/12 gap-5 z-50">
                        <button className="h-[18px] w-[18px]" data-tooltip-id="newHabit" onClick={() => handleCreateModal()}>
                            <PlusIcon className="h-[18px] w-[18px]" />
                        </button>
                        <ReactTooltip
                            id="newHabit"
                            place="bottom"
                            content="Add new habit tracker"
                        />
                    </div>
                </div>
                <div className="flex flex-col py-5 md:py-1 min-h-full w-full">
                    {
                        dailyHabits.map((habit, index) => (
                            habit.currentValue < habit.maxValue &&
                            <div key={'habit_' + index} className={`w-full xl:h-[6.5vh] lg:h-[9vh] md:h-[9vh] flex-col gap-2 xl:mt-0 lg:mt-0 md:mt-3`}>
                                <Tracker tracker={habit} habitIndex={index} handleUpdateRender={handleUpdateRender} />
                            </div>
                        ))
                    }
                    {
                        dailyHabits.map((habit, index) => (
                            habit.currentValue === habit.maxValue &&
                            <div key={'habit_' + index} className={`w-full xl:h-[6.5vh] lg:h-[9vh] md:h-[9vh] flex-col gap-2 xl:mt-0 lg:mt-0 md:mt-3`}>
                                <Tracker tracker={habit} habitIndex={index} handleUpdateRender={handleUpdateRender} />
                            </div>
                        ))
                    }
                    {
                        dailyHabits.length === 0 &&
                        <div className="flex flex-col justify-center content-center py-5">
                            <h3 className="text-sm font-bold px-1 text-white text-center"><i>No trackers created...</i></h3>
                            <br />
                            <a onClick={() => createExamples()} className="text-xs font-bold px-1 text-white text-center hover:cursor-pointer hover:underline"><i>click here to create some examples</i></a>
                        </div>
                    }
                </div>
            </div>

            {
                showCreateModal &&
                <NewHabitTrackerModal
                    closeModal={handleCreateModal}
                    updateHabits={handleUpdateRender}
                />
            }
        </>
    );
};

export default DailyHabits;
