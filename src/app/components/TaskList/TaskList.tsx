import React, { useState, useEffect, useRef } from 'react';

interface Task {
    id: number;
    header: string;
    description: string;
    order: number;
    subtasks: any[];
}

interface TaskListProps {
    tasks: Task[];
    currentTaskIndex: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, currentTaskIndex }) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    useEffect(() => {
        const currentTaskRef = taskRefs.current[currentTaskIndex];
        if (currentTaskRef) {
            currentTaskRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentTaskIndex]);

    return (
        <div className="flex flex-col h-screen -z-50 overflow-y-auto">
            {tasks.map((task, index) => (
                <div
                    key={task.id}
                    className={`border border-gray-500 rounded-md p-4 mb-4 cursor-pointer ${index === currentTaskIndex ? 'bg-blue-200' : ''
                        }`}
                    onClick={() => handleTaskClick(task)}
                    ref={(ref) => {
                        taskRefs.current[index] = ref;
                    }}
                >
                    <h2 className="font-bold text-xl">{task.header}</h2>
                </div>
            ))}
            {selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <div className="ml-5 mr-5 mt-5 h-auto bg-gray-900">
                            <div className="flex">
                                <h1 className="bg-white text-black rounded-full px-4 py-2 text-3xl font-bold">
                                    {selectedTask.header}
                                </h1>
                            </div>
                            <div className="mt-5">
                                <p className="bg-white text-black rounded-full px-4 py-2 text-xl font-bold">
                                    {selectedTask.description}
                                </p>
                            </div>
                        </div>
                        <button
                            className="mt-4 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="ml-5 mt-4 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
                            onClick={closeModal}
                        >
                            Change
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
