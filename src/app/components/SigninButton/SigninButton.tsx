"use client";
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
const SigninButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div>
                <span className="mr-6">  <b>{session.user.name}</b></span>
                <button className="py-2 px-4 text-black bg-white border-2 border-black rounded-3xl"
                    onClick={() => { signOut({ callbackUrl: '/' }) }}
                >
                    Sign out
                </button>
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