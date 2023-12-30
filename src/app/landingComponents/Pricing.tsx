"use client";
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

const Pricing = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session !== undefined) {
            setLoading(false)
        }
    }, [session])

    if (loading) {
        return (<div className="text-center">{"Loading...."}</div>)
    }

    if (session && session.user && loading === false) {
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
                            <p>Get all features and new free ones</p>
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
                            <p>Get all features and all the new ones</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Data saved on database</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Early access to new features</p>
                        </div>
                        {
                            session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' ?
                                <a href='/app' className=" border-2 border-solid border-black rounded-xl text-center text-lg py-3 mt-4">
                                    Choose plan
                                </a>
                                :
                                <a href={"https://habitharbor.lemonsqueezy.com/checkout/buy/49db8caf-69df-44c8-85be-9460b0131666?checkout[custom][user_id]=" + session.user.id} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                                    {"Choose plan"}
                                </a>
                        }
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
                            <p>Get all features and all the new ones</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Data saved on database</p>
                        </div>
                        <div className="flex">
                            <Image width={20} height={24} src='/assets/logos/CheckedBox.svg' alt="" />
                            <p>Early access to new features</p>
                        </div>
                        {
                            session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' ?
                                <a href='/app' className=" border-2 border-solid border-black rounded-xl text-center text-lg py-3 mt-4">
                                    Choose plan
                                </a>
                                :
                                <a href={"https://habitharbor.lemonsqueezy.com/checkout/buy/a4c419e3-b99a-4ad8-a3b4-0e0efd654fa4?checkout[custom][user_id]=" + session.user.id} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                                    {"Choose plan"}
                                </a>
                        }
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
                        {
                            session.user.profile_id === '966536f3-a528-4754-a474-2b7be0cff440' ?
                                <a href='/app' className=" border-2 border-solid border-black rounded-xl text-center text-lg py-3 mt-4">
                                    Choose plan
                                </a>
                                :
                                <a href={"https://habitharbor.lemonsqueezy.com/checkout/buy/e5382f9c-c1ba-448e-9b3d-73d62b88b746?checkout[custom][user_id]=" + session.user.id} className=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4 text-center">
                                    {"Choose plan"}
                                </a>
                        }
                    </div>
                </div>
            </section>
        )
    }

    if (loading === false) {
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
}

export default Pricing;