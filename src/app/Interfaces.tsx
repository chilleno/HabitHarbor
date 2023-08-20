interface Step {
    header: string;
    pomodoros: number;
    currentPomodorosCount: number;
    assignedTaskList: number;
    order: number;
}

interface Task {
    header: string;
    priority: number | null;
    checked: boolean;
    subtasks: any[];
}

interface TaskList {
    name: string;
    highlightedTask: number | null;
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
    setUpdateRoutineStep: (newValue: boolean) => void;
    updateRoutineStep: boolean;
}

interface EditRoutineStepModalProps {
    stepIndex: number;
    closeModal: () => void;
    setUpdateRoutineStep: (newValue: boolean) => void;
    updateRoutineStep: boolean;
}

interface PomodoroTimerProps {
    handleCurrentRoutineStepCount: () => void;
}

interface TaskListProps {
    currentTaskListIndex: number;
    changeTaskList(taskListIndex: number): void;
}
interface TasksProps {
    currentTaskListIndex: number;
    taskList: Task[];
    setUpdateTaskList: (newValue: boolean) => void;
    updateTaskList: boolean;
}

interface NewTaskListModalProps {
    closeModal: () => void;
    renderList: () => void;
    handleChangeTaskList: (newValue: number) => void;
}

interface PrioritizedModalProps {
    closeModal: () => void;
    renderList: () => void;
    currentTaskListIndex: number;
    taskList: Task[];
}

interface HelpOptionListProps {
    onClose: () => void;
}

interface TaskListOptionListProps {
    onClose: () => void;
    openModal: () => void;
    currentSelection: number;
    handleChangeTaskList: (taskListIndex: number) => void;
    renderTaskLists: () => void;
}

interface TodoTasksOptionListProps {
    onClose: () => void;
    openPrioritizeModal: () => void;
}

interface DoneTasksOptionListProps {
    onClose: () => void;
}

interface QuestionButtonProps {
    onClick: () => void;
}

interface RoutineOptionListProps {
    resetCurrentStep: (showConfirm: boolean) => void;
    openModal: () => void;
    onClose: () => void;
}

interface RoutineStepOptionListProps {
    stepIndex: number;
    onClose: () => void;
    refreshRoutine: () => void;
    openEditModal: (stepIndex: number) => void;
}