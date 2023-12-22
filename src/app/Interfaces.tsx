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
    url?: string;
    clickFunction?: () => void;
}

interface HabitTracker {
    icon: string; //example: '💧'
    name: string; //example: 'drink water'
    color: string; //example: '#3B82F6'
    maxValue: number; //example: 8
    currentValue: number;
    firstTrackerDate: string;
}

interface RoutineProps {
    setUpdateRoutineStep: (newValue: boolean) => void;
    updateRoutineStep: boolean;
    currentTaskIndex: number;
    updateTaskList: () => void;
}

interface TaskListsProps {
    updateTaskList: () => void;
    currentTaskList: number;
    changeTaskList: (taskListIndex: number) => void;
}

interface NewWorkspaceModalProps {
    closeModal: () => void;
    updateTaskList: () => void;
}

interface EditWorkspaceModalProps {
    workspaceIndex: number;
    closeModal: () => void;
    updateTaskList: () => void;
}

interface NewRoutineStepModalProps {
    closeModal: () => void;
    setUpdateRoutineStep: (newValue: boolean) => void;
    updateRoutineStep: boolean;
    updateTaskList: () => void;
}

interface NewHabitTrackerModalProps {
    closeModal: () => void;
    updateHabits: () => void;
}

interface EditRoutineStepModalProps {
    stepIndex: number;
    closeModal: () => void;
    setUpdateRoutineStep: (newValue: boolean) => void;
    updateRoutineStep: boolean;
}

interface PomodoroTimerProps {
}

interface TaskListProps {
    taskList: Task[];
    currentTaskListIndex: number;
    changeTaskList(taskListIndex: number): void;
    setUpdateTaskList: (newValue: boolean) => void;
    updateTaskList: boolean;
}
interface TasksProps {
    currentTaskListIndex: number;
    taskList: Task[];
    setUpdateTaskList: (newValue: boolean) => void;
    updateTaskList: boolean;
    highlightedTask: number | null;
    setHighlightedTask: (newValue: number | null) => void;
    handleMoveTaskMode: () => void;
    moveTasksMode: boolean;
    lists?: TaskList[];
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
    showTour: () => void;
}

interface TaskListOptionListProps {
    onClose: () => void;
    openModal: () => void;
    currentSelection: number;
    handleChangeTaskList: (taskListIndex: number) => void;
    renderTaskLists: () => void;
}

interface TasksCreationOptionList {
    openPrioritizeModal: () => void;
    handleMoveTaskMode: () => void;
    deleteAllDoneTasks: () => void;
    deleteAllTasks: () => void;
}

interface TodoTasksOptionListProps {
    onClose: () => void;
    openPrioritizeModal: () => void;
}

interface DoneTasksOptionListProps {
    onClose: () => void;
    deleteAllDoneTasks: () => void;
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

interface DailyHabitsOptionListProps {
    onClose: () => void;
    openCreateModal: () => void;
}

interface TrackerProps {
    habitIndex: number;
    tracker: HabitTracker
    handleUpdateRender: () => void;
}

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

enum UpdatedObjects {
    Pomodoro = "Pomodoro",
    TaskLists = "TaskLists",
    Habits = "Habits",
}

interface PriorityCalculation {
    taskIndex: number;
    priority: number;
    benefit: EvaluationType | null;
    impact: EvaluationType | null;
    effort: effortType | null;
}

interface Workspace {
    name: string;
    taskLists: TaskList[];
}