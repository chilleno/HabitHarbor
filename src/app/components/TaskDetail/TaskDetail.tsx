import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/solid';

interface TaskDetailProps {
    header: string;
    description: string;
    nextTask: () => void;
    previousTask: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ header, description, nextTask, previousTask }) => {
    const [headerState, setHeaderState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');

    const handleNextTask = () => {
        nextTask();
    };

    const handlePreviousTask = () => {
        previousTask();
    };

    useEffect(() => {
        setHeaderState(header);
        setDescriptionState(description);
    }, [header, description]);

    return (
        <div className="xl:p-10 lg:p-5 sm:p-2 h-screen">
            <div className="flex">
                <div className="xl:w-3/5 lg:w-3/5 sm:w-4/6">
                    <h1 className="bg-white text-gray-900 rounded-full px-4 xl:py-2 lg:py-2 sm:py-2 xl:text-4xl lg:text-md sm:text-xs font-bold shadow-md shadow-gray-900">{headerState}</h1>
                </div>
                <div className="xl:w-2/5 lg:w-2/5 sm:w-2/6 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <button onClick={handleNextTask} className="px-4 xl:py-4 lg:py-2 sm:py-1 xl:text-md font-semibold xl:text-sm lg:text-sm bg-cyan-500 text-white rounded-full shadow-md shadow-gray-900">
                            <span className="sm:hidden lg:inline xl:inline">Complete Task</span>
                            <CheckIcon className="xl:hidden lg:hidden sm:inline sm:w-3 sm:h-3 text-white-500" />
                        </button>
                        <button onClick={handlePreviousTask} className="xl:ml-5 lg:ml-5 sm:ml-3 px-4 xl:py-4 lg:py-2 sm:py-1 font-semibold bg-gray-500 text-white rounded-full shadow-md shadow-gray-900">
                            <ArrowLeftIcon className="xl:h-6 xl:w-6 lg:h-6 lg:w-6 sm:w-3 sm:h-3 text-white-500" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <p className="bg-white text-gray-900 max-h-16 min-h-[300px] sm:min-h-[150px] rounded-3xl px-5 py-3 xl:text-2xl lg:text-sm sm:text-[12px] font-bold shadow-md shadow-gray-900 overflow-y-auto">
                    {descriptionState}
                </p>
            </div>
        </div>
    );
};

export default TaskDetail;
