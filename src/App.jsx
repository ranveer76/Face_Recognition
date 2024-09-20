import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppContext';
import Home from './pages/Home';
import Layout from './components/Layout';
import faceapi_ctrl from './controls/faceapi_ctrl';

export default function App() {
    const videoRef = React.useRef(null);
    const values = {
        videoRef
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
        
            await faceapi_ctrl.detectFace(video);
        } catch (error) {
            console.error("Error creating canvas:", error);
        }
    };
    useEffect(() => {
        handleLoad();
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