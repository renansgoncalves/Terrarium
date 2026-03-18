import * as THREE from 'three';

export function createTerrarium(scene) {
    const groundRadius = 20;
    const glassHeight = 15;

    // 1. O Chão Circular
    const groundGeometry = new THREE.CircleGeometry(groundRadius, 64);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: '#2a3b2a',
        roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 2. As Paredes de Vidro
    const glassGeometry = new THREE.CylinderGeometry(groundRadius, groundRadius, glassHeight, 64, 1, true);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x88ddff,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.8,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const terrariumGlass = new THREE.Mesh(glassGeometry, glassMaterial);
    terrariumGlass.position.y = glassHeight / 2;
    scene.add(terrariumGlass);

    // 3. O Anel de Acabamento
    const ringGeometry = new THREE.TorusGeometry(groundRadius, 0.2, 16, 64);
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });
    const topRing = new THREE.Mesh(ringGeometry, ringMaterial);
    topRing.position.y = glassHeight;
    topRing.rotation.x = -Math.PI / 2;
    scene.add(topRing);

    return { ground, terrariumGlass, topRing, groundRadius };
}