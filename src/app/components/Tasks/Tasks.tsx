"use client"
import React, { useState, useEffect, use } from 'react';
import { CogIcon } from '@heroicons/react/24/solid';
import FloatingButton from '@/app/designComponent/FloatingButton';
import NewTaskListModal from './components/NewTaskListModal';
import OptionList from './components/OptionList';
import TodoTasks from './components/TodoTasks/TodoTasks';
import DoneTasks from './components/DoneTasks/DoneTasks';

const Tasks: React.FC<TaskListProps> = ({ currentTaskListIndex, changeTaskList }) => {
    const [lists, setLists] = useState<TaskList[]>();
    const [currentTaskList, setCurrentTaskList] = useState<Task[]>();
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [updateTaskList, setUpdateTaskList] = useState<boolean>(false);

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

    //function that delete all the done tasks on the current task list
    const deleteAllDoneTasks = (): void => {
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

            setUpdateTaskList(!updateTaskList);
        }
    }

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
        <div className="min-w-full -mt-4 task-list-selector min-h-screen border-x-2 ">
            <div className="fixed w-[48%] py-5 ml-5 bg-[#323333]">
                <div className="flex justify-end mr-10 mt-5">
                    <FloatingButton onClick={() => setShowOptions(!showOptions)}>
                        <span className="flex items-center justify-center hover:cursor-pointer">
                            <CogIcon className="h-[24px] w-[24px] text-white" />
                        </span>
                        {
                            showOptions &&
                            <OptionList
                                openModal={openModal}
                                onClose={() => setShowOptions(false)}
                                currentSelection={currentTaskListIndex}
                                handleChangeTaskList={changeTaskList}
                                renderTaskLists={renderTaskLists}
                            />
                        }
                    </FloatingButton>
                </div>
                <div className="flex justify-center items-center font-bold -mt-6 mb-2">
                    <h1 className="text-white xl:text-xl lg:text-md">Task lists</h1>
                </div>
                <div className="flex justify-center content-center">
                    <select
                        value={currentTaskListIndex}
                        onChange={(e) => changeTaskList(Number(e.target.value))}
                        className="w-3/6 bg-main-primary rounded-xl p-3 content-center focus:ring-0 border-0 justify-center flex text-center italic text-white xl:text-lg lg:text-xs md:text-xs"
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
                </div>
            </div>
            <div className="pt-48 px-12">
                <TodoTasks
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={currentTaskList || []}
                    updateTaskList={updateTaskList}
                    setUpdateTaskList={setUpdateTaskList}
                />

                <DoneTasks
                    currentTaskListIndex={currentTaskListIndex}
                    taskList={currentTaskList || []}
                    updateTaskList={updateTaskList}
                    setUpdateTaskList={setUpdateTaskList}
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
