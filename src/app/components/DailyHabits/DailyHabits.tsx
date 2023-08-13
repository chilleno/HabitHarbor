"use client"
import React from 'react';
import ContentBox from '../../designComponent/ContentBox';
import Water from './Trackers/Water';

const DailyHabits = () => {
    return (
        <ContentBox className="min-w-[340px] -mt-2 h-60">
            <div className="flex justify-center font-bold mb-2">
                <h1>Daily habits</h1>
            </div>
            <div className="flex justify-center items-center bg-main-primary rounded-xl p-3">
                <div className={`w-full flex flex-col gap-2`}>
                    <Water />
                </div>
            </div>
        </ContentBox>
    );
};

export default DailyHabits;
