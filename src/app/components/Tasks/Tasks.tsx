"use client"
import React, { useState, useEffect } from 'react';
import { CheckIcon, PencilIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import NewTaskListModal from './components/NewTaskListModal';
import MoveTasks from './components/MoveTasks';
import TodoTasks from './components/TodoTasks';
import DoneTasks from './components/DoneTasks';
import CreateTask from './components/CreateTask';
import { Tooltip as ReactTooltip } from "react-tooltip";
import InputText from '@/app/designComponent/form/InputText';
import { useSession } from "next-auth/react"
import { saveTasks } from '../PostRequests/PostRequests'
import 'react-tooltip/dist/react-tooltip.css';

const Tasks: React.FC<TaskListProps> = ({ taskList, currentTaskListIndex, changeTaskList, updateTaskList, setUpdateTaskList }) => {
    const [lists, setLists] = useState<TaskList[]>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [highlightedTask, setHighlightedTask] = useState<number | null>(null);
    const [editModeTaskList, setEditModeTaskList] = useState<boolean>(false);
    const [newCurrentTaskListName, setNewCurrentTaskListName] = useState<string>('');
    const [moveTasksMode, setMoveTasksMode] = useState<boolean>(false);
    const { data: session } = useSession()

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const renderTaskLists = (): void => {
        const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        setLists(currentTaskLists);
    }

    const handleDeleteTaskList = (): void => {
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to delete the entire task list?')) {
                let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
                let updatedTaskLists = currentStoredTaskLists.filter((taskList, index) => index !== currentTaskListIndex);

                localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));

                //check if the current task list index is the assignedTaskList of any routine step on localStorage
                let localStorageRoutine = JSON.parse(localStorage.getItem('routines') || '[]');
                let updatedLocalStorageRoutine = localStorageRoutine.map((routine) => {
                    routine.steps = routine.steps.map((step) => {
                        if (step.assignedTaskList === currentTaskListIndex) {
                            step.assignedTaskList = -1;
                        }
                        return step;
                    });
                    return routine;
                });
                localStorage.setItem('routines', JSON.stringify(updatedLocalStorageRoutine));

                //save in database
                saveTasks(session);

                renderTaskLists();
                changeTaskList(updatedTaskLists.length - 1);
            }
        }
    };

    const editTaskListName = (value: string): void => {
        if (typeof window !== 'undefined') {
            let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            currentStoredTaskLists[currentTaskListIndex].name = value;
            localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));

            //save in database
            saveTasks(session);

            renderTaskLists();
        }
    }

    const handleEditTaskListName = () => {
        // validate if task list name length is greater than 3 characters
        if (newCurrentTaskListName.length <= 3) {
            if (typeof window !== 'undefined') {
                alert('task list name must be greater than 3 characters');
            }
            return;
        }
        //if the task list name is the same as the current task list name then do nothing and exit edit mode
        if (lists && newCurrentTaskListName === lists[currentTaskListIndex].name) {
            setEditModeTaskList(false);
            return;
        }

        //confirm if user wants to edit task list name
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to edit the task list name?')) {
                editTaskListName(newCurrentTaskListName);
                setEditModeTaskList(false);
            }
        }
    }

    const handleMoveTasksMode = () => {
        setMoveTasksMode(!moveTasksMode);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let localStorageTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (localStorageTaskLists.length > 0) {
                setHighlightedTask(localStorageTaskLists[currentTaskListIndex].highlightedTask);
            }
        }
    }, [currentTaskListIndex]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let localStorageTaskLists: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
            if (localStorageTaskLists.length > 0) {
                localStorageTaskLists[currentTaskListIndex].highlightedTask = highlightedTask;
                localStorage.setItem('taskLists', JSON.stringify(localStorageTaskLists));

                //save in database
                saveTasks(session);
            }
        }
    }, [highlightedTask]);

    useEffect(() => {
        renderTaskLists();
    }, []);

    useEffect(() => {
        renderTaskLists();
    }, [updateTaskList]);

    return (
        <div className="task-list-selector min-h-screen flex-1">
            <div className="flex-1 w-full bg-[#323333] border-b-2 border-gray z-40">
                {
                    !true && <div className="flex flex-grid justify-center items-center font-bold py-4 border-b-2 border-gray gap-5">
                        <h1 className="text-white xl:text-xl lg:text-md xl:w-2/12 lg:w-2/12">Task lists </h1>
                        {
                            editModeTaskList === false ? (
                                <>
                                    <div className="xl:w-6/12 lg:w-5/12">
                                        <select
                                            disabled={moveTasksMode}
                                            value={currentTaskListIndex}
                                            onChange={(e) => changeTaskList(Number(e.target.value))}
                                            className="w-full h-[50px] py-3 px-8 bg-main-primary rounded-3xl content-center focus:ring-0 border-0 justify-center flex text-center italic text-white xl:text-lg lg:text-xs md:text-xs"
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
                                    <div className="xl:w-2/12 lg:w-3/12 gap-3 flex justify-center">
                                        {
                                            moveTasksMode === false &&
                                            <>
                                                <button data-tooltip-id="addNewTaskList" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => openModal()}>
                                                    <PlusIcon className="h-[24px] w-[24px]" />
                                                </button>
                                                <button data-tooltip-id="editCurrentTaskList" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => setEditModeTaskList(true)}>
                                                    <PencilIcon className="h-[24px] w-[24px]" />
                                                </button>
                                                <button data-tooltip-id="removeCurrentTaskList" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => handleDeleteTaskList()}>
                                                    <TrashIcon className="h-[24px] w-[24px]" />
                                                </button>

                                                <ReactTooltip
                                                    id="addNewTaskList"
                                                    place="bottom"
                                                    content="Create a new task list"
                                                />
                                                <ReactTooltip
                                                    id="removeCurrentTaskList"
                                                    place="bottom"
                                                    content="Delete selected task list"
                                                />
                                                <ReactTooltip
                                                    id="editCurrentTaskList"
                                                    place="bottom"
                                                    content="Edit selected task list"
                                                />
                                            </>
                                        }
                                    </div>
                                </>
                            )
                                :
                                <>
                                    <div className="w-6/12">
                                        <InputText
                                            placeholder="Type and press enter to create a task..."
                                            id="editTaskListInput"
                                            onChange={(value) => setNewCurrentTaskListName(value)}
                                            className="w-full h-[50px] py-3 px-8 focus:ring-0 focus:border-main-primary xl:text-lg lg:text-xs md:text-xs"
                                            defaultValue={lists && lists[currentTaskListIndex].name}
                                            name="task-list-name-new"
                                        />

                                    </div>
                                    <div className="w-2/12 gap-3 flex justify-center">
                                        <button data-tooltip-id="cancelEditCurrentTaskList" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => handleEditTaskListName()}>
                                            <CheckIcon className="h-[24px] w-[24px]" />
                                        </button>
                                        <button data-tooltip-id="cancelEditCurrentTaskList" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => setEditModeTaskList(false)}>
                                            <XMarkIcon className="h-[24px] w-[24px]" />
                                        </button>

                                        <ReactTooltip
                                            id="cancelEditCurrentTaskList"
                                            place="bottom"
                                            content="Cancel edit mode"
                                        />
                                    </div>
                                </>
                        }
                    </div>
                }
                <CreateTask
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={taskList}
                    updateTaskList={updateTaskList}
                    setUpdateTaskList={setUpdateTaskList}
                    highlightedTask={highlightedTask}
                    setHighlightedTask={setHighlightedTask}
                    handleMoveTaskMode={handleMoveTasksMode}
                    moveTasksMode={moveTasksMode}
                    lists={lists}
                />
            </div>
            <div className={"py-2 px-12"}>
                {
                    moveTasksMode === false &&
                    <>
                        <TodoTasks
                            currentTaskListIndex={currentTaskListIndex}
                            taskList={taskList}
                            updateTaskList={updateTaskList}
                            setUpdateTaskList={setUpdateTaskList}
                            highlightedTask={highlightedTask}
                            setHighlightedTask={setHighlightedTask}
                            handleMoveTaskMode={handleMoveTasksMode}
                            moveTasksMode={moveTasksMode}
                        />
                        <DoneTasks
                            currentTaskListIndex={currentTaskListIndex}
                            taskList={taskList}
                            updateTaskList={updateTaskList}
                            setUpdateTaskList={setUpdateTaskList}
                            highlightedTask={highlightedTask}
                            setHighlightedTask={setHighlightedTask}
                            handleMoveTaskMode={handleMoveTasksMode}
                            moveTasksMode={moveTasksMode}
                        />
                    </>
                }

                {
                    moveTasksMode === true &&
                    <MoveTasks
                        currentTaskListIndex={currentTaskListIndex}
                        taskList={taskList}
                        updateTaskList={updateTaskList}
                        setUpdateTaskList={setUpdateTaskList}
                        highlightedTask={highlightedTask}
                        setHighlightedTask={setHighlightedTask}
                        handleMoveTaskMode={handleMoveTasksMode}
                        moveTasksMode={moveTasksMode}
                    />
                }
            </div>
            {showModal && (
                <NewTaskListModal
                    closeModal={closeModal}
                    renderList={renderTaskLists}
                    handleChangeTaskList={changeTaskList}
                />
            )}
        </div>
    );
};

export default Tasks;
