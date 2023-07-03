import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import NewTaskListModal from './components/NewTaskListModal';
import { useCookies } from 'react-cookie'

interface Task {
    header: string;
    checked: boolean;
    subtasks: any[];
}

interface TaskListProps {
    tasks: Task[];
    currentTaskIndex: number;
}

interface TaskList {
    name: string;
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks, currentTaskIndex }) => {
    const [cookies, setCookie] = useCookies([
        'taskLists',
    ]);
    const [renderList, setRenderList] = useState<boolean>(false);
    const [lists, setLists] = useState<TaskList[]>();
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const [showModal, setShowModal] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleCheckboxChange = (taskIndex: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setTaskList(prevTasks => {
            const updatedTasks = prevTasks.map((task, index) => {
                if (index === taskIndex) {
                    return {
                        ...task,
                        checked: !task.checked
                    };
                }
                return task;
            });
            return updatedTasks;
        });

        // Remove the checked task after 3 seconds
        timeoutRef.current = setTimeout(() => {
            setTaskList(prevTasks => prevTasks.filter((task, index) => index !== taskIndex));
        }, 5000);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const renderTaskLists = () => {
        const currentTaskLists = cookies.taskLists;
        setLists(currentTaskLists);
    }

    useEffect(() => {
        renderTaskLists();
    }, [cookies])

    return (
        <>
            {showModal && (
                <NewTaskListModal
                    closeModal={closeModal}
                    renderList={setRenderList}
                />
            )}
            <div className="flex justify-center p-5">
                <h1 className="w-1/2 text-white xl:text-4xl lg:text-3xl sm:text2xl font-bold underline underline-offset-7">
                    Task List
                </h1>
                <div>
                    <PlusIcon
                        onClick={openModal}
                        className="h-10 w-10 text-white-500 hover:cursor-pointer mr-5"
                    />
                </div>
            </div>
            <div className="flex content-center gap-5 justify-center">
                <div className={`flex content-center justify-center gap-3 w-[100%] overflow-x-auto`}>
                    {
                        lists ?
                            lists.length > 0 ?
                                lists.map((list, index) => (
                                    <h6 key={'task_list_' + index} className={`flex text-white text-sm font-bold hover:cursor-pointer hover:underline underline-offset-7 hover:underline-offset-7`}>
                                        {list.name}
                                    </h6>
                                ))
                                : <i className='text-white text-sm'>No task list are created</i>
                            : null
                    }
                </div>
            </div >
            <div className="flex flex-col h-screen max-h-fit -z-50 pt-5">
                {
                    taskList.map((task, index) => (
                        <div
                            key={'task_content_' + index}
                            className={`flex items-center transition-opacity ${task.checked ? 'duration-[3000ms] opacity-0' : 'opacity-100'}`}
                        >
                            <input
                                checked={task.checked || false}
                                onChange={() => handleCheckboxChange(index)}
                                id={'task_' + index}
                                type='checkbox'
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <label
                                className="ml-2"
                                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                                htmlFor={'task_' + index}
                            >
                                {task.header}
                            </label>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default TaskList;
