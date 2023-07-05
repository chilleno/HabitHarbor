import { ReactNode } from 'react';

export const useMiddleScreen = () => {
  const screen = {
    MiddleScreen,
  }
  return screen;
};

const MiddleScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`lg:basis-4/6 sm:h-2/6 lg:h-screen ${className}`}>
      {children}
    </div>
  );
};
