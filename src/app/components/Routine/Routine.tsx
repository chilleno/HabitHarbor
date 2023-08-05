import React, { useState, useEffect, useRef } from 'react';
import { ArcherContainer, ArcherElement, } from 'react-archer';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import NewRoutineStepModal from './components/NewRoutineStepModal';

const Routine: React.FC<RoutineProps> = ({ setUpdateRoutineStep, updateRoutineStep, currentTaskIndex }) => {
    const [routine, setRoutine] = useState<Step[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleDeleteStep = (): void => {
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to delete the step?')) {
                let currentRoutine = routine;
                let updatedRoutine = currentRoutine.filter((step, index) => index !== currentStep);
                localStorage.setItem('routine', JSON.stringify(updatedRoutine));
                setCurrentStep(updatedRoutine.length > 0 ? updatedRoutine.length - 1 : null)
                renderRoutine();
            }
        };
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    }

    const renderRoutine = (): void => {
        const currentRoutine = JSON.parse(localStorage.getItem('routine') || '[]');
        setRoutine(currentRoutine);
    }

    const getCurrentStep = (): void => {
        const currentStep = Number(localStorage.getItem('currentRoutineStep') || 0);
        setCurrentStep(currentStep > 0 ? currentStep : null);
    }

    const getTaskListByIndex = (index: number): string => {
        let currentLocalStorageTaskList = JSON.parse(localStorage.getItem('taskLists') || '[]');
        if(currentLocalStorageTaskList[index] !== undefined){
            return currentLocalStorageTaskList[index].name;
        } else {
            return 'No Task List';
        }
    }

    useEffect(() => {
        renderRoutine();
        getCurrentStep()
    }, [updateRoutineStep]);

    useEffect(() => {
        const currentTaskRef = taskRefs.current[currentTaskIndex];
        if (currentTaskRef) {
            currentTaskRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentTaskIndex]);


    return (
        <>
            {
                showModal && (
                    <NewRoutineStepModal
                        closeModal={closeModal}
                        setUpdateRoutineStep={setUpdateRoutineStep}
                        updateRoutineStep={updateRoutineStep}
                    />
                )
            }
            <div className="flex flex-col justify-center content-center p-5 gap-5">
                <h1 className="text-white xl:text-4xl lg:text-3xl sm:text2xl font-bold underline underline-offset-7 flex justify-center">
                    Daily Routine
                </h1>
                <div className='flex w-full justify-center ml-5 mt-auto mb-auto'>
                    <PlusIcon
                        onClick={openModal}
                        className="h-10 w-10 text-white-500 hover:cursor-pointer mr-5"
                    />
                    {
                        currentStep !== null &&
                        <>
                            <PencilIcon
                                onClick={() => setEditMode(!editMode)}
                                className={`h-7 w-7 text-white-500 hover:cursor-pointer mt-2 mr-5 ${editMode === true && 'border-0 border-b-4 border-white'}`}
                            />
                            <TrashIcon
                                onClick={() => handleDeleteStep()}
                                className={`h-7 w-7 text-white-500 hover:cursor-pointer mt-2 mr-5`}
                            />
                        </>
                    }
                </div>
            </div>
            <div className="flex flex-col h-screen max-h-fit -z-50 overflow-y-auto sm:max-h-[100%] pt-5">
                <ArcherContainer>
                    <div className="flex flex-col items-center">
                        {routine.map((step, index) => (
                            <ArcherElement
                                key={'step_arrow_' + index}
                                id={step.order.toString()}
                                relations={(step.order + 1) < routine.length ? [
                                    {
                                        targetId: (step.order + 1).toString(),
                                        targetAnchor: 'top',
                                        sourceAnchor: 'bottom',
                                        style: { strokeColor: 'white', strokeWidth: 5, endMarker: false, noCurves: true, },
                                    },
                                ] : []}
                            >
                                <div
                                    key={'step_box_' + index}
                                    className={`flex h-20 w-5/6 border border-gray-100 rounded-md mb-4 cursor-pointer ${index === currentStep && 'bg-blue-200'}`}
                                    ref={(ref) => {
                                        taskRefs.current[index] = ref;
                                    }}
                                >
                                    <div className='w-4/6 flex justify-center items-center p-3'>
                                        <h6 className="font-bold text-md justify-center flex">{step.header}</h6>
                                    </div>
                                    <div className='w-2/6 flex-col border-l-2'>
                                        <div className="border-b-2 h-1/2 p-1 flex justify-center items-center">
                                            <b>{getTaskListByIndex(step.assignedTaskList)}</b>
                                        </div>
                                        <div className="flex h-1/2 justify-center items-center">
                                            <b>{step.currentPomodorosCount + ' / ' + step.pomodoros}</b>
                                        </div>
                                    </div>
                                </div>
                            </ArcherElement>
                        ))}
                    </div>
                </ArcherContainer>
            </div>
        </>
    );
};

export default Routine;
