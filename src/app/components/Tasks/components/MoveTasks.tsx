"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import useSound from 'use-sound';


const MoveTasks: React.FC<TasksProps> = ({ currentTaskListIndex, taskList, updateTaskList, setUpdateTaskList, highlightedTask, setHighlightedTask }) => {
    const [moveTasksArray, setMoveTasksArray] = useState<Number[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    //sfx
    const [checkSound, { stop: stopCheckSound }] = useSound('/static/sounds/checkMoveTask.wav');
    const [unCheckSound, { stop: stopUnCheckSound }] = useSound('/static/sounds/unCheckMoveTask.wav');

    const handleCheckTaskToMove = (taskIndex: number) => {
        //check if task is already in moveTasks array if so remove it else add it
        if (moveTasksArray.includes(taskIndex)) {
            setMoveTasksArray(moveTasksArray.filter((task) => task !== taskIndex));
            localStorage.setItem('moveTasks', JSON.stringify(moveTasksArray.filter((task) => task !== taskIndex)));
            stopCheckSound();
            unCheckSound();
        } else {
            setMoveTasksArray([...moveTasksArray, taskIndex]);
            localStorage.setItem('moveTasks', JSON.stringify([...moveTasksArray, taskIndex]));
            stopUnCheckSound();
            checkSound();
        }
        
        //store the moveTasks array in localstorage
     
    }

    return (
        <div className="flex flex-col h-fit">
            {
                taskList && taskList.length > 0 ? taskList.map((task, index) => (
                    <div
                        key={'tasklists_' + currentTaskListIndex + '_content_' + index}
                        className={`gap-3 group/item flex items-center bg-main-primary w-full xl:mb-2 lg:mb-1 md:mb-1 min-h-[2rem] h-[2rem] max-h-[2rem] text-start py-3 px-3 rounded-3xl`}
                    >
                        <input
                            checked={moveTasksArray.includes(index)}
                            onChange={() => handleCheckTaskToMove(index)}
                            id={'checklist_task_' + currentTaskListIndex + '_content_' + index}
                            type='checkbox'
                            className="w-[20px] h-[20px] bg-main-primary checked:bg-main-primary border-[#3D3E42] checked:border-white border-2 shadow-sm focus:ring focus:ring-opacity-50 "
                        />

                        <input
                            className="w-10/12 xl:text-lg lg:text-xs md:text-xs bg-[transparent] border-0 focus:ring-0 focus:border-b-2 focus:border-white text-white"
                            style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                            defaultValue={task.header}
                            disabled={true}
                            id={'task_' + currentTaskListIndex + '_content_' + index}
                        />
                    </div>
                )) : <i>no tasks created...</i>
            }
        </div>
    );
};

export default MoveTasks;
