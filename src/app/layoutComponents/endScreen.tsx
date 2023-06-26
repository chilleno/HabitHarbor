import { ReactNode } from 'react';

export const useEndScreen = () => {
  const screen = {
    EndScreen,
  }
  return screen;
};

const EndScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`lg:basis-2/6 sm:h-2/6 lg:h-screen  sm:max-h-[100%] ${className}`}>
      {children}
    </div>
       
  );
};
