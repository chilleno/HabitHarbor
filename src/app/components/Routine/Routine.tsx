import React, { useState, useEffect, useRef } from 'react';
import { ArcherContainer, ArcherElement, } from 'react-archer';

interface Task {
    id: number;
    header: string;
    description: string;
    order: number;
    subtasks: any[];
}

interface RoutineProps {
    tasks: Task[];
    currentTaskIndex: number;
}

const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between' };
const boxStyle = { padding: '10px', border: '1px solid black' };

const Routine: React.FC<RoutineProps> = ({ tasks, currentTaskIndex }) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    useEffect(() => {
        const currentTaskRef = taskRefs.current[currentTaskIndex];
        if (currentTaskRef) {
            currentTaskRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentTaskIndex]);

    return (
        <>
            <div className="flex justify-center p-5">
                <h1 className="text-white xl:text-4xl lg:text-3xl sm:text2xl font-bold underline underline-offset-7">
                    Daily Routine
                </h1>
            </div>
            <div className="flex flex-col h-screen max-h-fit -z-50 overflow-y-auto sm:max-h-[100%] pt-5">
                <ArcherContainer>
                    <div className="flex flex-col items-center">
                        {tasks.map((task, index) => (
                            <ArcherElement
                                key={task.id}
                                id={task.order.toString()}
                                relations={(task.order + 1) < tasks.length ? [
                                    {
                                        targetId: (task.order + 1).toString(),
                                        targetAnchor: 'top',
                                        sourceAnchor: 'bottom',
                                        style: { strokeColor: 'white', strokeWidth: 5, endMarker: false, noCurves: true, },
                                    },
                                ] : []}
                            >
                                <div
                                    key={task.id}
                                    className={` border border-gray-100 rounded-md p-4 mb-4 cursor-pointer ${index === currentTaskIndex ? 'bg-blue-200' : ''
                                        }`}
                                    onClick={() => handleTaskClick(task)}
                                    ref={(ref) => {
                                        taskRefs.current[index] = ref;
                                    }}
                                >
                                    <h2 className="font-bold text-xl">{task.header}</h2>
                                </div>
                            </ArcherElement>
                        ))}
                    </div>
                </ArcherContainer>
            </div>

            {
                selectedTask && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md">
                            <div className="ml-5 mr-5 mt-5 h-auto">
                                <div className="flex">
                                    <h1 className="bg-white text-black rounded-full px-4 py-2 text-3xl font-bold">
                                        {selectedTask.header}
                                    </h1>
                                </div>
                                <div className="mt-5">
                                    <p className="bg-white text-black rounded-full px-4 py-2 text-xl font-bold">
                                        {selectedTask.description}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="mt-4 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                className="ml-5 mt-4 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
                                onClick={closeModal}
                            >
                                Change
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Routine;
