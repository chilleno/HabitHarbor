import React, { useState, useEffect } from 'react';
import { CogIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import FloatingButton from '@/app/designComponent/FloatingButton';
import Image from 'next/image';

const Water: React.FC = () => {
    const [today] = useState(new Date());
    const [waterAmount, setWaterAmount] = useState<number>(0);
    const [maxWaterAmount, setMaxWaterAmount] = useState<number>(12);
    const [trackMode, setTrackMode] = useState<string>("CUPS");
    const [isCooldown, setIsCooldown] = useState<boolean>(false);
    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleWaterAmountChange = (newAmount: number, effectCount: boolean, effectReset: boolean) => {
        if (!isCooldown && newAmount >= 0 && newAmount <= maxWaterAmount) {
            setIsCooldown(true);
            setWaterAmount(newAmount);
            localStorage.setItem('waterDrinkAmount', newAmount.toString());
            if (effectCount) {
                playSoundCountWater();
            }
            if (effectReset) {
                playSoundResetWater();
            }
            setTimeout(() => {
                setIsCooldown(false);
            }, 1000);
        }
    }

    const playSoundCountWater = () => {
        const audio = new Audio('/static/sounds/waterTrackCount.wav');
        audio.play();
    };

    const playSoundResetWater = () => {
        const audio = new Audio('/static/sounds/waterTrackReset.wav');
        audio.play();
    };

    useEffect(() => {
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
        if (localStorage.waterTrackMethod === "BOTTLES") {
            setMaxWaterAmount(3);
        } else if (localStorage.waterTrackMethod === "CUPS") {
            setMaxWaterAmount(12);
        }
        if (localStorage.waterDrinkAmount !== null && Number(localStorage.waterDrinkAmount) >= 0) {
            setWaterAmount(Number(localStorage.waterDrinkAmount));
        }
        if (localStorage.waterTrackMethod !== null && localStorage.waterTrackMethod !== "") {
            setTrackMode(localStorage.waterTrackMethod);
        }
        if (localStorage.waterTrackMethod === undefined) {
            localStorage.setItem('waterTrackMethod', 'CUPS');
            setTrackMode('CUPS');
        }
        setInitialRenderComplete(true);
    }, []);


    const getPercentage = (done: number, max: number): number => {
        return Math.round((done / max) * 100 / 10) * 10;
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const updateTrackMode = (newTrackMode: React.SetStateAction<string>) => {
        if (window.confirm('This action will reset the water count, are you sure you want to continue?')) {
            if (newTrackMode === "BOTTLES") {
                setMaxWaterAmount(3);
            } else if (newTrackMode === "CUPS") {
                setMaxWaterAmount(12);
            }
            setTrackMode(newTrackMode);
            localStorage.setItem('waterTrackMethod', newTrackMode.toString());
            setWaterAmount(0);
            closeModal();
        }
    }

    if (!initialRenderComplete) {
        return null;
    } else {
        return (
            <>
                <div className="relative bg-white border-water border-2 rounded-xl p-2">
                    <div className="flex flex-row gap-3 z-10">
                        <div className="w-2/12">
                            <div className="h-[34px] w-[34px] bg-water rounded-md shadow-habit py-1 text-xl justify-center content-center flex">
                                💧
                            </div>
                        </div>
                        <div className="w-8/12">
                            <h1 className="text-main-primary font-bold text-sm">DRINK WATER</h1>
                            <h1 className="text-water font-bold text-xs"> {waterAmount}/{maxWaterAmount} {trackMode}</h1>
                        </div>
                        <span onClick={openModal} className="flex items-center justify-center hover:cursor-pointer">
                            <CogIcon className="h-[24px] w-[24px] text-water" />
                        </span>
                        <div className="w-2/12 text-water flex justify-center content-center py-2">
                            <PlusIcon
                                className={`animate-delay-100 animate-fadeIn ${waterAmount === maxWaterAmount && 'hidden'
                                    } ${isCooldown && 'opacity-0 animate-fadeOut'} h-[24px] w-[24px] text-water hover:cursor-pointer`}
                                onClick={() => handleWaterAmountChange(waterAmount + 1, true, false)}
                            />
                            <div className={`absolute ${!isCooldown ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                                <Image
                                    width={20}
                                    height={20}
                                    src="/icons/loading.svg"
                                    className={`animate-twSpin animate-infinite h-[24px] w-[24px] text-water`}
                                    alt="loading..."
                                />
                            </div>
                            <ArrowPathIcon
                                className={`animate-delay-100 animate-fadeIn ${!(waterAmount === maxWaterAmount) && 'hidden'} ${isCooldown && 'opacity-0'} h-[24px] w-[24px] text-water hover:cursor-pointer`}
                                onClick={() => handleWaterAmountChange(0, false, true)}
                            />
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div
                        className={`absolute bottom-0 -left-0 bg-water h-2 ${getPercentage(waterAmount, maxWaterAmount) === 100 ? 'rounded-b-xl' : 'rounded-bl-xl'} ${getPercentage(waterAmount, maxWaterAmount) === 0 && 'opacity-0'} transition-all duration-500`}
                        style={{
                            width: `${(waterAmount / maxWaterAmount) * 100}%`,
                        }}
                    >

                    </div>
                </div>
                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
                        <div className="bg-black p-4 rounded-3xl shadow w-auto sm:w-80 text-white border-[2px] border-white">
                            <h2 className="text-xl font-bold mb-4">Edit Water Tacker</h2>
                            <div className="flex flex-col">
                                <select className="text-main-primary rounded-full py-2" value={trackMode} onChange={(e) => updateTrackMode(e.target.value)}>
                                    <option value="CUPS">CUPS</option>
                                    <option value="BOTTLES">BOTTLES</option>
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
            </>
        );
    }
};

export default Water;