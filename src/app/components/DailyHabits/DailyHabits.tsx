"use client"
import React, { useEffect, useState } from 'react';
import ContentBox from '../../designComponent/ContentBox';
import Water from './Trackers/Water';
import FloatingButton from '@/app/designComponent/FloatingButton';
import { CogIcon } from '@heroicons/react/24/solid';
import OptionList from './components/OptionList';
import NewHabitTrackerModal from './components/NewHabitTrackerModal';
import Tracker from './components/Tracker';

const DailyHabits = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [updateRender, setUpdateRender] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [dailyHabits, setDailyHabits] = useState<HabitTracker[]>([]);

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
            unit: 'cups',
            color: '#68A0CA',
            maxValue: 3,
            currentValue: 0,
            firstTrackerDate: new Date().toString(),
        };
        const example2: HabitTracker = {
            icon: '1f9d8',
            name: 'meditate',
            unit: 'sessions',
            color: '#7975D1',
            maxValue: 1,
            currentValue: 0,
            firstTrackerDate: new Date().toString(),
        };
        const example3: HabitTracker = {
            icon: '1f4d6',
            name: 'Reading',
            unit: 'sessions',
            color: '#CE769C',
            maxValue: 1,
            currentValue: 0,
            firstTrackerDate: new Date().toString(),
        };
        dailyHabits.push(example1);
        dailyHabits.push(example2);
        dailyHabits.push(example3);
        localStorage.setItem('dailyHabits', JSON.stringify(dailyHabits));
        setUpdateRender(!updateRender);
    }

    return (
        <>
            <ContentBox className="xl:min-w-[21rem] lg:min-w-[15rem] lg:max-w-[15rem] -mt-5 daily-habits md:max-h-[18rem] md:min-h-[18rem] lg:max-h-[19rem] lg:min-h-[19rem] xl:max-h-[27rem] xl:min-h-[27rem]">
                <div className="flex justify-end -mr-12 -mt-6">
                    <FloatingButton onClick={() => setShowOptions(!showOptions)}>
                        <span className="flex items-center justify-center hover:cursor-pointer">
                            <CogIcon className="h-[24px] w-[24px] text-white" />
                        </span>
                        {
                            showOptions &&
                            <OptionList
                                onClose={() => setShowOptions(!showOptions)}
                                openCreateModal={handleCreateModal}
                            />
                        }
                    </FloatingButton>
                </div>
                <div className="flex justify-center font-bold mb-2 -mt-8">
                    <h1 className="text-white xl:text-xl lg:text-md md:tex-md">Daily habits</h1>
                </div>
                <div className="flex flex-col xl:gap-16 lg:gap-14 bg-main-primary rounded-xl xl:w-[17rem] lg:w-[13rem] overflow-y-scroll xl:max-h-[22rem] xl:min-h-[22rem] lg:min-h-[15rem] lg:max-h-[15rem] xl:-ml-0 lg:-ml-4 py-2 no-scrollbar">
                    {
                        dailyHabits.map((habit, index) => (
                            habit.currentValue < habit.maxValue &&
                            <div key={'habit_' + index} className={`w-full relative flex-col gap-2 xl:ml-3 lg:ml-1`}>
                                <Tracker tracker={habit} habitIndex={index} handleUpdateRender={handleUpdateRender} />
                            </div>
                        ))
                    }
                    {
                        dailyHabits.map((habit, index) => (
                            habit.currentValue === habit.maxValue &&
                            <div key={'habit_' + index} className={`w-full relative flex-col gap-2 xl:ml-3 lg:ml-1`}>
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
            </ContentBox>

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
