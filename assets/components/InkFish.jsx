import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useLayoutEffect } from 'react';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';
import { View } from 'react-native';

function InkFishModel(props) {
    const [base] = useLoader(TextureLoader, [
        require('../../assets/animals/textures/T_Inkfish.png'),
        // require('./assets/Airmax/textures/Normal.jpg'),
        // require('./assets/Airmax/textures/Roughness.png'),
      ]);

    const gltf = useLoader(
        GLTFLoader,
        require('../../assets/animals/models/GLTF/animations/Inkfish_Animations.glb'),
        // (loader) => {
    
        // }
      );

    const mixer = useRef(null);

      useLayoutEffect(() => {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.map = base;
            // child.material.normalMap = normal;
            // child.material.roughnessMap = rough;
          }
        });
        if (gltf.animations && gltf.animations.length > 0) {
          mixer.current = new THREE.AnimationMixer(gltf.scene);
          const action = mixer.current.clipAction(gltf.animations[6]);
          action.play();
        }
      }, [gltf]);

      useFrame((state, delta) => {
        // let { x, y, z } = props.animatedSensor.sensor.value;
        // x = ~~(x * 100) / 5000;
        // y = ~~(y * 100) / 5000;
        // mesh.current.rotation.x += delta;
        // mesh.current.rotation.y += delta;
        if (mixer.current) {
          mixer.current.update(delta * 0.3);
        }
      });

    return (
        <mesh rotation={[0.1, -0.4, 0]} position={[0, -1.5, 0]}>
            <primitive object={gltf.scene} scale={2.5}/>
        </mesh>
    );
}

export default function InkFish() {
    const glRef = useRef();

    const onCreated = (state) => {
      const _gl = state.gl.getContext();
      const pixelStorei = _gl.pixelStorei.bind(_gl);
  
      _gl.pixelStorei = function(...args) {
        const [parameter] = args;
  
        switch (parameter) {
          case _gl.UNPACK_FLIP_Y_WEBGL:
            return pixelStorei(...args);
        }
      };
    }

    const [OrbitControls, events] = useControls();

    return (
        <>
        <View style={{flex: 1}} {...events}>
            <Canvas
                onCreated={onCreated}>
                <ambientLight/>
                    <OrbitControls/>
                    <Suspense fallback={null}>
                        <InkFishModel />
                    </Suspense>
            </Canvas>
        </View>
        </>
    )
}