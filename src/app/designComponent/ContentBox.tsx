import { ReactNode } from 'react';

const ContentBox: React.FC<{ className?: string, children?: ReactNode }> = ({ className, children }) => {
    return (
        <div className={`flex flex-col shadow-main w-fit gap-1 py-3 px-8 rounded-3xl bg-main-light ${className}`}>
            {children}
        </div>
    );
};

export default ContentBox;