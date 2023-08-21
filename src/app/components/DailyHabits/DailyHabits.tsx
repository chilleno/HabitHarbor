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

    return (
        <>
            <ContentBox className="xl:min-w-[330px] lg:min-w-[290px] -mt-2 h-[17rem]">
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
                    <h1>Daily habits</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-16 bg-main-primary rounded-xl w-full">
                    {
                        dailyHabits.length > 0 ? dailyHabits.map((habit, index) => (
                            <div key={'habit_' + index} className={`w-full flex flex-col gap-2 xl:ml-1 lg:-ml-7`}>
                                <Tracker tracker={habit} habitIndex={index} handleUpdateRender={handleUpdateRender} />
                            </div>
                        ))
                            :
                            <div>
                                <h3 className="text-sm font-bold px-1 text-white text-center"><i>No trackers created...</i></h3>
                                <br />
                                <a onClick={() => alert('crate examples')} className="text-xs font-bold px-1 text-white text-center hover:cursor-pointer hover:underline"><i>click here to create some examples</i></a>
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
