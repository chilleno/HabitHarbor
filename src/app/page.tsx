import { useMainComponent } from './mainComponent';
import { useStartScreen } from './startScreen';
import { useMiddleScreen } from './middleScreen';
import { useEndScreen } from './endScreen';

export default function Home() {
  const { MainComponent } = useMainComponent();
  const { StartScreen } = useStartScreen();
  const { MiddleScreen } = useMiddleScreen();
  const { EndScreen } = useEndScreen();

  return (
    <MainComponent>
      <StartScreen className=''>
        asdas
      </StartScreen>
      <MiddleScreen className=''>
        asdas
      </MiddleScreen>

      <EndScreen className=''>
        asdas
      </EndScreen>
    </MainComponent>
  )
}
