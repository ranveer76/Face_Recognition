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
    async detectFace(video, canvas, interval) {
        if (!video) return;
        const { width: videoWidth, height: videoHeight, top: videoTop, left: videoLeft } = video.getBoundingClientRect();
        if (videoWidth === 0 || videoHeight === 0) return;
        const displaySize = { width: videoWidth, height: videoHeight };
        if (!canvas) {
            console.log('Creating canvas.');
            canvas = faceapi.createCanvasFromMedia(video);
            canvas.style.position = 'absolute';
            canvas.style.zIndex = '1000';
        }
        canvas.style.top = `${videoTop}px`;
        canvas.style.left = `${videoLeft}px`;
        canvas.style.width = `${videoWidth}px`;
        canvas.style.height = `${videoHeight}px`;
        if (displaySize.width === 0 || displaySize.height === 0) return;
        faceapi.matchDimensions(canvas, displaySize);
        video.parentNode.append(canvas);
        clearInterval(interval);
        interval = setInterval(async () => {
            try {
                if (!video || videoHeight === 0 || videoWidth === 0) { console.log('returning'); clearInterval(interval); return; }
                const detections = await this.captureDetection(video);
                if (!detections || detections.length === 0) {canvas.getContext('2d',{ willReadFrequently: true }).clearRect(0, 0, canvas.width, canvas.height); return;}
                // console.log('detections:', detections);
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                if (!canvas || canvas.width === 0 || canvas.height === 0) return;
                canvas.getContext('2d',{ willReadFrequently: true }).clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            } catch (error) {
                clearInterval(interval);
            }
        }, 100);
    },
    async captureDetection(video) {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
        return detections;
    }
};