import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export default function SpaceBackground() {
    const canvasRef = useRef(null);
    const smoothCamera = useRef({ x: 0, y: 30, z: 300 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const refs = {
            scene: null,
            camera: null,
            renderer: null,
            composer: null,
            stars: [],
            nebula: null,
            mountains: [],
            locations: [],
            targetCameraX: 0,
            targetCameraY: 30,
            targetCameraZ: 300,
            animationId: null,
        };

        // ─── Scene ───
        refs.scene = new THREE.Scene();
        refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

        // ─── Camera ───
        refs.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        refs.camera.position.set(0, 20, 100);

        // ─── Renderer ───
        refs.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        refs.renderer.toneMappingExposure = 0.5;

        // ─── Post-processing ───
        refs.composer = new EffectComposer(refs.renderer);
        refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
        refs.composer.addPass(
            new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.8,
                0.4,
                0.85
            )
        );

        // ════════════════════════════════════════
        // ─── CREATE STAR FIELD (3 layers) ───
        // ════════════════════════════════════════
        const starCount = 5000;
        for (let i = 0; i < 3; i++) {
            const positions = new Float32Array(starCount * 3);
            const colors = new Float32Array(starCount * 3);
            const sizes = new Float32Array(starCount);

            for (let j = 0; j < starCount; j++) {
                const radius = 200 + Math.random() * 800;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);

                positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[j * 3 + 2] = radius * Math.cos(phi);

                const color = new THREE.Color();
                const pick = Math.random();
                if (pick < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
                else if (pick < 0.9) color.setHSL(0.08, 0.5, 0.8);
                else color.setHSL(0.6, 0.5, 0.8);

                colors[j * 3] = color.r;
                colors[j * 3 + 1] = color.g;
                colors[j * 3 + 2] = color.b;
                sizes[j] = Math.random() * 2 + 0.5;
            }

            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const mat = new THREE.ShaderMaterial({
                uniforms: { time: { value: 0 }, depth: { value: i } },
                vertexShader: `
                    attribute float size;
                    attribute vec3 color;
                    varying vec3 vColor;
                    uniform float time;
                    uniform float depth;
                    void main() {
                        vColor = color;
                        vec3 pos = position;
                        float angle = time * 0.05 * (1.0 - depth * 0.3);
                        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
                        pos.xy = rot * pos.xy;
                        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = size * (300.0 / -mv.z);
                        gl_Position = projectionMatrix * mv;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    void main() {
                        float d = length(gl_PointCoord - vec2(0.5));
                        if (d > 0.5) discard;
                        float opacity = 1.0 - smoothstep(0.0, 0.5, d);
                        gl_FragColor = vec4(vColor, opacity);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });

            const stars = new THREE.Points(geo, mat);
            refs.scene.add(stars);
            refs.stars.push(stars);
        }

        // ════════════════════════════
        // ─── CREATE NEBULA ───
        // ════════════════════════════
        const nebulaMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x0033ff) },
                color2: { value: new THREE.Color(0xff0066) },
                opacity: { value: 0.3 },
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform float time;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    float elev = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
                    pos.z += elev;
                    vElevation = elev;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float opacity;
                uniform float time;
                varying vec2 vUv;
                varying float vElevation;
                void main() {
                    float mix_ = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
                    vec3 col = mix(color1, color2, mix_ * 0.5 + 0.5);
                    float a = opacity * (1.0 - length(vUv - 0.5) * 2.0);
                    a *= 1.0 + vElevation * 0.01;
                    gl_FragColor = vec4(col, a);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
        const nebula = new THREE.Mesh(
            new THREE.PlaneGeometry(8000, 4000, 100, 100),
            nebulaMat
        );
        nebula.position.z = -1050;
        refs.scene.add(nebula);
        refs.nebula = nebula;

        // ════════════════════════════════
        // ─── CREATE MOUNTAINS ───
        // ════════════════════════════════
        const layers = [
            { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
            { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
            { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
            { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
        ];

        layers.forEach((layer) => {
            const pts = [];
            const segments = 50;
            for (let i = 0; i <= segments; i++) {
                const x = (i / segments - 0.5) * 1000;
                const y =
                    Math.sin(i * 0.1) * layer.height +
                    Math.sin(i * 0.05) * layer.height * 0.5 +
                    Math.random() * layer.height * 0.2 -
                    100;
                pts.push(new THREE.Vector2(x, y));
            }
            pts.push(new THREE.Vector2(5000, -300));
            pts.push(new THREE.Vector2(-5000, -300));

            const shape = new THREE.Shape(pts);
            const mountain = new THREE.Mesh(
                new THREE.ShapeGeometry(shape),
                new THREE.MeshBasicMaterial({
                    color: layer.color,
                    transparent: true,
                    opacity: layer.opacity,
                    side: THREE.DoubleSide,
                })
            );
            mountain.position.z = layer.distance;
            mountain.position.y = layer.distance;
            mountain.userData = { baseZ: layer.distance };
            refs.scene.add(mountain);
            refs.mountains.push(mountain);
        });

        // Store original positions
        refs.locations = refs.mountains.map((m) => m.position.z);

        // ════════════════════════════════
        // ─── CREATE ATMOSPHERE ───
        // ════════════════════════════════
        const atmoMat = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform float time;
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    vec3 atmo = vec3(0.3, 0.6, 1.0) * intensity;
                    atmo *= sin(time * 2.0) * 0.1 + 0.9;
                    gl_FragColor = vec4(atmo, intensity * 0.25);
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
        refs.scene.add(new THREE.Mesh(new THREE.SphereGeometry(600, 32, 32), atmoMat));

        // ════════════════════════════════════
        // ─── ANIMATION LOOP ───
        // ════════════════════════════════════
        const animate = () => {
            refs.animationId = requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Update star uniforms
            refs.stars.forEach((s) => {
                if (s.material.uniforms) s.material.uniforms.time.value = time;
            });

            // Update nebula
            if (refs.nebula?.material.uniforms) {
                refs.nebula.material.uniforms.time.value = time * 0.5;
            }

            // Atmosphere
            atmoMat.uniforms.time.value = time;

            // Smooth camera movement with easing
            const sf = 0.05;
            smoothCamera.current.x += (refs.targetCameraX - smoothCamera.current.x) * sf;
            smoothCamera.current.y += (refs.targetCameraY - smoothCamera.current.y) * sf;
            smoothCamera.current.z += (refs.targetCameraZ - smoothCamera.current.z) * sf;

            // Add subtle floating motion
            const floatX = Math.sin(time * 0.1) * 2;
            const floatY = Math.cos(time * 0.15) * 1;

            refs.camera.position.x = smoothCamera.current.x + floatX;
            refs.camera.position.y = smoothCamera.current.y + floatY;
            refs.camera.position.z = smoothCamera.current.z;
            refs.camera.lookAt(0, 10, -600);

            // Parallax mountains with subtle animation
            refs.mountains.forEach((mountain, i) => {
                const parallaxFactor = 1 + i * 0.5;
                mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
                mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor;
            });

            refs.composer.render();
        };
        animate();

        // ════════════════════════════════════════
        // ─── SCROLL HANDLER (camera movement) ───
        // ════════════════════════════════════════
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const maxScroll = docHeight - windowHeight;
            const progress = Math.min(scrollY / maxScroll, 1);

            const totalSections = 3;
            const totalProgress = progress * totalSections;
            const currentSection = Math.min(Math.floor(totalProgress), totalSections - 1);
            const sectionProgress = totalProgress - currentSection;

            // Camera positions for scroll progress
            // Section 0: Hero — mountains visible, wide view
            // Section 1: About/Skills — flying past mountains
            // Section 2: Projects/Contact — deep in cosmos, nebula visible
            const cameraPositions = [
                { x: 0, y: 30, z: 300 },
                { x: 0, y: 40, z: -50 },
                { x: 0, y: 50, z: -700 },
            ];

            const currentPos = cameraPositions[currentSection] || cameraPositions[0];
            const nextPos = cameraPositions[currentSection + 1] || currentPos;

            refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
            refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
            refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

            // Mountains disappear as you fly past them
            refs.mountains.forEach((mountain, i) => {
                const speed = 1 + i * 0.9;
                const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
                refs.nebula.position.z = targetZ + progress * speed * 0.01 - 100;

                if (progress > 0.7) {
                    mountain.position.z = 600000; // push offscreen
                } else {
                    mountain.position.z = refs.locations[i];
                }
            });
            refs.nebula.position.z = refs.mountains[3].position.z;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Set initial position

        // ─── Resize ───
        const handleResize = () => {
            refs.camera.aspect = window.innerWidth / window.innerHeight;
            refs.camera.updateProjectionMatrix();
            refs.renderer.setSize(window.innerWidth, window.innerHeight);
            refs.composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // ─── Cleanup ───
        return () => {
            cancelAnimationFrame(refs.animationId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            refs.stars.forEach((s) => { s.geometry.dispose(); s.material.dispose(); });
            refs.mountains.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
            if (refs.nebula) { refs.nebula.geometry.dispose(); refs.nebula.material.dispose(); }
            refs.renderer?.dispose();
        };
    }, []);

    return (
        <div className="space-bg">
            <canvas ref={canvasRef} />
        </div>
    );
}
