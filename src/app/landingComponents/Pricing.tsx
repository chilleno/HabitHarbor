"use client";
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Pricing = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <section className="sectionSize bg-secondary py-0 " id="pricing">
                <div>
                    <h2 className="secondaryTitle bg-underline4 mb-0 bg-100%">Pricing</h2>
                </div>
                <div className="flex w-full flex-col md:flex-row">

                    <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-24'>
                        <h3 className="font-pt-serif font-normal text-2xl mb-4">
                            Free
                        </h3>
                        <div className="font-montserrat font-bold text-2xl mb-4">
                            $0
                            <span className="font-normal text-base"> / month</span>
                        </div>

                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Get all features and new ones</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>{"Data saved on locally"}</p>
                        </div>

                        <a href='/app' className=" border-2 border-solid border-black rounded-xl text-center text-lg py-3 mt-4">
                            Choose plan
                        </a>
                    </div>

                    <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-12'>
                        <h3 className="font-pt-serif font-normal text-2xl mb-4">
                            HabitHarbor+
                        </h3>
                        <div className="font-montserrat font-bold text-2xl mb-4">
                            $2,99
                            <span className="pl-2 text-sm line-through">$4,99</span>
                            <span className="font-normal text-base"> / month</span>
                        </div>

                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Get all features and new ones</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Data saved on database</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Early access to new features</p>
                        </div>
                        <button className="disabled border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
                            {"Choose plan (soon)"}
                        </button>
                    </div>
                    <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-24'>
                        <h3 className="font-pt-serif font-normal text-2xl mb-4">
                            HabitHarbor+ (Yearly)
                        </h3>
                        <div className="font-montserrat font-bold text-2xl mb-4">
                            $29,99
                            <span className="pl-2 text-sm line-through">$59,88</span>
                            <span className="font-normal text-base"> / year</span>
                        </div>

                        <div className="flex">
                            <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>All benefits of HabitHarbor+</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Discount for pay a year in advance </p>
                        </div>

                        <button className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
                            {"Choose plan (soon)"}
                        </button>
                    </div>

                </div>
            </section>
        )
    }
    return (
        <section className="sectionSize bg-secondary py-0 " id="pricing">
            <div>
                <h2 className="secondaryTitle bg-underline4 mb-0 bg-100%">Pricing</h2>
            </div>
            <div className="flex w-full flex-col md:flex-row">

                <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-24'>
                    <h3 className="font-pt-serif font-normal text-2xl mb-4">
                        Free
                    </h3>
                    <div className="font-montserrat font-bold text-2xl mb-4">
                        $0
                        <span className="font-normal text-base"> / month</span>
                    </div>

                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Get all features and new ones</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>{"Data saved on locally"}</p>
                    </div>

                    <button onClick={() => { signIn('google', { callbackUrl: '/app' }) }} className="disabled border-2 border-solid border-black rounded-xl text-center text-lg py-3 mt-4">
                        Choose plan
                    </button>
                </div>

                <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-12'>
                    <h3 className="font-pt-serif font-normal text-2xl mb-4">
                        HabitHarbor+
                    </h3>
                    <div className="font-montserrat font-bold text-2xl mb-4">
                        $2,99
                        <span className="pl-2 text-sm line-through">$4,99</span>
                        <span className="font-normal text-base"> / month</span>
                    </div>

                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Get all features and new ones</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Data saved on database</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Early access to new features</p>
                    </div>
                    <button className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
                        {"Choose plan (soon)"}
                    </button>
                </div>

                <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-24'>
                    <h3 className="font-pt-serif font-normal text-2xl mb-4">
                        HabitHarbor+ (Yearly)
                    </h3>
                    <div className="font-montserrat font-bold text-2xl mb-4">
                        $29,99
                        <span className="pl-2 text-sm line-through">$59,88</span>
                        <span className="font-normal text-base"> / year</span>
                    </div>

                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>All benefits of HabitHarbor+</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Discount for pay a year in advance </p>
                    </div>

                    <button className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
                        {"Choose plan (soon)"}
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Pricing;