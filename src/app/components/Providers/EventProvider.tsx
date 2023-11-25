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
    }, []);

    useEffect(() => {
        document.addEventListener('habitsdatachanged', () => {
            console.log('habits data changed');
        });
    }, []);

    useEffect(() => {
        document.addEventListener('routinedatachanged', () => {
            console.log('routine data changed');
        });
    }, []);

    useEffect(() => {
        document.addEventListener('taskListdatachanged', () => {
            console.log('taskList data changed');
        });
    }, []);

    useEffect(() => {
        document.addEventListener('tasksdatachanged', () => {
            console.log('tasks data changed');
        });
    }, []);

    return <>
        {props.children}
    </>;
}

export default EventProvider;