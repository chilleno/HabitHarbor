import React, { useState, useEffect, useRef } from 'react';

const OptionList: React.ForwardRefRenderFunction<HTMLDivElement, DoneTasksOptionListProps> = ({ onClose, deleteAllDoneTasks }) => {
    const listRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

   
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={listRef} className="absolute mt-6 ml-36 bg-main-primary border-2 w-50 rounded-lg shadow-md z-50">
            <div onClick={deleteAllDoneTasks} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                delete all done tasks
            </div>
        </div>
    );
};

export default OptionList;
