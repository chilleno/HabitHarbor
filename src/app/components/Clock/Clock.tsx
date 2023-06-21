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
        <div className="sm:flex sm:items-center sm:justify-end lg:items-end lg:justify-end lg:flex-col h-auto bg-gray-900 text-white font-bold p-2">
            <div className="flex justify-end lg:text-xl sm:text-xs">
                {dateState.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                })}
            </div>
            <div className="flex items-center justify-end lg:text-5xl sm:text-xs sm:ml-2">
                <ClockIcon className="sm:hidden lg:inline lg:h-12 lg:w-12 text-white-500" />
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