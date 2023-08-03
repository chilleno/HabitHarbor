import React, { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const Clock: React.FC = () => {
    // State
    const [dateState, setDateState] = useState<Date>(new Date());

    // Update the date state every 30 seconds.
    useEffect(() => {
        const interval = setInterval(() => setDateState(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sm:flex sm:items-center sm:justify-end lg:items-end lg:justify-end lg:flex-col h-auto text-white font-bold p-2">
            {/* Weekday, day, month */}
            <div className="flex justify-end lg:text-xl sm:text-xs xl:mr-16 lg:mr-7">
                {dateState.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                })}
            </div>
            {/* Time */}
            <div className="flex items-center justify-end lg:text-5xl sm:text-xs sm:ml-2 xl:mr-16 lg:mr-7 sm:mr-1">
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