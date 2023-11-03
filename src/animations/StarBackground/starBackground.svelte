<script>
    import * as THREE from 'three';
    import { onMount } from 'svelte';

    const particlesCount = 2000;
    let canvas, sizes, camera, scene, renderer, particlesGeometry, particlesMaterial, posArray, particlesMesh, clock;

    onMount(() => {

        sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        scene = new THREE.Scene();
        particlesGeometry = new THREE.BufferGeometry();
        posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 6;

        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0xffffff,
        });

        particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 2;
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        renderer.setClearColor(0x000000, 0);

        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize, { passive: true });

        handleResize(); // Call the resize function initially to set initial values

        clock = new THREE.Clock();

        animation();
    });

    function animation() {
        const elapsedTime = clock.getElapsedTime();
        const rotationValue = elapsedTime * 0.1;

        particlesMesh.rotation.y = rotationValue;
        particlesMesh.rotation.x = rotationValue;

        renderer.render(scene, camera);
        window.requestAnimationFrame(animation);
    }
</script>

<canvas class="webgl" bind:this={canvas} />

<style>
    canvas {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: -1;
        mix-blend-mode: difference;
    }
</style>
