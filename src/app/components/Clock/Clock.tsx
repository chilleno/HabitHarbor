"use client";

import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
    const [dateState, setDateState] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDateState(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-28 bg-gray-900 text-white text-5xl font-bold">
            <div className="flex items-center">
                <span className="mr-2">
                    🕒 {' '}
                    {dateState.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}
                </span>
            </div>
            <div className="text-lg">
                📆 {' '}
                {dateState.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </div>
        </div>
    );
};

export default Clock;