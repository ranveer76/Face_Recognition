import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
    const { Count } = useAppContext();
    return (
        <div>
            <h1>Home</h1>
            <Count />
        </div>
    );
}