import React, { useState, useEffect, useRef } from 'react';

const OptionList: React.ForwardRefRenderFunction<HTMLDivElement, RoutineOptionListProps> = ({ resetCurrentStep, onClose, openModal }) => {
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
        <div ref={listRef} className="absolute mt-6 ml-28 bg-main-primary border-2 w-50 rounded-lg shadow-md">
            <div onClick={openModal} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                New step
            </div>
            <div onClick={() => resetCurrentStep(true)} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Reset Routine
            </div>
        </div>
    );
};

export default OptionList;
