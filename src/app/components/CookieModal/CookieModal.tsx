import React, { useState, useEffect } from 'react';

const Modal = () => {
    const cookieCutter = require('cookie-cutter');
    const [showModal, setShowModal] = useState(false);

    const handleAccept = () => {
        // Save data in cookies
        cookieCutter.set('acceptCookies', 'true')

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
        const acceptCookies = cookieCutter.get('acceptCookies');
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
