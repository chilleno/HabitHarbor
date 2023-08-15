import React, { useEffect, useRef } from 'react';

const HelpOptionList: React.ForwardRefRenderFunction<HTMLDivElement, HelpOptionListProps> = ({ onClose }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const options: HelpButtonOption[] = [
        {
            text: 'Feature Request',
            url: 'https://chaintask.canny.io/issues',
        },
        {
            text: 'Report issue',
            url: 'https://chaintask.canny.io/feature-requests',
        },
        {
            text: 'Roadmap',
            url: 'https://chaintask.canny.io',
        },
        {
            text: 'What\'s new',
            url: 'https://chaintask.canny.io/changelog',
        },
        {
            text: 'How to use',
            url: 'https://google.com',
        },
        {
            text: 'Pricing (soon)',
            url: 'https://google.com',
        },
        {
            text: 'Twitter',
            url: 'https://twitter.com/chill__eno',
        },
    ];

    const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={listRef} className="absolute bottom-16 right-4 bg-main-primary border-2 w-40 rounded-lg shadow-md">
            {options.map((option, index) => (
                <>
                    {option.text === "Twitter" && <hr />}
                    <div onClick={() => window.open(option.url, '_blank')} key={index} className="px-4 py-2 hover:bg-white hover:text-main-primary cursor-pointer">
                        {option.text}
                    </div>
                </>
            ))}
        </div>
    );
};

export default HelpOptionList;
