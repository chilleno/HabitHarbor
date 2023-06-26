import { ReactNode } from 'react';

export const useMainComponent = () => {
  const component = {
    MainComponent,
  }
  return component;
};

const MainComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main>
      <div className="flex lg:flex-row md:flex-col sm:flex-col sm:h-screen max-h-screen overflow-hidden" >
        {children}
      </div>
    </main>
  );
};
