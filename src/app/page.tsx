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


export default function Home() {
  const [currentTask, setCurrentTask] = useState(0);
  const [task, setTask] = useState(jsonData.data.tasks[currentTask]);
  const { MainComponent } = useMainComponent();
  const { StartScreen } = useStartScreen();
  const { MiddleScreen } = useMiddleScreen();
  const { EndScreen } = useEndScreen();

  const nextTask = () => {
    setCurrentTask(currentTask + 1);
  };

  const previousTask = () => {
    setCurrentTask(currentTask - 1);
  };

  useEffect(() => {
    setTask(jsonData.data.tasks[currentTask]);
  }, [currentTask, task]);

  return (
    <MainComponent>
      <StartScreen className=''>
        <TaskList tasks={jsonData.data.tasks} currentTaskIndex={currentTask} />
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
        <div className=''>
          <Clock />
        </div>
        <div className=''>
          <PomodoroTimer />
        </div>
      </EndScreen>
    </MainComponent>
  )
}
