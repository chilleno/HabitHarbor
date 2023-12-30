"use client";
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Tooltip as ReactTooltip } from "react-tooltip";

const SigninButton = () => {
    const { data: session } = useSession();


    if (session && session.user) {
        return (
            <div className="flex gap-3">
                {
                    session.user.image &&
                    <div className="xl:text-lg lg:text-xs md:text-xs w-2/12 flex items-center">
                        <img width="50" height="50" className="rounded-full" src={session.user.image} alt="user_profile_image" />
                    </div>
                }
                <span className="w-8/12 flex flex-col content-center py-3">
                    <b className="xl:text-md lg:text-sm md:text-sm">{session.user.name}</b>
                    <b className="xl:text-md lg:text-sm md:text-sm">{session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' ? 'PRO USER' : 'FREE USER'}</b>
                </span>
                <div className="w-2/12 flex items-center justify-end">
                    <button className="py-3 px-3 text-black hover:text-white bg-white hover:bg-black border-2 border-black hover:border-white rounded-3xl xl:text-lg lg:text-xs" data-tooltip-id="logoutButton"
                        onClick={() => { signOut({ callbackUrl: '/' }) }}
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    </button>
                    <ReactTooltip
                        id="logoutButton"
                        place="bottom"
                        content="Logout"
                    />
                </div>
            </div>
        )
    }
    return (
        <button className="py-2 px-4 text-white bg-black rounded-3xl"
            onClick={() => { signIn('google', { callbackUrl: '/app' }) }}
        >
            Signup
        </button>
    )
}

export default SigninButton;