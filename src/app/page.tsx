"use client";

import { useMainComponent } from './layoutComponents/mainComponent';
import { useStartScreen } from './layoutComponents/startScreen';
import { useMiddleScreen } from './layoutComponents/middleScreen';
import { useEndScreen } from './layoutComponents/endScreen';
import { useClockComponent } from './components/Clock/Clock';

export default function Home() {
  const { MainComponent } = useMainComponent();
  const { StartScreen } = useStartScreen();
  const { MiddleScreen } = useMiddleScreen();
  const { EndScreen } = useEndScreen();
  const { Clock } = useClockComponent();

  return (
    <MainComponent>
      <StartScreen className=''>
        asdas
      </StartScreen>
      <MiddleScreen className=''>
        asdas
      </MiddleScreen>

      <EndScreen className=''>
        <Clock />
      </EndScreen>
    </MainComponent>
  )
}
