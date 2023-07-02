import React, { useState, useEffect, useRef } from 'react';

interface Task {
    id: number;
    header: string;
    order: number;
    checked: boolean;
    subtasks: any[];
}

interface TaskListProps {
    tasks: Task[];
    currentTaskIndex: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, currentTaskIndex }) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleCheckboxChange = (taskId: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setTaskList(prevTasks => {
            const updatedTasks = prevTasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        checked: !task.checked
                    };
                }
                return task;
            });
            return updatedTasks;
        });

        // Remove the checked task after 3 seconds
        timeoutRef.current = setTimeout(() => {
            setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }, 5000);
    };

    return (
        <>
            <div className="flex justify-center p-5">
                <h1 className="text-white xl:text-4xl lg:text-3xl sm:text2xl font-bold underline underline-offset-7">
                    Task List
                </h1>
            </div>
            <div className="flex py-5">
                <h6 className={`text-white text-md font-bold hover:cursor-pointer underline hover:underline underline-offset-7 hover:underline-offset-7`}>
                    Wake up routine
                </h6>
            </div>
            <div className="flex flex-col h-screen max-h-fit -z-50 pt-5">
                {
                    taskList.map((task, index) => (
                        <div
                            key={'task_content_' + index}
                            className={`flex items-center transition-opacity ${task.checked ? 'duration-[3000ms] opacity-0' : 'opacity-100'}`}
                        >
                            <input
                                checked={task.checked || false}
                                onChange={() => handleCheckboxChange(task.id)}
                                id={'task_' + index}
                                type='checkbox'
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <label
                                className="ml-2"
                                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                                htmlFor={'task_' + index}
                            >
                                {task.header}
                            </label>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default TaskList;
