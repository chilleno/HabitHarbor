import { ReactNode } from 'react';

export const useStartScreen = () => {
  const screen = {
    StartScreen,
  }
  return screen;
};

const StartScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`lg:basis-2/6 sm:h-2/6 lg:min-h-screen  ${className}`}>
      {children}
    </div>
  );
};
