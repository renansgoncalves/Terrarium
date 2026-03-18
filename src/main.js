import './style.css'
import * as THREE from 'three';
import { setupEnvironment } from './rendering/environment.js';
import { createTerrarium } from './rendering/entities.js';
import { InputManager } from './physics/inputs.js';
import { Agent } from './physics/agent.js';

async function initSimulation() {
    const { scene, camera, renderer, controls } = setupEnvironment();
    const terrariumParams = createTerrarium(scene);
    const inputs = new InputManager(camera, scene); // Ocioso por enquanto

    const agents = [];
    const populationSize = 50;

    for (let i = 0; i < populationSize; i++) {
        // Gera posições aleatórias perto do centro
        const randomX = (Math.random() - 0.5) * 10;
        const randomZ = (Math.random() - 0.5) * 10;
        const startPos = new THREE.Vector3(randomX, 0.5, randomZ); 
        
        const newAgent = new Agent(scene, startPos);
        agents.push(newAgent);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); 
        
        agents.forEach(agent => {
            agent.update(terrariumParams.groundRadius);
        });
        
        renderer.render(scene, camera);
    }

    animate();
}

initSimulation().catch(error => {
    console.error("Falha ao iniciar o ecossistema:", error);
});