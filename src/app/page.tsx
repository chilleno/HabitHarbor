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
import Joyride from 'react-joyride';

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
  const [finishRender, setFinishRender] = useState<boolean>(false);

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
    
    if(currentStoredTaskLists.length === 0) {

      let taskList: TaskList = {
        name: 'Example Task List',
        highlightedTask: null,
        tasks: [],
      };

      let taskLists: TaskList[] = [];
      taskLists.push(taskList);
      localStorage.setItem('taskLists', JSON.stringify(taskLists));
      setCurrentTaskList(0);
    }

    setFinishRender(true);
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
            if (newSelectedStep && newSelectedStep.assignedTaskList > -1) {
              changeTaskList(newSelectedStep.assignedTaskList);
            }
          }
        }
        setUpdateRoutineStep(!updateRoutineStep);
      }
    }
  }

  if (!finishRender) {
    return null
  } else {
    return (
      <>
        <Joyride
          steps={[
            {
              content: (<h2>{"Let's begin our journey!"}</h2>),
              locale: { skip: (<strong aria-label="skip">{"S-K-I-P"}</strong>) },
              placement: 'center',
              target: 'body',
            },
            {
              target: '.pomodoro-timer',
              content: 'This is just a pomodoro timer, you can use it to focus on your tasks! You can also use it to track your pomodoros for your routines.  ',
            },
            {
              target: '.daily-habits',
              content: 'This is your daily habits tracker, you can use it to track your daily habits, like drinking water, meditating, reading, etc.',
            },
            {
              target: '.task-list-selector',
              content: 'This is your task list selector, you can use it to select your task list or create new ones.',
            },
            {
              target: '.task-list-todo',
              content: 'Here are your tasks to do, in the menu you can use our tool to add a priority to tasks. You can also pick one task and put it in the top with the fire button that appears when you hover over a task. You can also delete a task by clicking on the trash button.',
            },
            {
              target: '.task-list-done',
              content: 'Here are your done tasks, you can click on the task to mark it as done or undone. You can also delete a task by clicking on the trash button.',
            },
            {
              target: '.routine',
              content: 'This is your routine, you can use it to track your pomodoros for your routines. You can assign a task list to a routine step, so when you finish a step, the task list will be selected automatically.',
            },
            {
              content: (<h2>{"That's it at the moment. I hope this tool help you as much as it helps me on my daily tasks. Have a productive day!"}</h2>),
              placement: 'center',
              target: 'body',
            },
          ]}
          run={true}
          showProgress
          showSkipButton
          continuous
          hideCloseButton
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        <MainComponent>
          <StartScreen className=''>
            <div className="flex justify-center content-center mt-7 mb-5">
              <PomodoroTimer
                handleCurrentRoutineStepCount={handleCurrentRoutineStepCount}
              />
            </div>
            <div className="flex justify-center content-center mt-10 mb-5">
              <DailyHabits />
            </div>
          </StartScreen>
          <MiddleScreen className="">
            <div className="flex justify-center content-center mt-10">
              <TaskListSelector
                currentTaskListIndex={currentTaskList}
                changeTaskList={setCurrentTaskList}
              />
            </div>
            {
              currentTaskList >= 0 &&
              <>
                <div className="flex justify-center content-center mt-10 mb-5">
                  <TodoTasks
                    currentTaskListIndex={currentTaskList}
                    taskList={taskList}
                    setUpdateTaskList={setUpdateTaskList}
                    updateTaskList={updateTaskList}
                  />
                </div>
                <div className="flex justify-center content-center mt-10">
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
            <div className="flex justify-center content-center mt-4 mb-6">
              <Clock />
            </div>
            <div className="flex justify-center content-center mt-4">
              <Routine setUpdateRoutineStep={setUpdateRoutineStep} updateRoutineStep={updateRoutineStep} currentTaskIndex={currentTaskList} />
            </div>
          </EndScreen>
          <div className="relative">
            <HelpButton onClick={handleButtonClick} />
            {showList && <HelpOptionList onClose={() => setShowList(false)} />}
          </div>
        </MainComponent>
      </>
    )
  }
}
