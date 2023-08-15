"use client"
import { useState, useEffect, use } from 'react';
import { useMainComponent } from './layoutComponents/mainComponent';
import { useStartScreen } from './layoutComponents/startScreen';
import { useMiddleScreen } from './layoutComponents/middleScreen';
import { useEndScreen } from './layoutComponents/endScreen';
import Clock from './components/Clock/Clock';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import Routine from './components/Routine/Routine';
import DailyHabits from './components/DailyHabits/DailyHabits';
import HelpButton from './components/HelpButton/HelpButton';
import HelpOptionList from './components/HelpButton/HelpOptionList';
import TaskListSelector from './components/TaskListSelector/TaskListSelector';
import TodoTasks from './components/TodoTasks/TodoTasks';
import DoneTasks from './components/DoneTasks/DoneTasks';

export default function Home() {
  const [currentTaskList, setCurrentTaskList] = useState<number>(-1);
  const [updateTaskList, setUpdateTaskList] = useState<boolean>(false);
  const [updateRoutineStep, setUpdateRoutineStep] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [showList, setShowList] = useState(false);
  const { MainComponent } = useMainComponent();
  const { StartScreen } = useStartScreen();
  const { MiddleScreen } = useMiddleScreen();
  const { EndScreen } = useEndScreen();

  const handleButtonClick = () => {
    setShowList(!showList);
  };

  const changeTaskList = (taskListIndex: number) => {
    if (taskListIndex >= 0 && taskListIndex < JSON.parse(localStorage.getItem('taskLists') || '[]').length) {
      setCurrentTaskList(taskListIndex);
    }
  };

  useEffect(() => {
    const currentStoredTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
    if (currentStoredTaskLists && currentStoredTaskLists.length > 0) {
      setCurrentTaskList(0);
    }
  }, []);

  useEffect(() => {
    const storedTaskLists = JSON.parse(localStorage.getItem('taskLists') || '[]');
    if (storedTaskLists && storedTaskLists.length > 0 && currentTaskList >= 0) {
      setTaskList([]);
      setTimeout(() => {
        setTaskList(storedTaskLists[currentTaskList].tasks);
      }, 1);
    }
  }, [currentTaskList, updateTaskList])


  const handleCurrentRoutineStepCount = (): void => {
    if (typeof window !== 'undefined') {
      let currentRoutine: Step[] = JSON.parse(localStorage.getItem('routine') || '[]');
      let currentRoutineStep: number = Number(localStorage.getItem('currentRoutineStep') || '-1');

      if (currentRoutineStep > -1) {
        let step: Step = currentRoutine[currentRoutineStep];
        if (step && step.currentPomodorosCount < step.pomodoros) {
          step.currentPomodorosCount = step.currentPomodorosCount + 1;
          currentRoutine[currentRoutineStep] = step;
          localStorage.setItem('routine', JSON.stringify(currentRoutine));
          if (step.currentPomodorosCount === step.pomodoros) {
            currentRoutineStep = currentRoutineStep + 1;
            localStorage.setItem('currentRoutineStep', currentRoutineStep.toString());
            let newSelectedStep: Step = currentRoutine[currentRoutineStep];
            if (newSelectedStep.assignedTaskList > -1) {
              changeTaskList(newSelectedStep.assignedTaskList);
            }
          }
        }
        setUpdateRoutineStep(!updateRoutineStep);
      }
    }
  }

  return (
    <MainComponent>
      <StartScreen className=''>
        <div className="flex justify-center content-center mt-10 mb-5">
          <PomodoroTimer
            handleCurrentRoutineStepCount={handleCurrentRoutineStepCount}
          />
        </div>
        <div className="flex justify-center content-center mt-10 mb-5">
          <DailyHabits />
        </div>
      </StartScreen>
      <MiddleScreen className="">
        <div className="flex justify-center content-center mt-10 mb-5">
          <TaskListSelector
            currentTaskListIndex={currentTaskList}
            changeTaskList={setCurrentTaskList}
          />
        </div>
        {
          currentTaskList >= 0 &&
          <>
            <div className="flex justify-center content-center mt-12 mb-5">
              <TodoTasks
                currentTaskListIndex={currentTaskList}
                taskList={taskList}
                setUpdateTaskList={setUpdateTaskList}
                updateTaskList={updateTaskList}
              />
            </div>
            <div className="flex justify-center content-center mt-12 mb-5">
              <DoneTasks
                currentTaskListIndex={currentTaskList}
                taskList={taskList}
                setUpdateTaskList={setUpdateTaskList}
                updateTaskList={updateTaskList}
              />
            </div>
          </>
        }
      </MiddleScreen>
      <EndScreen className=''>
        <div className="flex justify-center content-center mt-5 mb-5">
          <Clock />
        </div>
        <div className="flex justify-center content-center mt-10 mb-5">
          <Routine setUpdateRoutineStep={setUpdateRoutineStep} updateRoutineStep={updateRoutineStep} currentTaskIndex={currentTaskList} />
        </div>
      </EndScreen>
      <div className="relative">
        <HelpButton onClick={handleButtonClick} />
        {showList && <HelpOptionList onClose={() => setShowList(false)} />}
      </div>
    </MainComponent >
  )
}
