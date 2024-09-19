import React, { useEffect } from 'react';
import { useErrorContext } from '../context/ErrorContext';

export default function Popup() {
    const { error, setError } = useErrorContext();
    useEffect(() => {

        const timeout = setTimeout(() => {
            setError('');
        }, 2000);
        return () => clearTimeout(timeout);
    }, [error, setError]);
    return (
        <>
            {error && (
                <div className="popup">
                    <div className="popup-inner">
                        <p><span>{error.code}!</span> {error.message}</p>
                        <button onClick={() => setError('')}>X</button>
                    </div>
                </div>
            )}
        </>
    );
}