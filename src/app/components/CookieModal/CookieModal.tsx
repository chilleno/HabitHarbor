import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'

const Modal = () => {
    const [cookies, setCookie] = useCookies(['acceptCookies', 'pomodoroDuration', 'shortBreakDuration', 'longBreakDuration', 'pomodorosForLongBreak']);
    const [showModal, setShowModal] = useState(false);

    const handleAccept = () => {
        // Save data in cookies
        setCookie('acceptCookies', 'true')
        setCookie('pomodoroDuration', 25);
        setCookie('shortBreakDuration', 5);
        setCookie('longBreakDuration', 15);
        setCookie('pomodorosForLongBreak', 4);
     
        // Close the modal
        setShowModal(false);
        window.location.reload();
    };

    const handleClose = () => {
        // Redirect to google.com
        window.location.href = 'https://www.google.com';
    };

    useEffect(() => {
        // Check if the acceptCookies value is set to true
        const acceptCookies = cookies.acceptCookies;
        // Set the showModal state based on the acceptCookies value
        setShowModal(!acceptCookies);
    }, []);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black ${showModal ? 'block' : 'hidden'
                }`}
        >
            <div className="bg-white text-black px-8 py-6 max-w-md">
                <p className="text-xl mb-4">
                    Can we use cookies in this web app?
                </p>
                <p className="mb-4">
                    We use cookies to provide you with a better browsing experience and
                    personalized content.
                </p>
                <div className="flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 bg-black text-white rounded"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="px-4 py-2 bg-black text-white rounded"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
