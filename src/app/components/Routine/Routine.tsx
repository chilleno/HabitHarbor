import React, { useState, useEffect, useRef, use } from 'react';
import { ArcherContainer, ArcherElement, } from 'react-archer';
import { ArrowPathIcon, ArrowsRightLeftIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import NewRoutineStepModal from './components/NewRoutineStepModal';
import ContentBox from '../../designComponent/ContentBox';
import EditRoutineStepModal from './components/EditRoutineStepModal';
import './Routine.scss';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from "react-tooltip";

const Routine: React.FC<RoutineProps> = ({ setUpdateRoutineStep, updateRoutineStep, currentTaskIndex }) => {
    const [routine, setRoutine] = useState<Step[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
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

            // fired custom event on localStorage data changed
            const event = new CustomEvent('routinedatachanged') as any;
            document.dispatchEvent(event);

            resetCurrentRoutineStepCount();
            setCurrentStep(0);
        }
    }

    const resetCurrentStepNoConfirm = (): void => {
        localStorage.setItem('currentRoutineStep', '0');

        // fired custom event on localStorage data changed
        const event = new CustomEvent('routinedatachanged') as any;
        document.dispatchEvent(event);

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

        // fired custom event on localStorage data changed
        const event = new CustomEvent('routinedatachanged') as any;
        document.dispatchEvent(event);

        setUpdateRoutineStep(!updateRoutineStep);
    }

    useEffect(() => {
        if (!localStorage.getItem('currentDayRoutine')) {
            let currentDay = new Date();
            localStorage.setItem('currentDayRoutine', currentDay.toString());

            // fired custom event on localStorage data changed
            const event = new CustomEvent('routinedatachanged') as any;
            document.dispatchEvent(event);
        }
        checkCurrentDay();
    }, []);

    const checkCurrentDay = (): void => {
        const currentDay = new Date();
        const currentLocalStorageDay = new Date(localStorage.getItem('currentDayRoutine') || '');
        if (currentDay.setHours(0, 0, 0, 0) > currentLocalStorageDay.getTime()) {
            resetCurrentStepNoConfirm();
            localStorage.setItem('currentDayRoutine', currentDay.toString());

            // fired custom event on localStorage data changed
            const event = new CustomEvent('routinedatachanged') as any;
            document.dispatchEvent(event);

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


    //function that select current step
    const selectCurrentStep = (index): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentRoutineStep', index.toString());

            // fired custom event on localStorage data changed
            const event = new CustomEvent('routinedatachanged') as any;
            document.dispatchEvent(event);

            handleRefreshRoutine();
        }
    }

    //function that delete current step
    const deleteCurrentStep = (index): void => {
        if (typeof window !== 'undefined') {
            const currentRoutine = JSON.parse(localStorage.getItem('routine') || '{}');
            currentRoutine.splice(index, 1);
            localStorage.setItem('routine', JSON.stringify(currentRoutine));
            localStorage.setItem('currentRoutineStep', '0');

            // fired custom event on localStorage data changed
            const event = new CustomEvent('routinedatachanged') as any;
            document.dispatchEvent(event);

            handleRefreshRoutine();
        }
    }

    return (
        <>
            <ContentBox className="xl:min-w-[25rem] lg:min-w-[18rem] lg:max-w-[18rem] md:min-w-[18rem] xl:min-h-[39rem] xl:max-h-[39rem] lg:min-h-[26rem] lg:max-h-[26rem] md:min-h-[26rem] md:max-h-[26rem] routine">
                <div className="flex justify-center font-bold gap-3">
                    <div className="text-white xl:text-xl lg:text-md md:tex-md w-7/12 justify-end flex">
                        <h1 className="text-white xl:text-xl lg:text-md md:tex-md">Routine</h1>
                    </div>
                    <div className="flex justify-end w-4/12 gap-5 z-50">
                        <button className="h-[18px] w-[18px]" data-tooltip-id="resetRoutine" onClick={() => resetCurrentStep()}>
                            <ArrowPathIcon className="h-[18px] w-[18px]" />
                        </button>
                        <button className="h-[18px] w-[18px]" data-tooltip-id="newStep" onClick={() => openModal()}>
                            <PlusIcon className="h-[18px] w-[18px]" />
                        </button>
                        <ReactTooltip
                            id="resetRoutine"
                            place="bottom"
                            content="Reset the routine to the first step"
                        />
                        <ReactTooltip
                            id="newStep"
                            place="bottom"
                            content="Add new step to the routine"
                        />
                    </div>
                </div>
                <div className="xl:max-h-fit pb-3 xl:h-fit max-h-[64vh] overflow-y-auto flex flex-col no-scrollbar min-w-[16rem]">
                    <ArcherContainer>
                        <div className="flex flex-col items-center gap-5 xl:max-w-[20rem] xl:min-w-[20rem] lg:max-w-[15rem] lg:min-w-[15rem]">
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
                                        className={`flex w-full xl:min-w-[20rem] xl:max-w-[20rem] lg:min-w-[14rem] lg:max-w-[14rem] bg-[#323333] rounded-xl p-3 ${index === currentStep && 'border-2 border-white'}`}
                                        ref={(ref) => {
                                            taskRefs.current[index] = ref;
                                        }}
                                    >
                                        <div className="w-3/12 ">
                                            <div className="flex border-2 border-white rounded-full max-w-fit">
                                                <div className={` pie-wrapper pie-wrapper--solid ${'progress-' + getPercentage(step.currentPomodorosCount, step.pomodoros)}`}>
                                                </div>
                                            </div>
                                            <b className="m-1">{step.currentPomodorosCount + ' / ' + step.pomodoros}</b>
                                        </div>
                                        <div className="flex flex-col w-8/12 ml-1">
                                            <h1 className="text-white font-bold xl:text-sm lg:text-xs md:text-xs">Work</h1>
                                            <h1 className="text-white font-bold xl:text-md lg:text-xs  mb-1">{step.header}</h1>
                                            <h1 className="text-white font-bold xl:text-xs lg:text-[0.6rem] max-w-fit py-1 px-2 rounded-2xl bg-[#73F1F3]/20">{getTaskListByIndex(step.assignedTaskList)}</h1>
                                        </div>
                                        <div className="w-1/12 text-white xl:text-md lg:text-xs flex flex-col justify-center content-center gap-2">
                                            <button className="h-[18px] w-[18px]" data-tooltip-id="selectStep" onClick={() => selectCurrentStep(index)}>
                                                <ArrowsRightLeftIcon className="h-[18px] w-[18px]" />
                                            </button >
                                            <button className="h-[18px] w-[18px]" data-tooltip-id="editStep" onClick={() => handleOpenEditModal(index)}>
                                                <PencilIcon className="h-[18px] w-[18px]" />
                                            </button>
                                            <button className="h-[18px] w-[18px]" data-tooltip-id="deleteStep" onClick={() => deleteCurrentStep(index)}>
                                                <TrashIcon className="h-[18px] w-[18px]" />
                                            </button>
                                            <ReactTooltip
                                                id="selectStep"
                                                place="bottom"
                                                content="Select this step as current step"
                                            />
                                            <ReactTooltip
                                                id="editStep"
                                                place="bottom"
                                                content="Edit this step"
                                            />
                                            <ReactTooltip
                                                id="deleteStep"
                                                place="bottom"
                                                content="Delete this step"
                                            />
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