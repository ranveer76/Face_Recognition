import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppContext';
import Home from './pages/Home';
import Layout from './components/Layout';
import faceapi_ctrl from './controls/faceapi_ctrl';

export default function App() {
    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const intervalRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(true);
    const values = {
        videoRef,
        capturing,
        setCapturing,
    };
    useEffect(() => {
        const loadModels = async () => {
            await faceapi_ctrl.loadModels();
        };
        loadModels();
    }, []);
    
    const handleLoad = async () => {
        const video = videoRef.current.video;
        
        const waitForVideo = new Promise((resolve) => {
            const checkVideoReady = () => {
                if (video.readyState === 4) {
                    resolve(video);
                } else {
                    setTimeout(checkVideoReady, 100);
                }
            };
            checkVideoReady();
        });
        
        try {
            await waitForVideo;
        
            await faceapi_ctrl.detectFace(video, canvasRef.current, intervalRef.current);
        } catch (error) {
            console.error("Error creating canvas:", error);
        }
    };
    useEffect(() => {
        if (capturing && videoRef && videoRef.current && videoRef.current.video) {
            handleLoad();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [videoRef]);

    return (
        <AppProvider value={values}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
        </AppProvider>
    );
}