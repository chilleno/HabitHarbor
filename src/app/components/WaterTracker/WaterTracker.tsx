"use client"
import React, { useState, useEffect } from 'react';
import { CogIcon, PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const WaterTracker = () => {
    const [today] = useState(new Date());
    const [waterAmount, setWaterAmount] = useState<number>(0);
    const [maxWaterAmount, setMaxWaterAmount] = useState<number>(12);
    const [trackMode, setTrackMode] = useState<string>("glass");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isCooldown, setIsCooldown] = useState<boolean>(false);

    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const handleWaterAmountChange = (newAmount: number, effect: boolean) => {
        if (!isCooldown && newAmount >= 0 && newAmount <= maxWaterAmount) {
            setIsCooldown(true);
            setWaterAmount(newAmount);
            localStorage.setItem('waterDrinkAmount', newAmount.toString());
            if (effect) {
                playSound();
            }
            setTimeout(() => {
                setIsCooldown(false);
            }, 2000);
        }
    }

    const playSound = () => {
        const audio = new Audio('/static/sounds/minecraft-drink.mp3');
        audio.play();
    };

    const updateTrackMode = (newTrackMode: React.SetStateAction<string>) => {
        if (window.confirm('This action will reset the water count, are you sure you want to continue?')) {
            if (newTrackMode === "bottle") {
                setMaxWaterAmount(3);
            } else if (newTrackMode === "glass") {
                setMaxWaterAmount(12);
            }
            setTrackMode(newTrackMode);
            localStorage.setItem('waterTrackMethod', newTrackMode.toString());
            setWaterAmount(0);
            closeModal();
        }
    }

    const generateIcons = (): JSX.Element[] => {
        const icons: JSX.Element[] = [];
        let iconClass = "xl:h-7 xl:w-7 lg:w-5 lg:h-5 sm:h-5 sm:w-5 text-white-500";
        for (let i = 1; i <= maxWaterAmount; i++) {
            if (trackMode === 'glass') {
                if (waterAmount >= (i)) {
                    icons.push(<Image width={20} height={20} key={'wte-' + i} src="/icons/filledGlass.svg" className={iconClass} alt="Glass Icon" />);
                } else {
                    icons.push(<Image width={20} height={20} key={'wte-' + i} src="/icons/glass.svg" className={iconClass} alt="Glass Icon" />);
                }
            } else if (trackMode === 'bottle') {
                if (waterAmount >= (i)) {
                    icons.push(<Image width={20} height={20} key={'wte-' + i} src="/icons/filledBottle.svg" className={iconClass} alt="Glass Icon" />);
                } else {
                    icons.push(<Image width={20} height={20} key={'wte-' + i} src="/icons/bottle.svg" className={iconClass} alt="Glass Icon" />);
                }
            }
        }
        return icons;
    }


    useEffect(() => {
        // Save updated values to cookies
        let firstRepaymentDate = new Date(localStorage.firstWaterDate);
        if (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0)) {
            localStorage.setItem('waterDrinkAmount', "0");
            localStorage.setItem('firstWaterDate', today.toString());
        }
        if (waterAmount === 1) {
            localStorage.setItem('firstWaterDate', today.toString());
        }
    }, [waterAmount]);

    useEffect(() => {
        let firstRepaymentDate = new Date(localStorage.firstWaterDate);
        if (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0)) {
            setWaterAmount(0);
        }
        if (localStorage.waterTrackMethod === "bottle") {
            setMaxWaterAmount(3);
        } else if (localStorage.waterTrackMethod === "glass") {
            setMaxWaterAmount(12);
        }
        if (localStorage.waterDrinkAmount !== null && Number(localStorage.waterDrinkAmount) >= 0) {
            setWaterAmount(Number(localStorage.waterDrinkAmount));
        }
        if (localStorage.waterTrackMethod !== null && localStorage.waterTrackMethod !== "") {
            setTrackMode(localStorage.waterTrackMethod);
        }
        if (localStorage.waterTrackMethod === undefined) {
            localStorage.setItem('waterTrackMethod', 'glass');
            setTrackMode('glass');
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
                {
                    waterAmount === maxWaterAmount ?
                        <div className="flex flex-col items-center center w-2/2 mt-5">
                            <div className="lg:text-xl sm:text-md xl:text-3xl">
                                <div className="flex flex-col gap-5 justify-center items-center center w-2/2 mt-5">
                                    <h1>Congrats!</h1>
                                    <a onClick={() => handleWaterAmountChange(0, false)} className="text-lg text-white-500 p-2 hover:cursor-pointer border-0 transition duration-300 ease-in-out hover:underline hover:animate-pulse" >Reset Timer</a>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col items-center center w-2/2 mt-5">
                            <div className="lg:text-xl sm:text-md xl:text-3xl">
                                <span className="flex items-center justify-center">
                                    <>
                                        {generateIcons()}
                                    </>
                                    <PlusIcon
                                        onClick={() => handleWaterAmountChange(waterAmount + 1, true)}
                                        className={`${isCooldown && 'hidden'} h-5 w-5 text-white-500 hover:cursor-pointer ml-5`}
                                    />
                                    <Image
                                        width={20}
                                        height={20}
                                        src="/icons/loading.svg"
                                        className={`${!isCooldown && 'hidden'} animate-spin h-5 w-5 text-white-500 hover:cursor-pointer ml-5`}
                                        alt="lading..."
                                    />
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
                }


                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
                        <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                            <h2 className="text-xl font-bold mb-4">Edit Water Tacker</h2>
                            <div className="flex flex-col">
                                <select className="text-black rounded-full py-2" value={trackMode} onChange={(e) => updateTrackMode(e.target.value)}>
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
