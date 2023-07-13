"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import NewTaskListModal from './components/NewTaskListModal';

interface Task {
    header: string;
    checked: boolean;
    subtasks: any[];
}

interface TaskListProps {
    currentTaskListIndex: number;
    nextTaskList(): void;
    previousTaskList(): void;
    changeTaskList(taskListIndex: number): void;
}

interface TaskList {
    name: string;
    tasks: Task[];
}


const TaskList: React.FC<TaskListProps> = ({ currentTaskListIndex, previousTaskList, nextTaskList, changeTaskList }) => {
    const [renderList, setRenderList] = useState<boolean>(false);
    const [lists, setLists] = useState<TaskList[]>();
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const newTaskRef = useRef<any>(null);
    const [showNewTaskLabel, setShowNewTaskLabel] = useState<boolean>(true);
    const [showCreateTaskInput, setShowCreateTaskInput] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);


    const handleCheckboxChange = (taskIndex: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (typeof window !== 'undefined') {
            const currentCookieTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');


            const updatedTasks = taskList.map((task, index) => {
                if (index === taskIndex) {
                    return {
                        ...task,
                        checked: !task.checked
                    };
                }
                return task;
            });
            currentCookieTaskLists[currentTaskListIndex].tasks = updatedTasks;
            localStorage.setItem('taskLists', JSON.stringify(currentCookieTaskLists));
            setTaskList(updatedTasks);
            renderTaskLists();
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
        renderTaskLists();
    }, [])

    useEffect(() => {
        const currentCookieTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        if (currentCookieTaskLists && currentCookieTaskLists.length > 0) {
            setTaskList(currentCookieTaskLists[currentTaskListIndex].tasks);
            setShowCreateTaskInput(true);
        }
    }, [currentTaskListIndex])

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
                        className="w-[100%] p-3 text-white text-xl bg-transparent appearance-none"
                        defaultValue={lists && lists.length > 0 ? currentTaskListIndex : 'error'}
                        onChange={(e) => changeTaskList(Number(e.target.value))}
                    >
                        {
                            lists &&
                                lists.length > 0 ?
                                lists.map((list, index) => (
                                    <option
                                        key={'task_list_' + index}
                                        value={index}
                                    >
                                        {list.name}
                                    </option>
                                ))
                                :
                                <option value={'error'} disabled>
                                    No task list are created
                                </option>
                        }
                    </select>
                </div>
                <div className='flex w-1/6 justify-start ml-5 mt-auto mb-auto'>
                    <PlusIcon
                        onClick={openModal}
                        className="h-10 w-10 text-white-500 hover:cursor-pointer mr-5"
                    />
                </div>

            </div >
            {
                <div className="flex flex-col h-screen max-h-[80%] overflow-y-auto -z-50 pt-5">
                    <div className={`flex items-center`} style={showCreateTaskInput === false ? { display: 'none' } : {}} >
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
                        taskList && taskList.length > 0 ? taskList.map((task, index) => (
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
                        taskList && taskList.length > 0 ? taskList.map((task, index) => (
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

                </div>
            }
        </>
    );
};

export default TaskList;
