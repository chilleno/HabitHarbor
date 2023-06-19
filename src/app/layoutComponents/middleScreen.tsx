import { ReactNode } from 'react';

export const useMiddleScreen = () => {
  const screen = {
    MiddleScreen,
  }
  return screen;
};

const MiddleScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`bg-[blue] lg:basis-4/6 sm:h-3/5 lg:min-h-screen ${className}`}>
      {children}
    </div>
  );
};
