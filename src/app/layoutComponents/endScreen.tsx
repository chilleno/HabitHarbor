import { ReactNode } from 'react';

export const useEndScreen = () => {
  const screen = {
    EndScreen,
  }
  return screen;
};

const EndScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`lg:basis-2/6 sm:h-2/6 xl:h-screen lg:h-screen max-h-[90%] ${className}`}>
      {children}
    </div>
       
  );
};
