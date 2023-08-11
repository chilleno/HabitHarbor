import React, { useState, useEffect, useRef } from 'react';

const OptionList: React.ForwardRefRenderFunction<HTMLDivElement, TaskListOptionListProps> = ({ onClose, openModal, currentSelection, handleChangeTaskList, renderTaskLists }) => {
    const listRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleDeleteTaskList = (): void => {
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to delete the entire task list?')) {
                let currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
                let updatedTaskLists = currentStoredTaskLists.filter((taskList, index) => index !== currentSelection);

                localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));

                handleChangeTaskList(updatedTaskLists.length - 1);
                renderTaskLists();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={listRef} className="absolute mt-6 ml-36 bg-main-primary border-2 w-50 rounded-lg shadow-md">
            <div onClick={openModal} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                New task list
            </div>
            {
                currentSelection >= 0 &&
                <div onClick={() => handleDeleteTaskList()} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                    Delete current task list
                </div>
            }
        </div>
    );
};

export default OptionList;
