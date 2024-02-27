import * as THREE from 'three';

export default class StarBackground {
    constructor(canvas) {
        this.particlesCount = 2000;
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.clock = new THREE.Clock();
        this.canvas = canvas;
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.particlesGeometry = new THREE.BufferGeometry();
        this.posArray = new Float32Array(this.particlesCount * 3);

        for (let i = 0; i < this.particlesCount * 3; i++) {
            this.posArray[i] = (Math.random() - 0.5) * 6;
        }

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(this.posArray, 3));
        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0xffffff,
        });

        this.particlesMesh = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.scene.add(this.particlesMesh);

        this.camera = new THREE.PerspectiveCamera(90, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.z = 2;
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false
        });
        this.renderer.setClearColor(0x000000, 0);

        window.addEventListener('resize', this.handleResize.bind(this), 200);

        this.handleResize();
        this.animation();
    }

    handleResize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    animation() {
        window.requestAnimationFrame(this.animation.bind(this));

        const elapsedTime = this.clock.getElapsedTime();
        const rotationValue = elapsedTime * 0.1;

        this.particlesMesh.rotation.y = rotationValue;
        this.particlesMesh.rotation.x = rotationValue;

        this.renderer.render(this.scene, this.camera);
    }

}