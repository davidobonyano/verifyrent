"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import * as faceapi from "@vladmandic/face-api";
import {
    Camera, ShieldCheck, RefreshCw, AlertCircle,
    CheckCircle2, CameraOff, Loader2, ArrowRight,
    Scan, UserCheck, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

export default function IdentityVerificationClient() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "scanning" | "success" | "error" | "no-camera">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [detectionScore, setDetectionScore] = useState(0);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Step state
    const [currentStep, setCurrentStep] = useState(1);

    // 1. Load Face API Models
    useEffect(() => {
        const loadModels = async () => {
            try {
                setStatus("loading");
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                ]);
                setModelsLoaded(true);
                setStatus("idle");
            } catch (err) {
                console.error("Error loading models:", err);
                setStatus("error");
                setErrorMessage("Failed to load AI models. Please check your connection.");
            }
        };
        loadModels();
    }, []);

    // 2. Camera Access
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: 720, height: 720 },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                };
            }
            setStatus("scanning");
            setErrorMessage("");
        } catch (err) {
            console.error("Camera access denied:", err);
            setStatus("no-camera");
            setErrorMessage("Camera access is required for verification. Please enable it in browser settings.");
        }
    };

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    // 3. Face Detection Loop
    useEffect(() => {
        let detectorInterval: NodeJS.Timeout;

        if (status === "scanning" && videoRef.current && modelsLoaded) {
            detectorInterval = setInterval(async () => {
                if (!videoRef.current) return;

                const detections = await faceapi.detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 })
                );

                if (detections) {
                    setDetectionScore(Math.round(detections.score * 100));
                } else {
                    setDetectionScore(0);
                }
            }, 500);
        }

        return () => clearInterval(detectorInterval);
    }, [status, modelsLoaded]);

    const captureFace = async () => {
        if (!videoRef.current) return;

        setStatus("loading");

        // Take a snapshot
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoRef.current, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg");
        setPreviewImage(dataUrl);

        // Perform final analysis
        const finalDetection = await faceapi.detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.6 })
        );

        if (finalDetection) {
            // Simulated backend call
            setTimeout(() => {
                setStatus("success");
                stopCamera();
            }, 2000);
        } else {
            setStatus("error");
            setErrorMessage("Face not clearly detected. Please hold still and try again.");
            setTimeout(() => setStatus("scanning"), 3000);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-vr-gray/20 font-sans">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                <div className="section-container max-w-4xl">
                    {/* Progress Header */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-vr-navy/5 p-8 border border-vr-silver/30 mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-vr-navy">Identity Verification</h1>
                                <p className="text-vr-navy/60">Help us keep VerifyRent safe for everyone.</p>
                            </div>
                            <div className="hidden md:flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-vr-teal text-white' : 'bg-vr-gray text-vr-navy/30'}`}>1</div>
                                <div className="w-8 h-0.5 bg-vr-silver/30" />
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-vr-teal text-white' : 'bg-vr-gray text-vr-navy/30'}`}>2</div>
                                <div className="w-8 h-0.5 bg-vr-silver/30" />
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-vr-teal text-white' : 'bg-vr-gray text-vr-navy/30'}`}>3</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Left: Dynamic Scanner Area */}
                            <div className="relative aspect-square md:aspect-auto md:h-[450px] bg-vr-navy rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <AnimatePresence mode="wait">
                                    {status === "idle" && (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="h-full flex flex-col items-center justify-center text-center p-8"
                                        >
                                            <div className="w-24 h-24 bg-vr-teal/20 rounded-[2rem] flex items-center justify-center mb-6">
                                                <Camera className="w-12 h-12 text-vr-teal" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Ready to start?</h3>
                                            <p className="text-white/60 mb-8">Position your face within the frame in a well-lit area.</p>
                                            <Button
                                                onClick={startCamera}
                                                disabled={!modelsLoaded}
                                                className="bg-vr-teal hover:bg-vr-teal/90 rounded-2xl h-14 px-8 text-lg"
                                            >
                                                {modelsLoaded ? "Unlock Camera" : "Loading AI..."}
                                            </Button>
                                        </motion.div>
                                    )}

                                    {status === "scanning" && (
                                        <motion.div
                                            key="scanning"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="h-full relative"
                                        >
                                            <video
                                                ref={videoRef}
                                                autoPlay muted playsInline
                                                className="w-full h-full object-cover scale-x-[-1]"
                                            />
                                            {/* Scanning Overlay */}
                                            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                                                <div className="w-64 h-64 md:w-80 md:h-80 border-2 border-dashed border-vr-teal/50 rounded-full relative">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 border-t-4 border-vr-teal rounded-full"
                                                    />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <div className={`text-2xl font-bold ${detectionScore > 70 ? 'text-vr-teal' : 'text-white/40'}`}>
                                                            {detectionScore}% Match
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-8 bg-vr-navy/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                                    <p className="text-white font-medium">Keep your head still and center</p>
                                                </div>
                                            </div>

                                            <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center">
                                                <Button
                                                    onClick={captureFace}
                                                    disabled={detectionScore < 75}
                                                    className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-vr-teal hover:bg-vr-teal/90 shadow-2xl scale-125 md:scale-100"
                                                >
                                                    <div className="w-12 h-12 border-4 border-white/30 rounded-full flex items-center justify-center">
                                                        <div className="w-8 h-8 bg-white rounded-full" />
                                                    </div>
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {status === "loading" && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="h-full flex flex-col items-center justify-center bg-vr-navy"
                                        >
                                            <Loader2 className="w-16 h-16 text-vr-teal animate-spin mb-4" />
                                            <h3 className="text-xl font-bold text-white">Analyzing Biometrics...</h3>
                                        </motion.div>
                                    )}

                                    {status === "success" && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                            className="h-full bg-emerald-500 flex flex-col items-center justify-center p-8 text-center"
                                        >
                                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">Verification Success!</h3>
                                            <p className="text-white/80">Your identity has been confirmed and biometrically matched.</p>
                                        </motion.div>
                                    )}

                                    {status === "error" && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="h-full bg-red-500 flex flex-col items-center justify-center p-8 text-center"
                                        >
                                            <AlertCircle className="w-20 h-20 text-white mb-6" />
                                            <h3 className="text-xl font-bold text-white mb-2">Detection Failed</h3>
                                            <p className="text-white/80 mb-8">{errorMessage}</p>
                                            <Button onClick={startCamera} variant="outline" className="text-white border-white hover:bg-white/10 rounded-2xl">
                                                Try Again
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right: Info & Steps */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-vr-teal/10 flex items-center justify-center">
                                            <Scan className="w-4 h-4 text-vr-teal" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-vr-navy">Instant Biometric Mapping</h4>
                                            <p className="text-sm text-vr-navy/50 tracking-tight">We map 64 unique facial biometrics to ensure proof of life.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-vr-teal/10 flex items-center justify-center">
                                            <UserCheck className="w-4 h-4 text-vr-teal" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-vr-navy">Real-time Matching</h4>
                                            <p className="text-sm text-vr-navy/50 tracking-tight">Matches your live scan against your government ID record.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-vr-teal/10 flex items-center justify-center">
                                            <Smartphone className="w-4 h-4 text-vr-teal" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-vr-navy">Secure Submission</h4>
                                            <p className="text-sm text-vr-navy/50 tracking-tight">Encrypted multi-factor data transit to our verification engine.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-vr-silver/30" />

                                <div className="bg-vr-gray/50 rounded-3xl p-6 border border-vr-silver/20">
                                    <h5 className="font-bold text-vr-navy mb-4">Verification Tips</h5>
                                    <ul className="space-y-3 text-sm text-vr-navy/60">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-vr-teal" />
                                            Ensure your face is in good lighting
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-vr-teal" />
                                            Remove hats, glasses or hair from face
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-vr-teal" />
                                            Stay still during the 3D capture process
                                        </li>
                                    </ul>
                                </div>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 text-lg">
                                                Proceed to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
