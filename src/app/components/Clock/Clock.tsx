"use client";

import React, { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const Clock: React.FC = () => {
    const [dateState, setDateState] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDateState(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-auto bg-gray-900 text-white font-bold p-2">
            <div className="flex justify-end text-xl">
                {dateState.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                })}
            </div>
            <div className="flex justify-end text-5xl">
                <ClockIcon className="h-12 w-12 text-white-500 mr-1" />
                {dateState.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
            </div>
        </div>
    );
};

export default Clock;