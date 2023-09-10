import React, { useState, useEffect, useRef, use } from 'react';
import { ArcherContainer, ArcherElement, } from 'react-archer';
import { CogIcon } from '@heroicons/react/24/solid';
import NewRoutineStepModal from './components/NewRoutineStepModal';
import ContentBox from '../../designComponent/ContentBox';
import FloatingButton from '@/app/designComponent/FloatingButton';
import OptionList from './components/OptionList';
import OptionListStep from './components/OptionListStep';
import EditRoutineStepModal from './components/EditRoutineStepModal';
import './Routine.scss';

const Routine: React.FC<RoutineProps> = ({ setUpdateRoutineStep, updateRoutineStep, currentTaskIndex }) => {
    const [routine, setRoutine] = useState<Step[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [showOptionsStep, setShowOptionStep] = useState<number | null>(null);
    const [editStepIndex, setEditStepIndex] = useState<number | null>(0);

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


    const handleRefreshRoutine = () => {
        setUpdateRoutineStep(!updateRoutineStep);
    }

    const handleOpenEditModal = (stepIndex: number): void => {
        setEditStepIndex(stepIndex);
        setShowEditModal(!showEditModal);
    }

    const handleCloseEditModal = (): void => {
        setShowEditModal(!showEditModal);
    }

    return (
        <>
            <ContentBox className="xl:min-w-[25rem] lg:min-w-[18rem] lg:max-w-[18rem] md:min-w-[18rem] xl:min-h-[39rem] xl:max-h-[39rem] lg:min-h-[26rem] lg:max-h-[26rem] md:min-h-[26rem] md:max-h-[26rem] routine">
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
                <div className="xl:max-h-fit pb-3 xl:h-fit max-h-[64vh] overflow-y-auto flex flex-col no-scrollbar min-w-[16rem]">
                    <ArcherContainer>
                        <div className="flex flex-col items-center gap-5 xl:max-w-[18rem] xl:min-w-[18rem] lg:max-w-[14rem] lg:min-w-[14rem]">
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
                                        className={`xl:ml-10 flex w-full xl:min-w-[19rem] xl:max-w-[19rem] lg:min-w-[14rem] lg:max-w-[14rem] bg-[#323333] rounded-xl p-3 ${index === currentStep && 'border-2 border-white'}`}
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
                                        <div className="flex flex-col w-6/12 ml-1">
                                            <h1 className="text-white font-bold xl:text-sm lg:text-xs md:text-xs">Work</h1>
                                            <h1 className="text-white font-bold xl:text-md lg:text-xs  mb-1">{step.header}</h1>
                                            <h1 className="text-white font-bold xl:text-xs lg:text-[0.6rem] max-w-fit py-1 px-2 rounded-2xl bg-[#73F1F3]/20">{getTaskListByIndex(step.assignedTaskList)}</h1>
                                        </div>
                                        <div className="w-3/12 text-white xl:text-md lg:text-xs flex justify-center content-center py-2">
                                            <b>{step.currentPomodorosCount + ' / ' + step.pomodoros}</b>
                                        </div>
                                        <FloatingButton className="absolute right-0 xl:mr-1 lg:mr-3 xl:mt-10 lg:mt-8 bg-main-primary" onClick={() => setShowOptionStep(index)}>
                                            <span className="flex items-center justify-center hover:cursor-pointer">
                                                <CogIcon className="h-[24px] w-[24px] text-white" />
                                            </span>
                                            {
                                                showOptionsStep === index ?
                                                    <OptionListStep
                                                        stepIndex={index}
                                                        onClose={() => setShowOptionStep(null)}
                                                        refreshRoutine={handleRefreshRoutine}
                                                        openEditModal={() => handleOpenEditModal(index)}
                                                    /> : null
                                            }
                                        </FloatingButton>
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
            {
                showEditModal && (
                    <EditRoutineStepModal
                        stepIndex={editStepIndex || 0}
                        closeModal={handleCloseEditModal}
                        setUpdateRoutineStep={setUpdateRoutineStep}
                        updateRoutineStep={updateRoutineStep}
                    />
                )
            }
        </>
    );
};

export default Routine;