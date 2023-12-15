import React, { useState, useEffect, useRef } from 'react';



const OptionList: React.FC<TasksCreationOptionList> = ({ openPrioritizeModal, handleMoveTaskMode, deleteAllDoneTasks, deleteAllTasks }) => {
    const listRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={listRef} className="absolute mt-6 -ml-40 bg-main-primary border-2 w-50 rounded-lg shadow-md">
            <div onClick={openPrioritizeModal} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Prioritize tasks
            </div>
            <div onClick={handleMoveTaskMode} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Move tasks
            </div>
            <div onClick={deleteAllDoneTasks} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Delete finished tasks
            </div>
            <div onClick={deleteAllTasks} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Delete ALL tasks
            </div>
        </div>
    );
};

export default OptionList;
