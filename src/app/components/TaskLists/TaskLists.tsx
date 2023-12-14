import React, { useState, useEffect, useRef, use } from 'react';
import { CheckIcon, XMarkIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from "react-tooltip";
import NewTaskListModal from './components/NewTaskListModal';
import useSound from 'use-sound';


const TaskLists: React.FC<TaskListsProps> = ({ updateTaskList, currentTaskList, changeTaskList }) => {
    const [lists, setLists] = useState<TaskList[]>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTaskListName, setNewTaskListName] = useState<string>('');

    //sfx
    const [switchListSound, { stop: stopSwitchListSound }] = useSound('/static/sounds/changeList.wav');

    const handleChangeTaskList = (index: number): void => {
        changeTaskList(index);
        stopSwitchListSound();
        switchListSound();
    }

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
                let updatedTaskLists = currentStoredTaskLists.filter((taskList, index) => index !== currentTaskList);

                localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));

                //check if the current task list index is the assignedTaskList of any routine step on localStorage
                let localStorageRoutine = JSON.parse(localStorage.getItem('routines') || '[]');
                let updatedLocalStorageRoutine = localStorageRoutine.map((routine) => {
                    routine.steps = routine.steps.map((step) => {
                        if (step.assignedTaskList === currentTaskList) {
                            step.assignedTaskList = -1;
                        }
                        return step;
                    });
                    return routine;
                });
                localStorage.setItem('routines', JSON.stringify(updatedLocalStorageRoutine));

                const eventRoutineChanged = new CustomEvent('routinedatachanged') as any;
                document.dispatchEvent(eventRoutineChanged);

                const eventTasnkListChanged = new CustomEvent('taskListdatachanged') as any;
                document.dispatchEvent(eventTasnkListChanged);

                renderTaskLists();
                changeTaskList(updatedTaskLists.length - 1);
            }
        }
    };

    const editTaskListName = (value: string): void => {
        //check if the value length is greater than 3 and alert the user
        if (value.length < 3) {
            alert('the task list name must be at least 3 characters long');
            return;
        }
        if (typeof window !== 'undefined') {
            let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            currentStoredTaskLists[currentTaskList].name = value;
            localStorage.setItem('taskLists', JSON.stringify(currentStoredTaskLists));

            // fired custom event on localStorage data changed
            const event = new CustomEvent('taskListdatachanged') as any;
            document.dispatchEvent(event);

            renderTaskLists();
            handleEditMode();
        }
    }

    const handleEditMode = (): void => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        renderTaskLists();
    }, []);

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
                    <button className="h-[18px] w-[18px]" data-tooltip-id="editCurrentTaskListFromSidebar" onClick={() => handleEditMode()}>
                        <PencilIcon className="h-[18px] w-[18px]" />
                    </button>
                    <button className="h-[18px] w-[18px]" data-tooltip-id="removeCurrentTaskListFromSidebar" onClick={() => handleDeleteTaskList()}>
                        <TrashIcon className="h-[18px] w-[18px]" />
                    </button>
                    <ReactTooltip
                        id="addNewTaskListFromSidebar"
                        place="bottom"
                        content="Create a new task list"
                    />
                    <ReactTooltip
                        id="removeCurrentTaskListFromSidebar"
                        place="bottom"
                        content="Delete selected task list"
                    />
                    <ReactTooltip
                        id="editCurrentTaskListFromSidebar"
                        place="bottom"
                        content="Edit selected task list"
                    />
                </div>
            </div>
            <div className="flex flex-col py-5 list-disc w-full gap-1 max-h-[90%] overflow-y-auto">
                {
                    lists &&
                    lists.length > 0 &&
                    lists.map((list, index) => (
                        index === currentTaskList && editMode ?
                            <div
                                key={'task_list_' + index}
                                defaultValue={list.name}
                                className={"flex py-1 px-3 rounded-xl text-black w-full"}
                                onClick={() => index !== currentTaskList && changeTaskList(index)}
                            >
                                <input className="w-9/12 rounded-3xl" type="text" defaultValue={list.name} onChange={(e) => setNewTaskListName(e.target.value)} />
                                <div className="w-3/12 gap-2 flex items-center justify-center">
                                    <button data-tooltip-id="cancelEditCurrentTaskList" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-[green] opacity-80 hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-opacity-100 hover:text-white" onClick={() => editTaskListName(newTaskListName)}>
                                        <CheckIcon className="h-[24px] w-[24px]" />
                                    </button>
                                    <button data-tooltip-id="cancelEditCurrentTaskListSidebar" className="h-9 w-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border bg-[red] bg-opacity-80 hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:bg-opacity-100 hover:text-white" onClick={handleEditMode}>
                                        <XMarkIcon className="h-[24px] w-[24px]" />
                                    </button>
                                    <ReactTooltip
                                        id="cancelEditCurrentTaskListSidebar"
                                        place="bottom"
                                        content="Cancel edit mode"
                                    />
                                </div>
                            </div>
                            :
                            <div
                                key={'task_list_' + index}
                                className={"before:content-['•'] flex py-1 px-3 hover:cursor-pointer hover:bg-gray hover:font-bold rounded-xl " + (currentTaskList === index ? "font-bold bg-gray " : "text-gray-400 ") + (editMode && "opacity-50")}
                                onClick={() => index !== currentTaskList && (!editMode && handleChangeTaskList(index))}
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