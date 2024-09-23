import React from 'react';
import { useAppContext } from '../context/AppContext';
import Video from '../components/Video';

export default function Home() {
    const { capturing } = useAppContext();
    return (
        <div className='home'>
            {   capturing &&
                <Video />
            }
        </div>
    );
}