import { ReactNode } from 'react';

export const useEndScreen = () => {
  const screen = {
    EndScreen,
  }
  return screen;
};

const EndScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`bg-[green] lg:basis-2/6 sm:h-1/5 lg:min-h-screen ${className}`}>
      {children}
    </div>
       
  );
};
