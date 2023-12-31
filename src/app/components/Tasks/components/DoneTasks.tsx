"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import useSound from 'use-sound';
import { useSession } from "next-auth/react"
import { saveTasks } from '../../PostRequests/PostRequests'

const DoneTasks: React.FC<TasksProps> = ({ currentTaskListIndex, taskList, updateTaskList, setUpdateTaskList }) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { data: session } = useSession()

    //sfx
    const [playSoundCheckbox] = useSound('/static/sounds/uncheck.wav');

    const handleCheckboxChange = (taskIndex: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
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

            //save in database
            saveTasks(session);

            setUpdateTaskList(!updateTaskList);

            playSoundCheckbox();
        }
    };

    const handleDeleteTask = (taskIndex: number) => {
        if (typeof window !== 'undefined') {
            let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');

            let updatedTasks = currentStoredTaskLists[currentTaskListIndex].tasks;
            updatedTasks = updatedTasks.filter((task, index) => index !== taskIndex);

            currentStoredTaskLists[currentTaskListIndex].tasks = updatedTasks;
            localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));

            //save in database
            saveTasks(session);

            setUpdateTaskList(!updateTaskList);
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

                //save in database
                saveTasks(session);

                setUpdateTaskList(!updateTaskList);
            }
        }
    };

    return (
        <div className="mt-4">
            <div className="flex flex-col h-fit">
                {
                    taskList && taskList.length > 0 ? taskList.map((task, index) => (
                        task.checked == true &&
                        <div
                            key={'task_content_' + index}
                            className={`group/item flex items-center bg-main-primary w-full xl:mb-2 lg:mb-1 md:mb-1 min-h-[32px] h-[32px] max-h-[32px] text-start py-3 px-3 rounded-3xl animate-backInDown`}
                        >
                            <input
                                checked={task.checked || false}
                                onChange={() => handleCheckboxChange(index)}
                                id={'task_' + index}
                                type='checkbox'
                                className="w-[20px] h-[20px] rounded-3xl focus:rounded-full checked:bg-main-primary checked:border-[#3D3E42] checked:border-2 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <input
                                className="ml-2 w-10/12 bg-[transparent] border-0 focus:ring-0 focus:border-b-2 focus:border-white text-white xl:text-lg lg:text-xs"
                                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                                defaultValue={task.header}
                                onBlur={(e) => handleChangeTaskText(e.target.value, index, e)}
                            />
                            <div className="invisible group-hover/item:visible w-1/12 flex justify-end mr-3">
                                <TrashIcon
                                    onClick={() => handleDeleteTask(index)}
                                    className="h-4 w-4 text-white hover:cursor-pointer"
                                />
                            </div>
                        </div>
                    )) : null
                }
            </div>
        </div>
    );
};

export default DoneTasks;
