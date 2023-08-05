interface Step {
    header: string;
    pomodoros: number;
    currentPomodorosCount: number;
    assignedTaskList: number;
    order: number;
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

interface HelpButtonOption {
    text: string;
    url: string;
}

interface RoutineProps {
    setUpdateRoutineStep: (newValue: boolean) => void;
    updateRoutineStep: boolean;
    currentTaskIndex: number;
}

interface NewRoutineStepModalProps {
    closeModal: () => void;
    setUpdateRoutineStep: (newValue:boolean) => void;
    updateRoutineStep: boolean;
}

interface PomodoroTimerProps {
    handleCurrentRoutineStepCount: () => void;
}

interface TaskListProps {
    currentTaskListIndex: number;
    nextTaskList(): void;
    previousTaskList(): void;
    changeTaskList(taskListIndex: number): void;
}

interface NewTaskListModalProps {
    closeModal: () => void;
    renderList: () => void;
    handleChangeTaskList: (newValue: number) => void;
}

interface HelpOptionListProps {
    onClose: () => void;
}

interface QuestionButtonProps {
    onClick: () => void;
}