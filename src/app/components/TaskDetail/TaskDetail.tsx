import React, { useState, useEffect } from 'react';

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
        <div className="ml-5 mr-5 mt-5 h-auto bg-gray-900">
            <div className="flex">
                <div className="w-3/5">
                    <h1 className="bg-white text-black rounded-full px-4 py-2 text-3xl font-bold">{headerState}</h1>
                </div>
                <div className="w-2/5 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <button onClick={handleNextTask} className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">
                            Complete Task
                        </button>
                        <button onClick={handlePreviousTask} className="ml-5 px-4 py-2 font-semibold text-sm bg-gray-500 text-white rounded-full shadow-sm">
                            {"<-"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <p className="bg-white text-black rounded-full px-4 py-2 text-xl font-bold">{descriptionState}</p>
            </div>
        </div>
    );
};

export default TaskDetail;
