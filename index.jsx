// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18
import App from './App';
import './index.css'; // Your styles
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Three from './App.jsx'; // Assuming you have a Three.js component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
        <Canvas id="three-canvas-container" shadows>
            <Suspense fallback={null}>
                <Three />
            </Suspense>
        </Canvas>
    </React.StrictMode>
);


