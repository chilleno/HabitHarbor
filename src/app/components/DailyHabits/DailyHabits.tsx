"use client"
import React from 'react';
import ContentBox from '../../designComponent/ContentBox';
import Water from './Trackers/Water';

const DailyHabits = () => {
    return (
        <ContentBox className="xl:min-w-[330px] lg:min-w-[290px] -mt-2 h-[17rem]">
            <div className="flex justify-center font-bold mb-2">
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
