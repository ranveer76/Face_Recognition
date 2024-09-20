import React from 'react';
import { useAppContext } from '../context/AppContext';
import Video from '../components/Video';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Video />
        </div>
    );
}