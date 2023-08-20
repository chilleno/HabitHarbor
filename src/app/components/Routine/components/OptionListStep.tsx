import React, { useState, useEffect, useRef } from 'react';

const OptionListStep: React.ForwardRefRenderFunction<HTMLDivElement, RoutineStepOptionListProps> = ({ stepIndex, onClose, refreshRoutine }) => {
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

    //function that select current step
    const selectCurrentStep = (): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentRoutineStep', stepIndex.toString());
            refreshRoutine();
        }
    }

    //function that delete current step
    const deleteCurrentStep = (): void => {
        if (typeof window !== 'undefined') {
            const currentRoutine = JSON.parse(localStorage.getItem('routine') || '{}');
            currentRoutine.splice(stepIndex, 1);
            localStorage.setItem('routine', JSON.stringify(currentRoutine));
            localStorage.setItem('currentRoutineStep', '0');
            refreshRoutine();
        }
    }


    return (
        <div ref={listRef} className="absolute mt-6 z-50 right-1 bg-main-primary border-2 w-40 rounded-lg shadow-md">
            <div onClick={() => selectCurrentStep()} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Select this step
            </div>
            <div onClick={() => deleteCurrentStep()} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer justify-start flex">
                Delete this step
            </div>
        </div>
    );
};

export default OptionListStep;
