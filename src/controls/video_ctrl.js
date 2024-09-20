import faceapi_ctrl from "./faceapi_ctrl";

export const startMediaStream = async (videoRef) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
        videoRef.current.srcObject = stream;
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
};

export const stopMediaStream = (videoRef) => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
        track.stop();
    });
};

export const takeSnapshot = async (videoRef) => {
    const detections = await faceapi_ctrl.captureDetection(videoRef.current.video);
    if (!detections || detections.length === 0) return takeSnapshot(videoRef);
    const img = videoRef.current.getScreenshot();
    return { img, detections };
}

export const downloadSnapshot = (img) => {
    const a = document.createElement('a');
    a.href = img;
}