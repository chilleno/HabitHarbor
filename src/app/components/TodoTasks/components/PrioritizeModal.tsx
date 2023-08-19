import React, { useEffect, useState } from 'react';

enum EvaluationType {
    Immediate = "Immediate",
    Short = "Short Term",
    Long = "Long Term",
}

enum effortType {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

interface PriorityCalculation {
    taskIndex: number;
    priority: number;
    benefit: EvaluationType | null;
    impact: EvaluationType | null;
    effort: effortType | null;
}


const PrioritizeModal: React.FC<PrioritizedModalProps> = ({ closeModal, renderList, currentTaskListIndex, taskList }) => {

    const [priorityCalculationList, setPriorityCalculationList] = useState<PriorityCalculation[]>([]);

    //useEffect that initialize the priorityCalculationList state with the taskList state
    useEffect(() => {
        const newPriorityCalculationList: PriorityCalculation[] = [];
        taskList.forEach((task, index) => {
            newPriorityCalculationList.push({
                taskIndex: index,
                priority: 0,
                benefit: null,
                impact: null,
                effort: null,
            });
        });
        setPriorityCalculationList(newPriorityCalculationList);
    }, [taskList]);

    //function that calculate the priority of every task and update the priorityCalculationList state
    const calculatePriority = () => {
        if (!validatePriorityCalculationList()) {
            alert("Please select a value for every task");
            return;
        }

        const newPriorityCalculationList: PriorityCalculation[] = [];

        priorityCalculationList.forEach((task, index) => {
            let priority = 0;
            if (task.benefit === EvaluationType.Immediate) {
                priority += 10;
            } else if (task.benefit === EvaluationType.Short) {
                priority += 5;
            } else if (task.benefit === EvaluationType.Long) {
                priority += 1;
            }

            if (task.impact === EvaluationType.Immediate) {
                priority -= 10;
            } else if (task.impact === EvaluationType.Short) {
                priority -= 5;
            } else if (task.impact === EvaluationType.Long) {
                priority -= 1;
            }

            if (task.effort === effortType.Low) {
                priority += 1;
            } else if (task.effort === effortType.Medium) {
                priority += 2;
            } else if (task.effort === effortType.High) {
                priority += 3;
            }

            newPriorityCalculationList.push({
                taskIndex: index,
                priority: priority,
                benefit: task.benefit,
                impact: task.impact,
                effort: task.effort,
            });
        });
        savePriority(newPriorityCalculationList);
    }

    //function that update the benefit of the task in the priorityCalculationList state when the select value is changed
    const updateBenefit = (event: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
        const newPriorityCalculationList = [...priorityCalculationList];
        newPriorityCalculationList[taskIndex].benefit = event.target.value as EvaluationType;
        setPriorityCalculationList(newPriorityCalculationList);
    }

    //function that update the impact of the task in the priorityCalculationList state when the select value is changed
    const updateImpact = (event: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
        const newPriorityCalculationList = [...priorityCalculationList];
        newPriorityCalculationList[taskIndex].impact = event.target.value as EvaluationType;
        setPriorityCalculationList(newPriorityCalculationList);
    }

    //function that update the effort of the task in the priorityCalculationList state when the select value is changed
    const updateEffort = (event: React.ChangeEvent<HTMLSelectElement>, taskIndex: number) => {
        const newPriorityCalculationList = [...priorityCalculationList];
        newPriorityCalculationList[taskIndex].effort = event.target.value as effortType;
        setPriorityCalculationList(newPriorityCalculationList);
    }

    //function that validate if every task has a benefit, impact and effort selected
    const validatePriorityCalculationList = () => {
        let isValid = true;
        priorityCalculationList.forEach((task) => {
            if (!task.benefit || !task.impact || !task.effort) {
                isValid = false;
            }
        });
        return isValid;
    }

    //function that pass the priority to the specified task in the taskList in the LocalStorage
    const savePriority = (newPriorityCalculationList: PriorityCalculation[]) => {
        const newTaskList = [...taskList];
        newPriorityCalculationList.forEach((task) => {
            newTaskList[task.taskIndex].priority = task.priority;
        });

        newTaskList.sort((a, b) => (a.priority || 0) - (b.priority || 0));

        const taskLists = JSON.parse(localStorage.getItem("taskLists") || "[]");

        taskLists[currentTaskListIndex].tasks = newTaskList;
        taskLists[currentTaskListIndex].highlightedTask = null;

        localStorage.setItem("taskLists", JSON.stringify(taskLists));

        renderList();
        closeModal();
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-main-primary bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-main-primary p-4 rounded-3xl shadow w-auto text-white border-[2px] border-white">
                <div className="flex justify-center">
                    <h2 className="text-xl font-bold mb-4">Prioritize Tasks</h2>
                </div>
                <div className="flex justify-center">
                    <table className="table-auto border-collapse border border-white">
                        <thead>
                            <tr>
                                <th className="border p-5">Task</th>
                                <th className="border">Benefit</th>
                                <th className="border">Impact</th>
                                <th className="border">Effort</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priorityCalculationList.map((task, index) => (
                                <tr key={index}>
                                    <td className="border p-5">{taskList[task.taskIndex].header}</td>
                                    <td className="border p-2">
                                        <select onChange={(e) => updateBenefit(e, index)} className="text-main-primary text-center">
                                            <option selected disabled>select an option</option>
                                            <option value={EvaluationType.Immediate}>{EvaluationType.Immediate}</option>
                                            <option value={EvaluationType.Short}>{EvaluationType.Short}</option>
                                            <option value={EvaluationType.Long}>{EvaluationType.Long}</option>
                                        </select>
                                    </td>
                                    <td className="border p-2">
                                        <select onChange={(e) => updateImpact(e, index)} className="text-main-primary text-center">
                                            <option selected disabled>select an option</option>
                                            <option value={EvaluationType.Immediate}>{EvaluationType.Immediate}</option>
                                            <option value={EvaluationType.Short}>{EvaluationType.Short}</option>
                                            <option value={EvaluationType.Long}>{EvaluationType.Long}</option>
                                        </select>
                                    </td>
                                    <td className="border p-2">
                                        <select onChange={(e) => updateEffort(e, index)} className="text-main-primary text-center">
                                            <option selected disabled>select an option</option>
                                            <option value={effortType.Low}>{effortType.Low}</option>
                                            <option value={effortType.Medium}>{effortType.Medium}</option>
                                            <option value={effortType.High}>{effortType.High}</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4 gap-5">
                    <button className="bg-main-primary border-2 border-white hover:bg-white hover:text-main-primary px-4 py-2 rounded-full text-white" onClick={() => calculatePriority()}>
                        Prioritize
                    </button>
                    <button className="bg-main-primary border-2 border-white hover:bg-white hover:text-main-primary px-4 py-2 rounded-full text-white" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrioritizeModal;
