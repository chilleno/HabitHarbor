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
import CookieModal from './components/CookieModal/CookieModal';
import WaterTracker from './components/WaterTracker/WaterTracker';
import { useCookies } from 'react-cookie'

export default function Home() {
  const [cookies, setCookie] = useCookies([
    'taskLists',
  ]);
  const [currentTask, setCurrentTask] = useState(0);
  const [currentTaskList, setCurrentTaskList] = useState(0);
  const [task, setTask] = useState(jsonData.data.tasks[currentTask]);
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
    if ((currentTaskList + 1) < cookies.taskLists.length) {
      setCurrentTaskList(currentTaskList + 1);
    }
  };

  const previousTaskList = () => {
    if ((currentTaskList - 1) >= 0) {
      setCurrentTaskList(currentTaskList - 1);
    }
  };

  const changeTaskList = (taskListIndex: number) => {
    if (taskListIndex >= 0 && taskListIndex < cookies.taskLists.length) {
      setCurrentTaskList(taskListIndex);
    }
  };


  useEffect(() => {
    setTask(jsonData.data.tasks[currentTask]);
  }, [currentTask, task]);

  return (
    <MainComponent>
      <CookieModal />
      <StartScreen className=''>
        <div className=''>
          <Clock />
        </div>
        <div className=''>
          <PomodoroTimer />
        </div>
        <div className=''>
          <WaterTracker />
        </div>
      </StartScreen>
      <MiddleScreen className=''>
        <TaskList
          tasks={jsonData.data.tasks}
          currentTaskListIndex={currentTaskList}
          nextTaskList={nextTaskList}
          previousTaskList={previousTaskList}
          changeTaskList={changeTaskList}
        />
      </MiddleScreen>
      <EndScreen className=''>
        <Routine tasks={jsonData.data.tasks} currentTaskIndex={currentTask} />
      </EndScreen>
    </MainComponent >
  )
}
