"use client"
import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import NewTaskListModal from './components/NewTaskListModal';
import TodoTasks from './components/TodoTasks';
import DoneTasks from './components/DoneTasks';
import CreateTask from './components/CreateTask';

const Tasks: React.FC<TaskListProps> = ({ currentTaskListIndex, changeTaskList }) => {
    const [lists, setLists] = useState<TaskList[]>();
    const [currentTaskList, setCurrentTaskList] = useState<Task[]>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [updateTaskList, setUpdateTaskList] = useState<boolean>(false);
    const [highlightedTask, setHighlightedTask] = useState<number | null>(null);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const renderTaskLists = (): void => {
        const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        setLists(currentTaskLists);
        setCurrentTaskList(currentTaskLists[currentTaskListIndex]);
    }

    const handleDeleteTaskList = (): void => {
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to delete the entire task list?')) {
                let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
                let updatedTaskLists = currentStoredTaskLists.filter((taskList, index) => index !== currentTaskListIndex);

                localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));

                // fired custom event on localStorage data changed
                const event = new CustomEvent('taskListdatachanged') as any;
                document.dispatchEvent(event);

                renderTaskLists();
                changeTaskList(updatedTaskLists.length - 1);
            }
        }
    };

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

                // fired custom event on localStorage data changed
                const event = new CustomEvent('tasksdatachanged') as any;
                document.dispatchEvent(event);
            }
        }
    }, [highlightedTask]);

    useEffect(() => {
        renderTaskLists();
    }, []);

    useEffect(() => {
        const storedTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        if (storedTaskLists && storedTaskLists.length > 0 && currentTaskListIndex >= 0) {
            setCurrentTaskList([]);
            setTimeout(() => {
                setCurrentTaskList(storedTaskLists[currentTaskListIndex].tasks);
            }, 1);
        }
    }, [updateTaskList])

    useEffect(() => {
        if (lists && lists.length > 0 && currentTaskListIndex >= 0) {
            setCurrentTaskList(lists[currentTaskListIndex]?.tasks || []);
        }
    }, [currentTaskListIndex])

    return (
        <div className="min-w-full task-list-selector min-h-screen">
            <div className="fixed min-w-[50%] bg-[#323333] border-b-2 border-gray">
                <div className="flex justify-center items-center font-bold py-4">
                    <h1 className="text-white xl:text-xl lg:text-md">Task lists</h1>
                </div>
                <div className="flex justify-center content-center items-center gap-2">
                    <select
                        value={currentTaskListIndex}
                        onChange={(e) => changeTaskList(Number(e.target.value))}
                        className="w-6/12 bg-main-primary rounded-xl p-3 content-center focus:ring-0 border-0 justify-center flex text-center italic text-white xl:text-lg lg:text-xs md:text-xs"
                    >
                        <option value={-1}>
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
                    <button className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => openModal()}>
                        <PlusIcon className="h-[24px] w-[24px]" />
                    </button>
                    <button className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-white hover:text-black" onClick={() => handleDeleteTaskList()}>
                        <TrashIcon className="h-[24px] w-[24px]" />
                    </button>
                </div>
                <CreateTask
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={currentTaskList || []}
                    updateTaskList={updateTaskList}
                    setUpdateTaskList={setUpdateTaskList}
                    highlightedTask={highlightedTask}
                    setHighlightedTask={setHighlightedTask}
                />
            </div>
            <div className="xl:pt-[21%] lg:pt-[26%] px-12">
                <TodoTasks
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={currentTaskList || []}
                    updateTaskList={updateTaskList}
                    setUpdateTaskList={setUpdateTaskList}
                    highlightedTask={highlightedTask}
                    setHighlightedTask={setHighlightedTask}
                />
                <DoneTasks
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={currentTaskList || []}
                    updateTaskList={updateTaskList}
                    setUpdateTaskList={setUpdateTaskList}
                    highlightedTask={highlightedTask}
                    setHighlightedTask={setHighlightedTask}
                />
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
