import { useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useLayoutEffect } from 'react';
import { TextureLoader } from 'expo-three';

export default function SparrowModel(props) {
    const defaultAnimation = useRef(null);
  
    const handleClick = () => {
      const clickAnimation = mixer.current.clipAction(gltf.animations[1]);
  
      // mixer.current.stopAllAction();
      clickAnimation.reset().setLoop(THREE.LoopOnce).play();
  
      clickAnimation.clampWhenFinished = true;
      clickAnimation.paused = false;
      clickAnimation.setLoop(THREE.LoopOnce, 1, () => {
        defaultAnimation.current.enabled = true;
        defaultAnimation.current.play();
        // mixer.current.clipAction(gltf.animations[13]).play();
      })  
    }
  
    const [base] = useLoader(TextureLoader, [
        require('../assets/animals/textures/T_Sparrow.png'),
        // require('./assets/Airmax/textures/Normal.jpg'),
        // require('./assets/Airmax/textures/Roughness.png'),
      ]);
  
    const gltf = useLoader(
        GLTFLoader,
        require('../assets/animals/models/GLTF/animations/Sparrow_Animations.glb'),
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
          defaultAnimation.current = mixer.current.clipAction(gltf.animations[13]);
          defaultAnimation.current.play();
  
          // const action = mixer.current.clipAction(gltf.animations[13]);
          // action.play();
  
          return () => {
            mixer.current.stopAllAction()
          }
        }
      }, [gltf.animations]);
  
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
            <primitive object={gltf.scene} scale={3} onClick={handleClick}/>
        </mesh>
    );
  }