import { ReactNode } from 'react';

const FloatingButton: React.FC<{ className?: string, children?: ReactNode, onClick: Function }> = ({ className, children, onClick }) => {
    return (
        <button className={`flex bg-main-light h-[50px] w-[50px] rounded-full py-3 px-5 shadow-main content-center justify-center ${className}`} onClick={(e) => onClick(e)}>
            {children}
        </button>
    );
};

export default FloatingButton;