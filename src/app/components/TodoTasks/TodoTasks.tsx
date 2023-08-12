"use client"
import React, { useState, useEffect, useRef } from 'react';
import { CogIcon, TrashIcon } from '@heroicons/react/24/solid';
import ContentBox from '../../designComponent/ContentBox';
import FloatingButton from '@/app/designComponent/FloatingButton';
import OptionList from './components/OptionList';
import InputText from '@/app/designComponent/form/InputText';

const TodoTasks: React.FC<TasksProps> = ({ currentTaskListIndex, changeTaskList, taskList, setTaskList }) => {
    const [showCreateTaskInput, setShowCreateTaskInput] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [currentSelection, setCurrentSelection] = useState<number>(-1);
    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handlePressEnterButton = (event: any) => {
        if (event.key === 'Enter') {
            addNewTask(event.target.value);
        }
    }

    const addNewTask = (newTask: string): void => {
        if (newTask.length <= 3 || newTask === "Create a new task here...") {
            return handleInputError();
        }

        if (typeof window !== 'undefined') {
            let newTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (newTaskLists.length > 0) {
                playSoundNewTask();
                let newTaskObject: Task = {
                    "header": newTask,
                    "checked": false,
                    "subtasks": [],
                }
                newTaskLists[currentTaskListIndex].tasks.push(newTaskObject);

                localStorage.setItem('taskLists', JSON.stringify(newTaskLists));

                setTaskList(newTaskLists[currentTaskListIndex].tasks);

                setTimeout(() => {
                    setNewTask('');
                }, (1))
            } else {
                window.alert('You need to create a new list first.')
            }
        }
    }

    const handleInputError = (): void => {
        playSoundError();
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

        if (typeof window !== 'undefined') {
            playSoundCheckbox();
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
            setTaskList(updatedTasks);
        }
    };

    const handleDeleteTask = (taskIndex: number) => {
        if (typeof window !== 'undefined') {
            let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');

            let updatedTasks = currentStoredTaskLists[currentTaskListIndex].tasks;
            updatedTasks = updatedTasks.filter((task, index) => index !== taskIndex);

            currentStoredTaskLists[currentTaskListIndex].tasks = updatedTasks;
            localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));
            setTaskList(updatedTasks);
        }
    };

    const playSoundCheckbox = () => {
        const audio = new Audio('/static/sounds/check.wav');
        audio.play();
    };

    const playSoundNewTask = () => {
        const audio = new Audio('/static/sounds/newTask.wav');
        audio.play();
    };

    const playSoundError = () => {
        const audio = new Audio('/static/sounds/error1.wav');
        audio.play();
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
                setTaskList(updatedTasks);
            }
        }
    };


    const handleChangeTaskList = (newValue: number): void => {
        setCurrentSelection(newValue);
        changeTaskList(newValue);
    }

    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);

    useEffect(() => {
        handleChangeTaskList(currentTaskListIndex);
    }, [currentTaskListIndex])


    if (!initialRenderComplete) {
        return null;
    } else {
        return (
            <ContentBox className="min-w-full -mt-4">
                <div className="flex justify-end -mr-12 -mt-8">
                    <FloatingButton onClick={() => setShowOptions(!showOptions)}>
                        <span className="flex items-center justify-center hover:cursor-pointer">
                            <CogIcon className="h-[24px] w-[24px] text-white" />
                        </span>
                        {
                            showOptions &&
                            <OptionList
                                onClose={() => setShowOptions(false)}
                            />
                        }
                    </FloatingButton>
                </div>
                <div className="flex justify-center items-center font-bold -mt-6 mb-2">
                    <h1>TODO Tasks</h1>
                </div>
                <div hidden={showCreateTaskInput} className="flex flex-col justify-center content-center">
                    <InputText
                        placeholder="Type here a new task and press enter to create it..."
                        value={newTask}
                        id="newTaskInput"
                        onChange={(value) => setNewTask(value)}
                        onKeyDown={handlePressEnterButton}
                    />
                    <b className={`ml-5 text-[red] transition-opacity duration-150 ${showError ? 'opacity-100' : 'opacity-0'}`}>
                        <i>Please add a text longer than 3 characters.</i>
                    </b>
                </div>
                <div className="flex flex-col max-h-40 h-40 min-h-40 xl:max-h-80 xl:h-80 xl:min-h-80 overflow-y-auto">
                    {
                        taskList && taskList.length > 0 && currentSelection >= 0 ? taskList.map((task, index) => (
                            task.checked == false &&
                            <div
                                key={'task_content_' + index}
                                className={`group/item flex items-center bg-main-primary w-full mb-2 min-h-[32px] h-[32px] max-h-[32px] text-start py-3 px-3 rounded-3xl`}
                            >
                                <input
                                    checked={task.checked || false}
                                    onChange={() => handleCheckboxChange(index)}
                                    id={'task_' + index}
                                    type='checkbox'
                                    className="w-[20px] h-[20px] rounded-3xl focus:rounded-full bg-main-primary border-[#3D3E42] border-2 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                />
                                <input
                                    className="ml-2 w-10/12 bg-[transparent] border-0 focus:ring-0 focus:border-b-2 focus:border-white" 
                                    style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                                    defaultValue={task.header}
                                    onChange={(e) => handleChangeTaskText(e.target.value, index, e)}
                                />
                                <div className="invisible group-hover/item:visible w-1/12 flex justify-end mr-3">
                                    <TrashIcon
                                        onClick={() => handleDeleteTask(index)}
                                        className="h-4 w-4 text-white-500 hover:cursor-pointer"
                                    />
                                </div>
                            </div>
                        )) : <i>no tasks created...</i>
                    }
                </div>
            </ContentBox>
        );
    }
};

export default TodoTasks;
