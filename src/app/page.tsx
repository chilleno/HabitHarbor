"use client"

import jsonData from './data.json';
import { useState, useEffect } from 'react';
import { useMainComponent } from './layoutComponents/mainComponent';
import { useStartScreen } from './layoutComponents/startScreen';
import { useMiddleScreen } from './layoutComponents/middleScreen';
import { useEndScreen } from './layoutComponents/endScreen';
import Clock from './components/Clock/Clock';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import TaskDetail from './components/TaskDetail/TaskDetail';
import TaskList from './components/TaskList/TaskList';
import CookieModal from './components/CookieModal/CookieModal';
import { useCookies } from 'react-cookie'

export default function Home() {
  const [cookies, setCookie] = useCookies(['acceptCookies'])
  const [currentTask, setCurrentTask] = useState(0);
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
      </StartScreen>
      <MiddleScreen className=''>
        <TaskDetail
          header={task.header}
          description={task.description}
          nextTask={nextTask}
          previousTask={previousTask}
        />
      </MiddleScreen>
      <EndScreen className=''>
        <TaskList tasks={jsonData.data.tasks} currentTaskIndex={currentTask} />
      </EndScreen>
    </MainComponent >
  )
}
