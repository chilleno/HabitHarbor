import React, { useState, useEffect } from 'react';
import ContentBox from '../../designComponent/ContentBox';

const Clock: React.FC = () => {
    const [dateState, setDateState] = useState<Date>(new Date());

    // Update the date state every 30 seconds.
    useEffect(() => {
        const interval = setInterval(() => setDateState(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ContentBox>
            <div className="flex flex-row items-center justify-center  font-bold gap-1">
                <div className="text-6xl">
                    {dateState.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }).slice(0, -2)}
                </div>
                <div className="-rotate-90 text-3xl">
                    {dateState.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }).slice(-2)}
                </div>
            </div>
            <div className="flex justify-center content-center text-xl">
                {dateState.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                })}
            </div>
        </ContentBox>
    );
};

export default Clock;