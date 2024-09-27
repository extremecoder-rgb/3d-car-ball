import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { angleToRadians } from "./angle.js"; // Ensure this path is correct
import  gsap from "gsap";
import Car from "./car.jsx";
import * as THREE from "three";

function Three() {
    const orbitControlsRef = useRef(null);

    useFrame((state) => {
        if (orbitControlsRef.current) {
            const { x, y } = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
            orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
            orbitControlsRef.current.update();
        }
    });
    //animation
    const ballRef = useRef(null);
    useEffect(() => {
        if (ballRef.current) {
            const timeline = gsap.timeline({ paused: true });
            timeline.to(ballRef.current.position, { x: 1, duration: 2, ease: "power2.out" });
            timeline.to(ballRef.current.position, { y: 0.5, duration: 1, ease: "bounce.out" }, "<");
            timeline.play();
        }
    }, [ballRef]);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />

            {/* Ball */}
            <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Car */}
            <Car />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>

            {/* Lights */}
            <ambientLight intensity={0.3} />
            <spotLight
                position={[-3, 5, 0]}
                angle={0.5}
                penumbra={1}
                intensity={90}
                castShadow
            />

            {/* Environment */}
            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    );
}

export default function App() {
    return (
        <Canvas style={{ height: "100vh", width: "100vw" }}>
            <Three />
        </Canvas>
    );
}
