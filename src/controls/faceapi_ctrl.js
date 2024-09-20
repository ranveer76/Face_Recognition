import * as faceapi from 'face-api.js';

export default {
    async loadModels() {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(() => {
            console.log('Models loaded.');
        }).catch((error) => {
            console.error('Error loading models.', error);
        });
    },
    async detectFace(video) {
        if(!video) return;
        const canvas = faceapi.createCanvasFromMedia(video);
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1000';
        const { width: videoWidth, height: videoHeight, top: videoTop, left: videoLeft } = video.getBoundingClientRect();
        canvas.style.top = `${videoTop}px`;
        canvas.style.left = `${videoLeft}px`;
        const displaySize = { width: videoWidth, height: videoHeight };
        if (displaySize.width === 0 || displaySize.height === 0) return;
        faceapi.matchDimensions(canvas, displaySize);
        video.parentNode.append(canvas);
        
        setInterval(async () => {
            const detections = await this.captureDetection(video);
            if (!detections || detections.length === 0) return;
            // console.log('detections:', detections);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d',{ willReadFrequently: true }).clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 100);
    },
    async captureDetection(video) {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
        return detections;
    }
};