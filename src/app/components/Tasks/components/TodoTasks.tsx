"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import useSound from 'use-sound';


const TodoTasks: React.FC<TasksProps> = ({ currentTaskListIndex, taskList, updateTaskList, setUpdateTaskList, highlightedTask, setHighlightedTask }) => {
    const [newTask, setNewTask] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showError, setShowError] = useState<boolean>(false);

    //sfx
    const [checkSound, { stop: stopCheckSound }] = useSound('/static/sounds/check.wav');
    const [newTaskSound, { stop: stopNewTaskSound }] = useSound('/static/sounds/newTask.wav');
    const [errorSound, { stop: stopErrorSound }] = useSound('/static/sounds/error1.wav');

    const handleHighlightTask = (taskIndex: number | null) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (taskIndex !== null) {
            setHighlightedTask(null);
        }

        setTimeout(() => {
            setHighlightedTask(taskIndex);
        }, (1))
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let localStorageTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (localStorageTaskLists.length > 0) {
                localStorageTaskLists[currentTaskListIndex].highlightedTask = highlightedTask;
                localStorage.setItem('taskLists', JSON.stringify(localStorageTaskLists));

                // fired custom event on localStorage data changed
                const event = new CustomEvent('tasksdatachanged') as any;
                document.dispatchEvent(event);

            }
        }
    }, [highlightedTask]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let localStorageTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (localStorageTaskLists.length > 0) {
                setHighlightedTask(localStorageTaskLists[currentTaskListIndex].highlightedTask);
            }
        }
    }, [currentTaskListIndex]);

    const handleCheckboxChange = (taskIndex: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (taskIndex === highlightedTask) {
            setHighlightedTask(null);
        }

        if (typeof window !== 'undefined') {
            let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            const updatedTasks = taskList.map((task, index) => {
                if (index === taskIndex) {
                    return {
                        ...task,
                        checked: !task.checked
                    };
                }
                return task;
            });
            currentStoredTaskLists[currentTaskListIndex].tasks = updatedTasks;
            localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));

            // fired custom event on localStorage data changed
            const event = new CustomEvent('tasksdatachanged') as any;
            document.dispatchEvent(event);

            handleRefreshList();

            checkSound();
        }
    };

    const handleDeleteTask = (taskIndex: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (taskIndex === highlightedTask) {
            setHighlightedTask(null);
        }

        if (typeof window !== 'undefined') {
            let updatedTasks = taskList;
            updatedTasks = updatedTasks.filter((task, index) => index !== taskIndex);

            let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            currentStoredTaskLists[currentTaskListIndex].tasks = updatedTasks;
            localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));

            // fired custom event on localStorage data changed
            const event = new CustomEvent('tasksdatachanged') as any;
            document.dispatchEvent(event);

            handleRefreshList();
        }
    };

    const handleChangeTaskText = (newText: string, taskIndex: number, element: any) => {
        if (newText.length <= 3) {
            element.target.classList.add('shake-error');
            element.target.focus();
            setTimeout(() => {
                element.target.classList.remove('shake-error');
            }, 500);
        } else {
            if (typeof window !== 'undefined') {
                let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');

                let updatedTasks = currentStoredTaskLists[currentTaskListIndex].tasks;
                updatedTasks = updatedTasks.map((task, index) => {
                    let currentTask = task;
                    if (taskIndex === index) {
                        currentTask.header = newText;
                        return currentTask;
                    } else {
                        return currentTask;
                    }
                });

                currentStoredTaskLists[currentTaskListIndex].tasks = updatedTasks;
                localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));

                // fired custom event on localStorage data changed
                const event = new CustomEvent('tasksdatachanged') as any;
                document.dispatchEvent(event);

                handleRefreshList();
            }
        }
    };

    const handleRefreshList = () => {
        setUpdateTaskList(!updateTaskList);
    }

    return (
        <div className="flex flex-col h-fit">
            {
                taskList && taskList.length > 0 ? taskList.map((task, index) => (
                    (task.checked == false && index !== highlightedTask) &&
                    <div
                        key={'task_' + currentTaskListIndex + '_content_' + index}
                        className={`gap-3 group/item flex items-center bg-main-primary w-full xl:mb-2 lg:mb-1 md:mb-1 min-h-[2rem] h-[2rem] max-h-[2rem] text-start py-3 px-3 rounded-3xl`}
                    >
                        <input
                            checked={task.checked || false}
                            onChange={() => handleCheckboxChange(index)}
                            id={'check_task_' + currentTaskListIndex + '_content_' + index}
                            type='checkbox'
                            className="w-[20px] h-[20px] rounded-3xl focus:rounded-full bg-main-primary border-[#3D3E42] border-2 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        />
                        <div className={`animate-fadeIn animate-delay-[${index}ms]} ml-7 xl:text-lg lg:text-xs md:text-xs`}>
                            {task.priority}
                        </div>
                        <input
                            className="w-9/12 xl:text-lg lg:text-xs md:text-xs bg-[transparent] border-0 focus:ring-0 focus:border-b-2 focus:border-white text-white"
                            style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                            defaultValue={task.header}
                            onBlur={(e) => handleChangeTaskText(e.target.value, index, e)}
                            id={'task_' + currentTaskListIndex + '_content_' + index}
                        />
                        <div className="w-2/12 flex justify-end mr-3 gap-2">
                            <b
                                onClick={() => handleHighlightTask(index)}
                                className="text-xs text-white hover:cursor-pointer"
                            >
                                🔥
                            </b>
                            <TrashIcon
                                onClick={() => handleDeleteTask(index)}
                                className="h-4 w-4 text-white hover:cursor-pointer"
                            />
                        </div>
                    </div>
                )) : <i>no tasks created...</i>
            }
        </div>
    );
};

export default TodoTasks;
