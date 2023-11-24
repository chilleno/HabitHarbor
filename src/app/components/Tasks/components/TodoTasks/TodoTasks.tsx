"use client"
import React, { useState, useEffect, useRef } from 'react';
import { CogIcon, TrashIcon } from '@heroicons/react/24/solid';
import FloatingButton from '@/app/designComponent/FloatingButton';
import OptionList from './components/OptionList';
import InputText from '@/app/designComponent/form/InputText';
import PrioritizeModal from './components/PrioritizeModal';
import useSound from 'use-sound';


const TodoTasks: React.FC<TasksProps> = ({ currentTaskListIndex, taskList, updateTaskList, setUpdateTaskList }) => {
    const [newTask, setNewTask] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [highlightedTask, setHighlightedTask] = useState<number | null>(null);
    const [showPrioritizeModal, setShowPrioritizeModal] = useState<boolean>(false);

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
                }, (600))
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

    const closePrioritizeModal = () => {
        setShowPrioritizeModal(false);
    }

    const openPrioritizeModal = () => {
        setShowPrioritizeModal(true);
    }

    const handleRefreshList = () => {
        setUpdateTaskList(!updateTaskList);
    }

    return (
        <div className="mt-8">
            <div className="flex justify-end -mr-12 -mt-8">
                <FloatingButton onClick={() => setShowOptions(!showOptions)}>
                    <span className="flex items-center justify-center hover:cursor-pointer">
                        <CogIcon className="h-[24px] w-[24px] text-white" />
                    </span>
                    {
                        showOptions &&
                        <OptionList
                            onClose={() => setShowOptions(false)}
                            openPrioritizeModal={openPrioritizeModal}
                        />
                    }
                </FloatingButton>
            </div>
            <div className="flex justify-center items-center font-bold -mt-6 mb-2">
                <h1 className="text-white xl:text-xl lg:text-md md:tex-md">Tasks</h1>
            </div>
            <div className="flex flex-col justify-center content-center">
                <InputText
                    placeholder="Type and press enter to create a task..."
                    value={newTask}
                    id="newTaskInput"
                    onChange={(value) => setNewTask(value)}
                    onKeyDown={handlePressEnterButton}
                    className="focus:ring-0 focus:border-main-primary xl:text-lg lg:text-xs md:text-xs"
                    name="task-name-new"
                />
                <b className={`xl:text-md lg:text-xs md:text-xs ml-5 text-[red] transition-opacity duration-150 ${showError ? 'opacity-100 animate-headShake' : 'opacity-0'}`}>
                    <i>Please add a text longer than 3 characters.</i>
                </b>
            </div>
            {
                (highlightedTask !== null && taskList[highlightedTask]) &&
                <div className="flex gap-5 ">
                    <div className="flex ml-1 xl:text-lg lg:text-xs md:text-xs w-2/12 animate-backInLeft gap-3">
                        <div className="animate-heartBeat animate-infinite ">
                            🔥
                        </div>
                        Focus on
                        <div className="animate-heartBeat animate-infinite ">
                            👉
                        </div>
                    </div>
                    <div
                        className={`gap-1 group/item flex items-center bg-main-primary xl:mb-2 lg:mb-1 min-h-[32px] h-[32px] max-h-[32px] text-start py-3 px-3 rounded-3xl animate-backInUp w-10/12`}
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
                                className="w-10/12 xl:text-lg lg:text-xs md:text-xs bg-[transparent] border-0 focus:ring-0 focus:border-b-2 focus:border-white text-white"
                                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                                defaultValue={task.header}
                                onBlur={(e) => handleChangeTaskText(e.target.value, index, e)}
                                id={'task_' + currentTaskListIndex + '_content_' + index}
                            />
                            <div className="invisible group-hover/item:visible w-1/12 flex justify-end mr-3 gap-2">
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
            {
                showPrioritizeModal &&
                <PrioritizeModal
                    closeModal={closePrioritizeModal}
                    renderList={handleRefreshList}
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={taskList}
                />
            }
        </div>
    );
};

export default TodoTasks;
