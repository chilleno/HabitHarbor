"use client"
import React, { useState, useEffect } from 'react';
import { CogIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import ContentBox from '../../designComponent/ContentBox';
import FloatingButton from '@/app/designComponent/FloatingButton';
import NewTaskListModal from './components/NewTaskListModal';
import OptionList from './components/OptionList';

const TaskListSelector: React.FC<TaskListProps> = ({ currentTaskListIndex, changeTaskList }) => {
    const [lists, setLists] = useState<TaskList[]>();
    const [currentSelection, setCurrentSelection] = useState<number>(-1);
    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const handleChangeTaskList = (newValue: number): void => {
        setCurrentSelection(newValue);
        changeTaskList(newValue);
    }

    useEffect(() => {
        renderTaskLists();
        setInitialRenderComplete(true);
    }, []);

    useEffect(() => {
        handleChangeTaskList(currentTaskListIndex);
    }, [currentTaskListIndex])

    const renderTaskLists = (): void => {
        const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
        setLists(currentTaskLists);
    }

    if (!initialRenderComplete) {
        return null;
    } else {
        return (
            <ContentBox className="min-w-full -mt-4">
                <div className="flex justify-end -mr-12 -mt-8">
                    <FloatingButton onClick={() => setShowOptions(!showOptions)}>
                        <span className="flex items-center justify-center hover:cursor-pointer">
                            <CogIcon className="h-[24px] w-[24px] text-white-500" />
                        </span>
                        {
                            showOptions &&
                            <OptionList
                                openModal={openModal}
                                onClose={() => setShowOptions(false)}
                                currentSelection={currentSelection}
                                handleChangeTaskList={handleChangeTaskList}
                                renderTaskLists={renderTaskLists}
                            />
                        }
                    </FloatingButton>
                </div>
                <div className="flex justify-center items-center font-bold -mt-6 mb-2">
                    <h1>Task lists</h1>
                </div>
                <div className="flex justify-center content-center">
                    <select
                        value={currentSelection}
                        onChange={(e) => handleChangeTaskList(Number(e.target.value))}
                        className="w-3/6 bg-main-primary rounded-xl p-3 content-center focus:ring-0 border-0 justify-center flex text-center italic"
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
                {showModal && (
                    <NewTaskListModal
                        closeModal={closeModal}
                        renderList={renderTaskLists}
                        handleChangeTaskList={handleChangeTaskList}
                    />
                )}
            </ContentBox>
        );
    }
};

export default TaskListSelector;
