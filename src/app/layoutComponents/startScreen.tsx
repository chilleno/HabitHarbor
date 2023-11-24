import { ReactNode } from 'react';

export const useStartScreen = () => {
  const screen = {
    StartScreen,
  }
  return screen;
};

const StartScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`w-3/12 fixed inset-y-0 left-0 ${className}`}>
      {children}
    </div>
  );
};
