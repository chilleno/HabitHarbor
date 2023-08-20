"use client"
import React, { useState } from 'react';
import ContentBox from '../../designComponent/ContentBox';
import Water from './Trackers/Water';
import FloatingButton from '@/app/designComponent/FloatingButton';
import { CogIcon } from '@heroicons/react/24/solid';
import OptionList from './components/OptionList';

const DailyHabits = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    return (
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
                        />
                    }
                </FloatingButton>
            </div>
            <div className="flex justify-center font-bold mb-2 -mt-8">
                <h1>Daily habits</h1>
            </div>
            <div className="flex justify-center items-center bg-main-primary rounded-xl w-full">
                <div className={`w-full flex flex-col gap-2 xl:ml-1 lg:-ml-7`}>
                    <Water />
                </div>
            </div>
        </ContentBox>
    );
};

export default DailyHabits;
