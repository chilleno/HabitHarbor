import React, { useState, useEffect, useRef, use } from 'react';
import { ArrowPathIcon, ArrowsRightLeftIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import ContentBox from '../../designComponent/ContentBox';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from "react-tooltip";
import NewTaskListModal from './components/NewTaskListModal';

const TaskLists: React.FC<TaskListsProps> = ({ updateTaskList, currentTaskList, changeTaskList }) => {
    const [lists, setLists] = useState<TaskList[]>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        renderTaskLists();
    }, []);

    const renderTaskLists = (): void => {
        const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        setLists(currentTaskLists);
    }

    return (
        <div className="w-full px-2">
            <div className="flex justify-center font-bold gap-3">
                <div className="text-white xl:text-xl lg:text-md md:tex-md w-7/12 justify-start flex">
                    <h1 className="text-white xl:text-xl lg:text-md md:tex-md">Task Lists</h1>
                </div>
                <div className="flex justify-end w-4/12 gap-5 z-50">
                    <button className="h-[18px] w-[18px]" data-tooltip-id="addNewTaskListFromSidebar" onClick={() => openModal()}>
                        <PlusIcon className="h-[18px] w-[18px]" />
                    </button>
                    <ReactTooltip
                        id="addNewTaskListFromSidebar"
                        place="bottom"
                        content="Create a new task list"
                    />
                </div>
            </div>
            <div className="flex flex-col py-5 list-disc w-full gap-1">
                {
                    lists &&
                    lists.length > 0 &&
                    lists.map((list, index) => (
                        <div
                            key={'task_list_' + index}
                            className={"before:content-['>'] flex py-1 px-3 hover:cursor-pointer hover:bg-gray hover:font-bold rounded-xl " + (currentTaskList === index ? "font-bold bg-gray" : "text-gray-400")}
                            onClick={() => index !== currentTaskList && changeTaskList(index)}
                        >
                            <div className="flex flex-row">
                                &nbsp;&nbsp;{list.name}
                            </div>
                            <div className="flex flex-col">

                            </div>
                        </div>
                    ))
                }
            </div>
            {showModal && (
                <NewTaskListModal
                    closeModal={closeModal}
                    renderList={renderTaskLists}
                    handleChangeTaskList={updateTaskList}
                />
            )}
        </div>
    );
};

export default TaskLists;