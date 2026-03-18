import * as THREE from 'three';

export class InputManager {
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.initListeners();
    }

    // Detecta cliques do mouse e atualiza o Raycaster
    initListeners() {
        window.addEventListener('pointerdown', (event) => {
            // Normaliza as coordenadas do mouse para o padrão do Raycaster (-1 a +1)
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Atualiza o raio com a posição da câmera e do mouse
            this.raycaster.setFromCamera(this.mouse, this.camera);
        });
    }
}