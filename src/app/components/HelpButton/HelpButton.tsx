import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const HelpButton: React.FC<QuestionButtonProps> = ({ onClick }) => {
    return (
        <QuestionMarkCircleIcon
            onClick={onClick}
            className="fixed bottom-4 right-4 w-12 h-12 flex justify-center items-center cursor-pointer z-50"
        />
    );
};

export default HelpButton;