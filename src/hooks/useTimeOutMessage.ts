import { useState, useEffect } from 'react';

type Message = {
    text: string;
    type: 'success' | 'danger' | 'info' | 'warning';
    duration?: 3000 | 10000000; // Specify allowed durations
};

const useTimeOutMessage = () => {
    const [message, setMessage] = useState<Message | null>(null);

    useEffect(() => {
        if (message) {
            const timeoutDuration = message.duration || 3000; // Default to 3000ms if duration is not provided
            const timer = setTimeout(() => {
                setMessage(null); // Reset message after the specified duration
            }, timeoutDuration);

            return () => clearTimeout(timer); // Cleanup timeout on message change or unmount
        }
    }, [message]);

    return [message, setMessage] as const; // Return tuple with proper type
};

export default useTimeOutMessage;
