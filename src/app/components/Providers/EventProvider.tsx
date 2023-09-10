"use client";
import React, { ReactNode, useEffect } from "react";

interface EventProviderProps {
    children: ReactNode;
}

const EventProvider = (props: EventProviderProps) => {

    useEffect(() => {
        document.addEventListener('localdatachanged', () => {
            console.log('local data changed');
        });
    }, []);
    
    return <>
        {props.children}
    </>;
}

export default EventProvider;