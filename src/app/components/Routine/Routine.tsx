import React, { useState, useEffect, useRef, use } from 'react';
import { ArcherContainer, ArcherElement, } from 'react-archer';
import { CogIcon } from '@heroicons/react/24/solid';
import NewRoutineStepModal from './components/NewRoutineStepModal';
import ContentBox from '../../designComponent/ContentBox';
import FloatingButton from '@/app/designComponent/FloatingButton';
import OptionList from './components/OptionList';
import './Routine.scss';

const Routine: React.FC<RoutineProps> = ({ setUpdateRoutineStep, updateRoutineStep, currentTaskIndex }) => {
    const [routine, setRoutine] = useState<Step[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleDeleteStep = (stepIndex): void => {
        if (typeof window !== 'undefined') {
            if (window.confirm('are you sure you want to delete the step?')) {
                let currentRoutine = routine;
                let updatedRoutine = currentRoutine.filter((step, index) => index !== stepIndex);
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
        setCurrentStep(currentStep >= 0 ? currentStep : null);
    }

    const getTaskListByIndex = (index: number): string => {
        let currentLocalStorageTaskList = JSON.parse(localStorage.getItem('taskLists') || '[]');
        if (currentLocalStorageTaskList[index] !== undefined) {
            return currentLocalStorageTaskList[index].name;
        } else {
            return 'No Task List';
        }
    }

    const getPercentage = (done: number, max: number): number => {
        return Math.round((done / max) * 100 / 10) * 10;
    }

    useEffect(() => {
        renderRoutine();
        getCurrentStep()
    }, [updateRoutineStep]);

    const resetCurrentStep = (): void => {
        if (window.confirm('are you sure you want to reset the routine?')) {
            localStorage.setItem('currentRoutineStep', '0');
            resetCurrentRoutineStepCount();
            setCurrentStep(0);
        }
    }

    const resetCurrentStepNoConfirm = (): void => {
        localStorage.setItem('currentRoutineStep', '0');
        resetCurrentRoutineStepCount();
        setCurrentStep(0);
    }

    const resetCurrentRoutineStepCount = (): void => {
        let currentRoutine = JSON.parse(localStorage.getItem('routine') || '[]');
        let updatedRoutine = currentRoutine.map((step: Step) => {
            step.currentPomodorosCount = 0;
            return step;
        });
        localStorage.setItem('routine', JSON.stringify(updatedRoutine));
        setUpdateRoutineStep(!updateRoutineStep);
    }

    useEffect(() => {
        if (!localStorage.getItem('currentDayRoutine')) {
            let currentDay = new Date();
            localStorage.setItem('currentDayRoutine', currentDay.toString());
        }
        checkCurrentDay();
    }, []);

    const checkCurrentDay = (): void => {
        const currentDay = new Date();
        const currentLocalStorageDay = new Date(localStorage.getItem('currentDayRoutine') || '');
        console.log(currentDay.setHours(0, 0, 0, 0), currentLocalStorageDay); 
        if (currentDay.setHours(0, 0, 0, 0) > currentLocalStorageDay.getTime()) {
            resetCurrentStepNoConfirm();
            localStorage.setItem('currentDayRoutine', currentDay.toString());
        }
    }

    useEffect(() => {
        const currentTaskRef = taskRefs.current[currentTaskIndex];
        if (currentTaskRef) {
            currentTaskRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentTaskIndex]);

    return (
        <>
            <ContentBox className="min-w-[400px]">
                <div className="flex justify-end -mr-12 -mt-8">
                    <FloatingButton onClick={() => setShowOptions(!showOptions)}>
                        <span className="flex items-center justify-center hover:cursor-pointer">
                            <CogIcon className="h-[24px] w-[24px] text-white" />
                        </span>
                        {
                            showOptions &&
                            <OptionList
                                resetCurrentStep={resetCurrentStep}
                                openModal={openModal}
                                onClose={() => setShowOptions(false)}
                            />
                        }
                    </FloatingButton>
                </div>
                <div className="flex justify-center font-bold mb-2 -mt-6">
                    <h1>Routine</h1>
                </div>
                <div className="xl:max-h-fit pb-3 xl:h-fit max-h-[64vh] overflow-y-auto flex flex-col px-4">
                    <ArcherContainer>
                        <div className="flex flex-col items-center gap-5 max-w-[300px]">
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
                                        className={`flex w-full min-w-full bg-main-primary rounded-xl p-3 ${index === currentStep && 'border-2 border-white'}`}
                                        ref={(ref) => {
                                            taskRefs.current[index] = ref;
                                        }}
                                    >
                                        <div className="w-3/12 ">
                                            <div className="flex border-2 border-white rounded-full max-w-fit">
                                                <div className={` pie-wrapper pie-wrapper--solid ${'progress-' + getPercentage(step.currentPomodorosCount, step.pomodoros)}`}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-8/12 ml-1">
                                            <h1 className="text-gray font-bold text-sm">Work</h1>
                                            <h1 className="text-white font-bold text-md mb-1">{step.header}</h1>
                                            <h1 className="text-white font-bold text-xs max-w-fit py-1 px-3 rounded-2xl bg-[#73F1F3]/20">{getTaskListByIndex(step.assignedTaskList)}</h1>
                                        </div>
                                        <div className="w-2/12 text-white lg:text-xs flex justify-center content-center py-2">
                                            <b>{step.currentPomodorosCount + ' / ' + step.pomodoros}</b>
                                        </div>
                                    </div>
                                </ArcherElement>
                            ))}
                        </div>
                    </ArcherContainer>
                </div>
            </ContentBox>
            {
                showModal && (
                    <NewRoutineStepModal
                        closeModal={closeModal}
                        setUpdateRoutineStep={setUpdateRoutineStep}
                        updateRoutineStep={updateRoutineStep}
                    />
                )
            }
        </>
    );
};

export default Routine;