import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import NewTaskListModal from './components/NewTaskListModal';
import { useCookies } from 'react-cookie';

interface Task {
    header: string;
    checked: boolean;
    subtasks: any[];
}

interface TaskListProps {
    currentTaskListIndex: number;
    nextTaskList(): void;
    previousTaskList(): void;
    changeTaskList(taskListIndex: number): void;
}

interface TaskList {
    name: string;
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ currentTaskListIndex, previousTaskList, nextTaskList, changeTaskList }) => {
    const [cookies, setCookie] = useCookies([
        'taskLists',
    ]);
    const [renderList, setRenderList] = useState<boolean>(false);
    const [lists, setLists] = useState<TaskList[]>();
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleCheckboxChange = (taskIndex: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        const updatedTasks = taskList.map((task, index) => {
            if (index === taskIndex) {
                return {
                    ...task,
                    checked: !task.checked
                };
            }
            return task;
        });

        setTaskList(updatedTasks);
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
    }, [cookies, taskList])

    useEffect(() => {
        if (cookies.taskLists && cookies.taskLists.length > 0)
            setTaskList(cookies.taskLists[currentTaskListIndex]);
    }, [])

    return (
        <>
            {showModal && (
                <NewTaskListModal
                    closeModal={closeModal}
                    renderList={setRenderList}
                />
            )}
            <div className="flex p-5">
                <h1 className="flex w-1/2 justify-end text-white xl:text-4xl lg:text-3xl sm:text2xl font-bold underline underline-offset-7">
                    Task List
                </h1>
                <div className='flex w-1/2 justify-start ml-5'>
                    <PlusIcon
                        onClick={openModal}
                        className="h-10 w-10 text-white-500 hover:cursor-pointer mr-5"
                    />
                </div>
            </div>
            <div className="flex content-center gap-5 justify-center sm:overflow-y-auto">
                <div className={`flex content-center justify-center gap-3 w-[100%] overflow-x-auto`}>
                    {
                        lists ?
                            lists.length > 0 ?
                                lists.map((list, index) => (
                                    <h6
                                        key={'task_list_' + index}
                                        className={`${index == currentTaskListIndex ? 'underline' : ''} flex text-white text-sm font-bold hover:cursor-pointer hover:underline underline-offset-7 hover:underline-offset-7`}
                                        onClick={() => changeTaskList(index)}
                                    >
                                        {list.name}
                                    </h6>
                                ))
                                : <i className='text-white text-sm'>No task list are created</i>
                            : null
                    }
                </div>
            </div >
            {
                <div className="flex flex-col h-screen max-h-fit -z-50 pt-5">
                    {
                        taskList.length > 0 ? taskList.map((task, index) => (
                            task.checked == false &&
                            <div
                                key={'task_content_' + index}
                                className={`flex items-center}`}
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
                        )) : null
                    }
                    {
                        taskList.length > 0 ? taskList.map((task, index) => (
                            task.checked === true ?
                                <div
                                    key={'task_content_' + index}
                                    className={`flex items-center}`}
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
                                : null
                        )) : null
                    }
                </div>
            }
        </>
    );
};

export default TaskList;
