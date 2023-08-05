"use client"

import jsonData from './data.json';
import { useState, useEffect } from 'react';
import { useMainComponent } from './layoutComponents/mainComponent';
import { useStartScreen } from './layoutComponents/startScreen';
import { useMiddleScreen } from './layoutComponents/middleScreen';
import { useEndScreen } from './layoutComponents/endScreen';
import Clock from './components/Clock/Clock';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import TaskList from './components/TaskList/TaskList';
import Routine from './components/Routine/Routine';
import WaterTracker from './components/WaterTracker/WaterTracker';

interface Step {
  header: string;
  pomodoros: number;
  currentPomodorosCount: number;
  assignedTaskList: number;
  order: number;
}

export default function Home() {
  const [currentTask, setCurrentTask] = useState(0);
  const [currentTaskList, setCurrentTaskList] = useState(0);
  const [task, setTask] = useState(jsonData.data.tasks[currentTask]);
  const [updateRoutineStep, setUpdateRoutineStep] = useState(false);
  const { MainComponent } = useMainComponent();
  const { StartScreen } = useStartScreen();
  const { MiddleScreen } = useMiddleScreen();
  const { EndScreen } = useEndScreen();

  const nextTask = () => {
    if ((currentTask + 1) < jsonData.data.tasks.length) {
      setCurrentTask(currentTask + 1);
    }
  };

  const previousTask = () => {
    if ((currentTask - 1) >= 0) {
      setCurrentTask(currentTask - 1);
    }
  };

  const nextTaskList = () => {
    if ((currentTaskList + 1) < localStorage.taskLists.length) {
      setCurrentTaskList(currentTaskList + 1);
    }
  };

  const previousTaskList = () => {
    if ((currentTaskList - 1) >= 0) {
      setCurrentTaskList(currentTaskList - 1);
    }
  };

  const changeTaskList = (taskListIndex: number) => {
    if (taskListIndex >= 0 && taskListIndex < JSON.parse(localStorage.getItem('taskLists') || '[]').length) {
      setCurrentTaskList(taskListIndex);
    }
  };

  useEffect(() => {
    setTask(jsonData.data.tasks[currentTask]);
  }, [currentTask, task]);


  const handleCurrentRoutineStepCount = (): void => {
    if (typeof window !== 'undefined') {
      let currentRoutine: Step[] = JSON.parse(localStorage.getItem('routine') || '[]');
      let currentRoutineStep: number = Number(localStorage.getItem('currentRoutineStep') || '-1');

      if (currentRoutineStep > -1) {
        let step: Step = currentRoutine[currentRoutineStep];
        if (step.currentPomodorosCount < step.pomodoros) {
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
        <div className=''>
          <Clock />
        </div>
        <div className=''>
          <PomodoroTimer
            handleCurrentRoutineStepCount={handleCurrentRoutineStepCount}
          />
        </div>
        <div className=''>
          <WaterTracker />
        </div>
      </StartScreen>
      <MiddleScreen className=''>
        <TaskList
          currentTaskListIndex={currentTaskList}
          nextTaskList={nextTaskList}
          previousTaskList={previousTaskList}
          changeTaskList={changeTaskList}
        />
      </MiddleScreen>
      <EndScreen className=''>
        <Routine setUpdateRoutineStep={setUpdateRoutineStep} updateRoutineStep={updateRoutineStep} currentTaskIndex={currentTask} />
      </EndScreen>
    </MainComponent >
  )
}
