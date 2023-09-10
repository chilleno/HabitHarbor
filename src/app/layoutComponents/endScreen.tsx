import { ReactNode } from 'react';

export const useEndScreen = () => {
  const screen = {
    EndScreen,
  }
  return screen;
};

const EndScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`w-3/12 ${className}`}>
      {children}
    </div>
  );
};
