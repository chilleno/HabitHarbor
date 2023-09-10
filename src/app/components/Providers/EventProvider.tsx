"use client";
import React, { ReactNode, useEffect } from "react";

interface EventProviderProps {
    children: ReactNode;
}

const EventProvider = (props: EventProviderProps) => {

    useEffect(() => {
        document.addEventListener('pomodorodatachanged', () => {
            console.log('pomodoro data changed');
        });

        document.addEventListener('habitsdatachanged', () => {
            console.log('habits data changed');
        });

    }, []);

    return <>
        {props.children}
    </>;
}

export default EventProvider;