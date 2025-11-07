"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BaconBitcoin3DProps {
  className?: string;
  size?: number;
}

export function BaconBitcoin3D({ className = "", size = 96 }: BaconBitcoin3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      1, // Square aspect ratio
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Enable transparency
    });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);

    // Load the bacon-wrapped-bitcoin texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/bacon-wrapped-bitcoin.jpg');

    // Create the coin geometry
    const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 64);
    
    // Create material with bacon-wrapped-bitcoin texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      alphaTest: 0.1
    });

    const coin = new THREE.Mesh(geometry, material);
    coin.rotation.x = Math.PI / 2;
    scene.add(coin);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff8844, 0.4);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      coin.rotation.z += 0.01; 
      coin.rotation.x = Math.PI / 2 + Math.sin(Date.now() * 0.001) * 0.1; 
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div 
      ref={containerRef} 
      className={`${className}`}
      style={{ 
        width: size, 
        height: size,
        display: 'inline-block'
      }}
    />
  );
}