import { ReactNode } from 'react';

export const useEndScreen = () => {
  const screen = {
    EndScreen,
  }
  return screen;
};

const EndScreen: React.FC<{ className: string, children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={`w-3/12 fixed inset-y-0 right-0  ${className}`}>
      {children}
    </div>
  );
};
