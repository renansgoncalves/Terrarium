import * as THREE from 'three';

export class Agent {
    constructor(scene, startPosition) {
        const geometry = new THREE.ConeGeometry(0.5, 1.5, 8);
        geometry.rotateX(Math.PI / 2); // Rotaciona o cone para que ele aponte para frente (eixo Z) em vez de para cima (eixo Y)
        
        const material = new THREE.MeshStandardMaterial({
            color: 0x44ff44,
            roughness: 0.5,
            metalness: 0.5
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(startPosition);
        
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        
        scene.add(this.mesh);

        // Velocidade inicial aleatória para cada agente
        const speedMultiplier = 0.2;
        this.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * speedMultiplier, 0,
            (Math.random() - 0.5) * speedMultiplier  
        );
    }

    update(boundaryRadius) {
        this.mesh.position.add(this.velocity);

        // Lógica de colisão com as paredes do cilindro
        const distanceFromCenter = Math.sqrt(
            this.mesh.position.x ** 2 + this.mesh.position.z ** 2
        );

        // Utilizamos o raio do agente para garantir que ele não penetre na parede
        const agentRadius = this.mesh.geometry.parameters.height / 1.5; // Consideramos um pouco mais da metade na verdade, como um pequeno buffer, tendo em vista sua rotação e redireção

        if (distanceFromCenter > boundaryRadius - agentRadius) {
            // Um vetor que aponta do centro do cilindro diretamente para a parede onde o agente bateu
            const normal = new THREE.Vector3(this.mesh.position.x, 0, this.mesh.position.z).normalize();
            
            // Inverte a velocidade usando a parede (normal) como espelho
            this.velocity.reflect(normal);
            
            // Evita o bug de motores físicos onde o objeto fica "preso" dentro da parede
            const overlap = distanceFromCenter - (boundaryRadius - agentRadius);
            this.mesh.position.sub(normal.clone().multiplyScalar(overlap));
        }

        // Faz o agente olhar na direção do movimento
        const target = this.mesh.position.clone().add(this.velocity);
        this.mesh.lookAt(target);
    }
}