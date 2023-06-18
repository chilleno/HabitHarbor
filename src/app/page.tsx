"use client";

import { useMainComponent } from './layoutComponents/mainComponent';
import { useStartScreen } from './layoutComponents/startScreen';
import { useMiddleScreen } from './layoutComponents/middleScreen';
import { useEndScreen } from './layoutComponents/endScreen';
import { useClockComponent } from './components/Clock/Clock';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';

export default function Home() {
  const { MainComponent } = useMainComponent();
  const { StartScreen } = useStartScreen();
  const { MiddleScreen } = useMiddleScreen();
  const { EndScreen } = useEndScreen();
  const { Clock } = useClockComponent();

  return (
    <MainComponent>
      <StartScreen className=''>
        
      </StartScreen>
      <MiddleScreen className=''>
        
      </MiddleScreen>
      <EndScreen className=''>
        <div className='mb-4'>
          <Clock />
        </div>
        <div className='mb-4'>
          <PomodoroTimer />
        </div>
      </EndScreen>
    </MainComponent>
  )
}
