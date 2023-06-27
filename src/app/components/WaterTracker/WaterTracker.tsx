"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { CogIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const WaterTracker = () => {
    const [today] = useState(new Date());
    const [cookies, setCookie] = useCookies([
        'acceptCookies',
        'firstWaterDate',
        'waterDrinkAmount',
        'waterTrackMethod',
    ]);
    const [waterAmount, setWaterAmount] = useState(parseInt(cookies.waterDrinkAmount));
    const [maxWaterAmount, setMaxWaterAmount] = useState(0);
    const [trackMode, setTrackMode] = useState(cookies.waterTrackMethod);
    const [showModal, setShowModal] = useState(false);

    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const handleWaterAmountChange = (newAmount: number, effect: boolean) => {
        if (cookies.acceptCookies === 'true') {
            if (newAmount >= 0 && newAmount <= maxWaterAmount) {
                setWaterAmount(newAmount);
                if (effect) {
                    playSound();
                }
            }
        }
    }

    const playSound = () => {
        const audio = new Audio('/static/sounds/minecraft-drink.mp3');
        audio.play();
    };

    const updateTrackMode = (newTrackMode: React.SetStateAction<string>) => {
        if (window.confirm('This action will reset the water count, are you sure you want to continue?')) {
            if(newTrackMode === "bottle"){
                setMaxWaterAmount(3);
            }else if(newTrackMode === "glass"){
                setMaxWaterAmount(12);
            }
            setTrackMode(newTrackMode);
            setCookie('waterTrackMethod', newTrackMode);
            setWaterAmount(0);
        }
    }

    const generateIcons = (): JSX.Element[] => {
        const icons: JSX.Element[] = [];
        let iconClass = "xl:h-7 xl:w-7 lg:w-5 lg:h-5 sm:h-5 sm:w-5 text-white-500";
        for (let i = 1; i <= maxWaterAmount; i++) {
            if (trackMode === 'glass') {
                if (waterAmount >= (i)) {
                    icons.push(<img src="/icons/filledGlass.svg" className={iconClass} alt="Glass Icon" />);
                } else {
                    icons.push(<img src="/icons/glass.svg" className={iconClass} alt="Glass Icon" />);
                }
            } else if (trackMode === 'bottle') {
                if (waterAmount >= (i)) {
                    icons.push(<img src="/icons/filledBottle.svg" className={iconClass} alt="Glass Icon" />);
                } else {
                    icons.push(<img src="/icons/bottle.svg" className={iconClass} alt="Glass Icon" />);
                }
            }
        }
        return icons;
    }


    useEffect(() => {
        if (cookies.acceptCookies === 'true') {
            // Save updated values to cookies
            let firstRepaymentDate = new Date(cookies.firstWaterDate);
            if (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0)) {
                setCookie('waterDrinkAmount', 0);
                setCookie('firstWaterDate', today);
            }
            setCookie('waterDrinkAmount', waterAmount);
            if (waterAmount === 1) {
                setCookie('firstWaterDate', today);
            }
        }
    }, [
        waterAmount,
    ]);

    useEffect(() => {
        if(cookies.waterTrackMethod === "bottle"){
            setMaxWaterAmount(3);
        }else if(cookies.waterTrackMethod === "glass"){
            setMaxWaterAmount(12);
        }
        setInitialRenderComplete(true);
    }, []);

    if (!initialRenderComplete) {
        return null;
    } else {
        return (
            <div className="flex flex-col items-center justify-center lg:h-auto text-white font-bold lg:p-5 sm:p-1">
                <div className="flex justify-center items-center center w-2/2 mt-5">
                    <h1>water tracker</h1>
                    <CogIcon onClick={openModal} className="h-5 w-5 text-white-500 ml-5 hover:cursor-pointer" />
                </div>
                <div className="flex flex-col items-center center w-2/2 mt-5">
                    <div className="lg:text-xl sm:text-md xl:text-3xl">
                        <span className="flex items-center justify-center">
                            <MinusIcon onClick={() => handleWaterAmountChange(waterAmount - 1, false)} className="h-5 w-5 text-white-500 hover:cursor-pointer mr-5" />
                            <>
                                {generateIcons()}
                            </>
                            <PlusIcon onClick={() => handleWaterAmountChange(waterAmount + 1, true)} className="h-5 w-5 text-white-500 hover:cursor-pointer ml-5" />
                        </span>
                    </div>
                    <div className="flex flex-col lg:mt-6 sm:mt-3 xl:text-xl lg:text-sm sm:text-sm" >
                        <div className="flex justify-center">
                            {waterAmount} / {maxWaterAmount}
                        </div>
                        <div className="flex justify-center xl:inline lg:inline sm:hidden">
                            {trackMode === 'glass' ? 'Glasses' : 'Bottles'} of water
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white">
                            <h2 className="text-xl font-bold mb-4">Edit Water Tacker</h2>
                            <div className="flex flex-col gap-2">
                                <select className="text-black rounded-full p-2" value={trackMode} onChange={(e) => updateTrackMode(e.target.value)}>
                                    <option value="glass">Glasses</option>
                                    <option value="bottle">Bottles</option>
                                </select>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default WaterTracker;
