import React, { useState } from 'react';
import { useCookies } from 'react-cookie'

interface NewTaskListModalProps {
    closeModal: () => void;
    renderList: (value: boolean) => void;
}
interface Task {
    header: string;
    checked: boolean;
    subtasks: any[];
}

interface TaskList {
    name: string;
    tasks: Task[];
}


const NewTaskListModal: React.FC<NewTaskListModalProps> = ({ closeModal, renderList }) => {
    const [cookies, setCookie] = useCookies([
        'taskLists',
    ]);
    const [name, setName] = useState('');

    const createNewTaskList = (): void => {
        const currentTaskLists = cookies.taskLists;
        const newTaskList: TaskList = {
            name: name,
            tasks: []
        }
        currentTaskLists.push(newTaskList);
        setCookie('taskLists', JSON.stringify(currentTaskLists))
        closeModal();
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4">New Task List</h2>
                <div className="flex flex-col">
                    <input
                        type='text'
                        placeholder='Enter New Task List Name'
                        className="text-black rounded-full py-2 placeholder:px-3 px-3"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white" onClick={createNewTaskList}>
                        Save
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTaskListModal;
