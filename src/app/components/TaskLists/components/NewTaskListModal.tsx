import React, { useState } from 'react';

const NewTaskListModal: React.FC<NewTaskListModalProps> = ({ closeModal, renderList, handleChangeTaskList }) => {
    const [name, setName] = useState('');

    const createNewTaskList = (): void => {
        if (name === '') return;
        if (typeof window !== 'undefined') {
            const currentTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
            const newTaskList: TaskList = {
                name: name,
                highlightedTask: null,
                tasks: []
            }
            currentTaskLists.push(newTaskList);
            localStorage.setItem('taskLists', JSON.stringify(currentTaskLists))

            // fired custom event on localStorage data changed
            const event = new CustomEvent('taskListdatachanged') as any;
            document.dispatchEvent(event);

            handleChangeTaskList(currentTaskLists.length - 1)
            renderList();
            closeModal();
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-main-primary bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-main-primary p-4 rounded-3xl shadow w-auto sm:w-80  border-[2px] border-white">
                <h2 className="text-xl font-bold mb-4 text-white">New Task List</h2>
                <div className="flex flex-col">
                    <input
                        type='text'
                        placeholder='Enter New Task List Name'
                        className="text-main-primary rounded-full py-2 placeholder:px-3 px-3"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <button className="border-2 border-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-white" onClick={createNewTaskList}>
                        Save
                    </button>
                    <button className="border-2 border-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-white" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTaskListModal;
