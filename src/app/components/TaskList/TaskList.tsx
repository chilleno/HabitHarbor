"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import NewTaskListModal from './components/NewTaskListModal';

const TaskList: React.FC<TaskListProps> = ({ currentTaskListIndex, changeTaskList }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [lists, setLists] = useState<TaskList[]>();
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const newTaskRef = useRef<any>(null);
    const [showNewTaskLabel, setShowNewTaskLabel] = useState<boolean>(true);
    const [showCreateTaskInput, setShowCreateTaskInput] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [currentSelection, setCurrentSelection] = useState<number>(-1);


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
            setTaskList(updatedTasks);
            renderTaskLists();
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
            renderTaskLists();
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
                setTaskList(updatedTasks);
                renderTaskLists();
            }
        }
    };

    const handleDeleteTaskList = (): void => {
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to delete the entire task list?')) {
                let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');

                let updatedTaskLists = currentStoredTaskLists.filter((taskList, index) => index !== currentTaskListIndex);

                localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));
                handleChangeTaskList(updatedTaskLists.length - 1)
                renderTaskLists();
            }
        }
    };


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    }

    const renderTaskLists = (): void => {
        const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        setLists(currentTaskLists);
    }

    useEffect(() => {
        handleChangeTaskList(currentTaskListIndex);
    }, [currentTaskListIndex])

    useEffect(() => {
        renderTaskLists();
    }, [])

    useEffect(() => {
        const currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        if (currentStoredTaskLists && currentStoredTaskLists.length > 0) {
            setTaskList(currentStoredTaskLists[currentTaskListIndex].tasks);
            setShowCreateTaskInput(true);
        }
    }, [currentTaskListIndex])

    const handleChangeTaskList = (newValue: number): void => {
        setCurrentSelection(newValue);
        changeTaskList(newValue);
    }

    const handleShowNewTaskInput = (): void => {
        setShowNewTaskLabel(false);
        setTimeout(() => {
            newTaskRef.current.value = 'Create a new task here...';
            newTaskRef.current.focus();
        }, (1))
    }

    const handleHideNewTaskInput = (): void => {
        setShowNewTaskLabel(true);
    }

    const handleInputError = (): void => {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, (1000))
    }

    const addNewTask = (newTask: string): void => {
        if (newTask.length <= 3 || newTask === "Create a new task here...") {
            return handleInputError();
        }

        if (typeof window !== 'undefined') {
            let newTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (newTaskLists.length > 0) {
                let newTaskObject: Task = {
                    "header": newTask,
                    "checked": false,
                    "subtasks": [],
                }
                newTaskLists[currentTaskListIndex].tasks.push(newTaskObject);

                localStorage.setItem('taskLists', JSON.stringify(newTaskLists));

                setTaskList(newTaskLists[currentTaskListIndex].tasks);
                setLists(newTaskLists);

                setTimeout(() => {
                    newTaskRef.current.value = '';
                    newTaskRef.current.focus();
                }, (1))
            } else {
                window.alert('You need to create a new list first.')
            }
        }
    }

    const handlePressEnterButton = (event: any) => {
        if (event.key === 'Enter') {
            addNewTask(event.target.value);
        }
    }

    return (
        <>
            {showModal && (
                <NewTaskListModal
                    closeModal={closeModal}
                    renderList={renderTaskLists}
                    handleChangeTaskList={handleChangeTaskList}
                />
            )}
            <div className="flex p-5">
                <h1 className="flex w-1/2 justify-end text-white xl:text-4xl lg:text-3xl sm:text2xl font-bold underline underline-offset-7">
                    Task List
                </h1>

            </div>
            <div className="flex content-center justify-center">
                <div className="w-3/6 border-2 rounded-xl relative after:content-['▼'] after:right-5 after:top-3 after:text-white after:absolute after:pointer-events-none">
                    <select
                        className="w-[100%] p-3 text-main-primary text-xl bg-transparent appearance-none"
                        value={currentSelection}
                        onChange={(e) => handleChangeTaskList(Number(e.target.value))}
                    >
                        <option disabled value={-1}>
                            No task list selected
                        </option>
                        {
                            lists &&
                            lists.length > 0 &&
                            lists.map((list, index) => (
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
                <div className='flex xl:w-1/6 lg:w-2/6 md:w-2/6 justify-start ml-5 mt-auto mb-auto'>
                    <PlusIcon
                        onClick={openModal}
                        className="flex h-10 w-10 text-white-500 hover:cursor-pointer mr-5"
                    />
                    {
                        currentSelection >= 0 &&
                        <>
                            <PencilIcon
                                onClick={() => setEditMode(!editMode)}
                                className={`flex h-7 w-7 text-white-500 hover:cursor-pointer mt-2 mr-5 ${editMode === true && 'border-0 border-b-4 border-white'}`}
                            />
                            <TrashIcon
                                onClick={() => handleDeleteTaskList()}
                                className={`flex h-7 w-7 text-white-500 hover:cursor-pointer mt-2 mr-5`}
                            />
                        </>
                    }
                </div>
            </div >
            {
                <div className="flex flex-col h-screen max-h-[80%] overflow-y-auto -z-50 pt-5">
                    <div className={`flex items-center`} style={currentSelection === -1 || editMode || showCreateTaskInput === false ? { display: 'none' } : {}} >
                        <input
                            checked={false}
                            onChange={(e) => e.preventDefault()}
                            type='checkbox'
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label
                            hidden={!showNewTaskLabel}
                            className="ml-2 text-gray-500"
                            onClick={handleShowNewTaskInput}
                        >
                            <i>Create a new task here...</i>
                        </label>
                        <input
                            hidden={showNewTaskLabel}
                            ref={newTaskRef}
                            id="newTaskInput"
                            type='text'
                            onFocus={(e) => e.target.select()}
                            onBlur={handleHideNewTaskInput}
                            onKeyDown={handlePressEnterButton}
                            className={`ml-3 bg-transparent text-white ${showError && 'shake-error'}`}
                            defaultValue={'Create a new task here...'}
                        />
                    </div>

                    <b className={`ml-5 mt-2 mb-2 text-red-600 transition-opacity duration-150 ${showError ? 'opacity-100' : 'opacity-0'}`}>
                        <i>Please add a text longer than 3 characters.</i>
                    </b>

                    {
                        !editMode && taskList && taskList.length > 0 && currentSelection >= 0 ? taskList.map((task, index) => (
                            task.checked == false &&
                            <div
                                key={'task_content_' + index}
                                className={`flex items-center}`}
                            >
                                <input
                                    checked={task.checked || false}
                                    onChange={() => handleCheckboxChange(index)}
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
                        )) : null
                    }

                    {
                        !editMode && taskList && taskList.length > 0 && currentSelection >= 0 ? taskList.map((task, index) => (
                            task.checked === true ?
                                <div
                                    key={'task_content_' + index}
                                    className={`flex items-center}`}
                                >
                                    <input
                                        checked={task.checked || false}
                                        onChange={() => handleCheckboxChange(index)}
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
                                : null
                        )) : null
                    }

                    {
                        editMode && taskList && taskList.length > 0 && currentSelection >= 0 ? taskList.map((task, index) => (
                            <div
                                key={'task_content_' + index}
                                className={`flex items-center pb-1 justify-start`}
                            >
                                <TrashIcon
                                    onClick={() => handleDeleteTask(index)}
                                    className="h-4 w-4 text-white-500 hover:cursor-pointer mr-3"
                                />
                                <input
                                    className={`ml-2 text-white bg-transparent border-b-2 w-3/6`}
                                    style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                                    type="text"
                                    defaultValue={task.header}
                                    onBlur={(e) => handleChangeTaskText(e.target.value, index, e)}
                                />
                            </div>
                        )) : (editMode && taskList && taskList.length === 0 && <i className="text-gray-500 underline font-bold">No tasks to edit ...</i>)
                    }

                </div>
            }
        </>
    );
};

export default TaskList;
