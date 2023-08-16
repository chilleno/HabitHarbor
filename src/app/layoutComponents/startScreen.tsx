import { ReactNode } from 'react';

export const useStartScreen = () => {
  const screen = {
    StartScreen,
  }
  return screen;
};

const StartScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`xl:w-4/12 lg:w-3/12 sm:h-2/6 lg:min-h-screen  ${className}`}>
      {children}
    </div>
  );
};
