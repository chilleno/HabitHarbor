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
                            <span className="font-normal text-base"> / month </span>
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
                        <a href={"https://habitharbor.lemonsqueezy.com/checkout/buy/52533b6f-60a2-4aad-a75a-7c94c1e7574e?checkout[custom][user_id]=" + session.user.id} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                            {"Choose plan"}
                        </a>
                    </div>

                    <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-12'>
                        <h3 className="font-pt-serif font-normal text-2xl mb-4">
                            HabitHarbor+
                        </h3>
                        <div className="font-montserrat font-bold text-2xl mb-4">
                            $29,99
                            <span className="pl-2 text-sm line-through">$59,88</span>
                            <span className="font-normal text-base"> / year </span>
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
                        <a href={"https://habitharbor.lemonsqueezy.com/checkout/buy/f3610d3e-4942-4274-882c-55d8111a6dff?checkout[custom][user_id]=" + session.user.id} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                            {"Choose plan"}
                        </a>
                    </div>



                    <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-24'>
                        <h3 className="font-pt-serif font-normal text-2xl mb-4">
                            HabitHarbor+ (Founders plan)
                        </h3>
                        <div className="font-montserrat font-bold text-2xl mb-4">
                            $99,99
                            <span className="font-normal text-base"> / Pay once, use forever</span>
                        </div>

                        <div className="flex">
                            <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>All benefits of HabitHarbor+</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Lifetime Access</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Only 50 spots left</p>
                        </div>

                        <a href={"https://habitharbor.lemonsqueezy.com/checkout/buy/357a35c3-2586-4c2d-9c6c-28d8132219a3?checkout[custom][user_id]=" + session.user.id} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                            {"Choose plan"}
                        </a>
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
                        <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Get all features and new ones</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>{"Data saved on locally"}</p>
                    </div>

                    <button onClick={() => { signIn('google', { callbackUrl: '/app' }) }} className=" border-2 border-solid border-black rounded-xl text-center text-lg py-3 mt-4">
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
                        <span className="font-normal text-base"> / month </span>
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
                    <button onClick={() => { signIn('google', { callbackUrl: '/redirect?plan=monthly' }) }} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                        {"Choose plan"}
                    </button>
                </div>

                <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-12'>
                    <h3 className="font-pt-serif font-normal text-2xl mb-4">
                        HabitHarbor+
                    </h3>
                    <div className="font-montserrat font-bold text-2xl mb-4">
                        $29,99
                        <span className="pl-2 text-sm line-through">$59,88</span>
                        <span className="font-normal text-base"> / year </span>
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
                    <button onClick={() => { signIn('google', { callbackUrl: '/redirect?plan=yearly' }) }} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                        {"Choose plan"}
                    </button>
                </div>



                <div className='flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8 md:top-24'>
                    <h3 className="font-pt-serif font-normal text-2xl mb-4">
                        HabitHarbor+ (Founders plan)
                    </h3>
                    <div className="font-montserrat font-bold text-2xl mb-4">
                        $99,99
                        <span className="font-normal text-base"> / Pay once, use forever</span>
                    </div>

                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>All benefits of HabitHarbor+</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Lifetime Access</p>
                    </div>
                    <div className="flex">
                        <Image width={20} height={20} src='/assets/logos/CheckedBox.svg' alt="" />
                        <p>Only 50 spots left</p>
                    </div>

                    <button onClick={() => { signIn('google', { callbackUrl: '/redirect?plan=founder' }) }} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                        {"Choose plan"}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Pricing;