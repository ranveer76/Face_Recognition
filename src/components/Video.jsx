import React from 'react';
import Webcam from 'react-webcam';
import { useAppContext } from '../context/AppContext';

const Video = () => {
    const {videoRef} = useAppContext();

    return (
        <div>
            <Webcam
                audio={false}
                ref={videoRef}
                screenshotFormat="image/jpeg"
                imageSmoothing={true}
                videoConstraints={{
                    facingMode: 'user'
                }}
                controls={true}
                id="video"
            />
        </div>
    );
}

export default Video;