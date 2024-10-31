'use client';
import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Fish(props) {
  // Load the GLB model
  const { scene } = useGLTF('/public/fish.glb'); // Ensure you have placed your fish.glb model in the /public/models/ directory

  return <primitive object={scene} {...props} />;
}
