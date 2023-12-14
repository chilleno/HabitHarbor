"use client"
import React, { useState, useEffect, useRef } from 'react';
import { QueueListIcon, TrashIcon, InboxArrowDownIcon, ArchiveBoxXMarkIcon, XMarkIcon, PencilIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import InputText from '@/app/designComponent/form/InputText';
import PrioritizeModal from './PrioritizeModal';
import useSound from 'use-sound';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from "react-tooltip";


const CreateTask: React.FC<TasksProps> = ({ currentTaskListIndex, taskList, updateTaskList, setUpdateTaskList, highlightedTask, setHighlightedTask, handleMoveTaskMode, moveTasksMode, lists }) => {
    const [newTask, setNewTask] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [showPrioritizeModal, setShowPrioritizeModal] = useState<boolean>(false);
    const [targetTaskList, setTargetTaskList] = useState<number>(-1);

    //sfx
    const [checkSound, { stop: stopCheckSound }] = useSound('/static/sounds/check.wav');
    const [newTaskSound, { stop: stopNewTaskSound }] = useSound('/static/sounds/newTask.wav');
    const [errorSound, { stop: stopErrorSound }] = useSound('/static/sounds/error1.wav');

    const handlePressEnterButton = (event: any) => {
        if (event.key === 'Enter') {
            addNewTask(event.target.value);
        }
    }

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

    const addNewTask = (newTask: string): void => {
        if (newTask.length <= 3 || newTask === "Create a new task here...") {
            return handleInputError();
        }

        if (typeof window !== 'undefined') {
            let localStorageTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (localStorageTaskLists.length > 0) {

                let newTaskObject: Task = {
                    header: newTask,
                    priority: null,
                    checked: false,
                    subtasks: [],
                }

                let updatedTaskLists = localStorageTaskLists[currentTaskListIndex].tasks

                updatedTaskLists.push(newTaskObject);
                localStorageTaskLists[currentTaskListIndex].tasks = updatedTaskLists;

                localStorage.setItem('taskLists', JSON.stringify(localStorageTaskLists));

                // fired custom event on localStorage data changed
                const event = new CustomEvent('tasksdatachanged') as any;
                document.dispatchEvent(event);

                handleRefreshList();

                setTimeout(() => {
                    setNewTask('');
                }, (1))

                setTimeout(() => {
                    newTaskSound();
                }, (200))
            } else {
                window.alert('You need to create a new list first.')
            }
        }
    }

    const handleInputError = (): void => {
        errorSound();
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, (1000))
    }

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
    }

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
    }

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

    //function that delete all the done tasks on the current task list
    const deleteAllDoneTasks = (): void => {
        //confirm if the user wants to delete all the done tasks
        if (!window.confirm('Are you sure you want to delete all the done tasks?')) return;

        if (typeof window !== 'undefined') {
            const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            const currentTaskList = currentTaskLists[currentTaskListIndex];
            const newTaskList: TaskList = {
                name: currentTaskList.name,
                highlightedTask: currentTaskList.highlightedTask,
                tasks: currentTaskList.tasks.filter((task: Task) => !task.checked)
            }
            currentTaskLists[currentTaskListIndex] = newTaskList;
            localStorage.setItem('taskLists', JSON.stringify(currentTaskLists))

            // fired custom event on localStorage data changed
            const event = new CustomEvent('tasksdatachanged') as any;
            document.dispatchEvent(event);

            handleRefreshList();
        }
    }

    //function that delete all the task on the current task list
    const deleteAllTasks = (): void => {
        //confirm if the user wants to delete all the tasks
        if (!window.confirm('Are you sure you want to delete all the tasks?')) return;

        if (typeof window !== 'undefined') {
            const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            const currentTaskList = currentTaskLists[currentTaskListIndex];
            const newTaskList: TaskList = {
                name: currentTaskList.name,
                highlightedTask: currentTaskList.highlightedTask,
                tasks: []
            }
            currentTaskLists[currentTaskListIndex] = newTaskList;
            localStorage.setItem('taskLists', JSON.stringify(currentTaskLists))

            // fired custom event on localStorage data changed
            const event = new CustomEvent('tasksdatachanged') as any;
            document.dispatchEvent(event);

            handleRefreshList();
        }
    }

    const handleRefreshList = () => {
        setUpdateTaskList(!updateTaskList);
    }

    const closePrioritizeModal = () => {
        setShowPrioritizeModal(false);
    }

    const openPrioritizeModal = () => {
        setShowPrioritizeModal(true);
    }

    const transferTasks = (): void => {
        if (targetTaskList === -1) {
            window.alert('Please select a target task list to transfer the tasks to.')
            return;
        }

        //confirm if the user want to move selected tasks
        if (!window.confirm('Are you sure you want to move the selected tasks?')) return;

        //get selected task to move from localStorage named moveTasks
        const selectedTasksToMove = JSON.parse(localStorage.getItem('moveTasks') || '[]');
        const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        const currentTaskList = currentTaskLists[currentTaskListIndex];
        const targetTaskListObject = currentTaskLists[targetTaskList];


        //move selected tasks to target task list and remove them from current task list
        const newTaskList: TaskList = {
            name: currentTaskList.name,
            highlightedTask: currentTaskList.highlightedTask,
            tasks: currentTaskList.tasks.filter((task: Task, index: number) => !selectedTasksToMove.includes(index))
        }
        currentTaskLists[currentTaskListIndex] = newTaskList;

        const newTargetTaskList: TaskList = {
            name: targetTaskListObject.name,
            highlightedTask: targetTaskListObject.highlightedTask,
            tasks: targetTaskListObject.tasks.concat(currentTaskList.tasks.filter((task: Task, index: number) => selectedTasksToMove.includes(index)))
        }
        currentTaskLists[targetTaskList] = newTargetTaskList;

        localStorage.setItem('taskLists', JSON.stringify(currentTaskLists));

        // fired custom event on localStorage data changed
        const event = new CustomEvent('tasksdatachanged') as any;
        document.dispatchEvent(event);

        handleRefreshList();

        handleMoveTaskMode();
    }

    return (
        <>
            <div className="flex flex-grid justify-center items-center font-bold py-4 border-b-2 border-gray gap-5">

                {
                    moveTasksMode === false &&
                    <>
                        <h1 className="text-white xl:text-xl lg:text-md md:tex-md w-2/12">Tasks</h1>
                        <div className="flex flex-col justify-center content-center xl:w-6/12 lg:w-5/12">
                            <div className="flex justify-center content-center items-center gap-2">
                                <InputText
                                    placeholder="Type and press enter to create a task..."
                                    value={newTask}
                                    id="newTaskInput"
                                    onChange={(value) => setNewTask(value)}
                                    onKeyDown={handlePressEnterButton}
                                    className="w-full h-[50px] py-3 xl:px-8 lg:px-5 focus:ring-0 focus:border-main-primary xl:text-lg lg:text-xs md:text-xs"
                                    name="task-name-new"
                                />
                            </div>
                            <b className={`xl:text-lg lg:text-md md:text-sm ml-5 text-[red] transition-opacity duration-250  ${showError ? 'opacity-100 animate-headShake mt-2 -mb-2' : 'opacity-0 h-0'}`}>
                                <i>Please add a text longer than 3 characters.</i>
                            </b>
                        </div>
                        <div className="xl:w-2/12 lg:w-3/12 gap-1 flex justify-center">
                            <button data-tooltip-id="prioritizeTooltip" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => openPrioritizeModal()}>
                                <QueueListIcon className="h-[24px] w-[24px]" />
                            </button>
                            <button data-tooltip-id="moveTasksTooltip" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => handleMoveTaskMode()}>
                                <ArrowsRightLeftIcon className="h-[24px] w-[24px]" />
                            </button>
                            <button data-tooltip-id="deleteFinishedTasksTooltip" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => deleteAllDoneTasks()}>
                                <InboxArrowDownIcon className="h-[24px] w-[24px]" />
                            </button>
                            <button data-tooltip-id="deleteAllTasksTooltip" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => deleteAllTasks()}>
                                <XMarkIcon className="h-[24px] w-[24px]" />
                            </button>

                        </div>
                    </>
                }
                {
                    moveTasksMode === true &&
                    <>
                        <h1 className="text-white xl:text-xl lg:text-md md:tex-md w-2/12">Move tasks to:  </h1>
                        <div className="flex flex-col justify-center content-center xl:w-6/12 lg:w-5/12">
                            <select
                                defaultValue={currentTaskListIndex}
                                onChange={(e) => setTargetTaskList(Number(e.target.value))}
                                className="w-full h-[50px] py-3 px-8 bg-main-primary rounded-3xl content-center focus:ring-0 border-0 justify-center flex text-center italic text-white xl:text-lg lg:text-xs md:text-xs"
                            >
                                <option disabled value={-1}>
                                    No task list selected
                                </option>
                                {
                                    lists &&
                                    lists.length > 0 &&
                                    lists.map((list, index) => (
                                        index !== currentTaskListIndex &&
                                        <option
                                            key={'task_list_' + index}
                                            value={index}

                                        >
                                            {list.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="xl:w-2/12 lg:w-3/12 gap-2 flex justify-center">
                            <button data-tooltip-id="prioritizeTooltip" className="h-9 px-3 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => transferTasks()}>
                                Accept
                            </button>
                            <button data-tooltip-id="prioritizeTooltip" className="h-9 px-3 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => handleMoveTaskMode()}>
                                Cancel
                            </button>
                        </div>
                    </>

                }
            </div>
            {
                (highlightedTask !== null && taskList[highlightedTask]) &&
                <div className="flex gap-5 before:content-['🔥'] before:animate-heartBeat before:animate-infinite pl-6 animate-backInUp pt-2">
                    <div
                        className={`gap-3 group/item flex items-center bg-main-primary xl:w-[92%] lg:w-[89%] xl:-ml-4 lg:-ml-4  xl:mb-2 lg:mb-1 md:mb-1 min-h-[2rem] h-[2rem] max-h-[2rem] text-start py-3 px-3 rounded-3xl`}
                    >
                        <input
                            checked={taskList[highlightedTask].checked || false}
                            onChange={() => handleCheckboxChange(highlightedTask)}
                            type='checkbox'
                            className="w-[20px] h-[20px] rounded-3xl focus:rounded-full bg-main-primary border-[#3D3E42] border-2 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        />
                        <div className="animate-heartBeat animate-delay-75 animate-infinite ml-2 xl:text-lg lg:text-xs md:text-xs">
                            {taskList[highlightedTask].priority}
                        </div>
                        <input
                            className="xl:text-lg lg:text-xs md:text-xs lg:placeholder:text-xs ml-2 w-full bg-[transparent] border-0 focus:ring-0 focus:border-b-2 focus:border-white"
                            style={{ textDecoration: taskList[highlightedTask].checked ? 'line-through' : 'none' }}
                            defaultValue={taskList[highlightedTask].header}
                            onBlur={(e) => handleChangeTaskText(e.target.value, highlightedTask, e)}
                        />
                        <div className="invisible group-hover/item:visible w-1/12 flex justify-end mr-3 gap-3">
                            <b
                                onClick={() => handleHighlightTask(null)}
                                className="text-xs text-white hover:cursor-pointer"
                            >
                                🧯
                            </b>
                            <TrashIcon
                                onClick={() => handleDeleteTask(highlightedTask)}
                                className="h-4 w-4 text-white hover:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            }
            {
                showPrioritizeModal &&
                <PrioritizeModal
                    closeModal={closePrioritizeModal}
                    renderList={handleRefreshList}
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={taskList}
                />
            }
            <ReactTooltip
                id="prioritizeTooltip"
                place="bottom"
                content="Prioritize tasks from current task list"
            />
            <ReactTooltip
                id="deleteFinishedTasksTooltip"
                place="bottom"
                content="Delete finished tasks from current task list"
            />
            <ReactTooltip
                id="moveTasksTooltip"
                place="bottom"
                content="Move tasks from current task list to another task list"
            />
            <ReactTooltip
                id="deleteAllTasksTooltip"
                place="bottom"
                content="Delete all tasks from current task list"
            />
        </>
    );
};

export default CreateTask;
