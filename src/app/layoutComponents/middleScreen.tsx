import { ReactNode } from 'react';

export const useMiddleScreen = () => {
  const screen = {
    MiddleScreen,
  }
  return screen;
};

const MiddleScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`xl:w-5/12 lg:w-5/12 md:w-5/12 sm:h-2/6 ${className}`}>
      {children}
    </div>
  );
};
