import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';

function PuduModel(props) {
    const defaultAnimation = useRef(null);
  
    const handleClick = () => {
      const clickAnimation = mixer.current.clipAction(gltf.animations[2]);
  
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
        require('../assets/animals/textures/T_Pudu.png'),
        // require('./assets/Airmax/textures/Normal.jpg'),
        // require('./assets/Airmax/textures/Roughness.png'),
      ]);
  
    const gltf = useLoader(
        GLTFLoader,
        require('../assets/animals/models/GLTF/animations/Pudu_Animations.glb'),
        // (loader) => {
    
        // }
      );
  
    const mixer = useRef(null);
  
      useLayoutEffect(() => {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.map = base;
            base.format = THREE.RGBAFormat
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
            <primitive object={gltf.scene} scale={3} onClick={handleClick} dispose={null}/>
        </mesh>
    );
  }  

export default function HomePage({navigation}) {
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
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Image
                    source={require('../assets/img/background/pudu-background.png')}
                    style={styles.bgImage}
                    resizeMode="cover"
                />
                <View style={styles.canvasWrapper} {...events}>
                    <Canvas
                        onCreated={onCreated}
                        style={styles.canvas}>
                        <ambientLight/>
                            <OrbitControls/>
                            <Suspense fallback={null}>
                                <PuduModel />
                            </Suspense>
                    </Canvas>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text>Log out</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fedb7d',
    },
    bgImage: {
        position: 'absolute',
        width: '80%',
        height: '56%',
        borderRadius: 30,
        top: 100
    },
    canvas: {
        height: '56%',
        // aspectRatio: 1,
        borderColor: 'black',
        borderRadius: 30,
        // borderWidth: 1,          
    },
    canvasWrapper: {
        width: 350,
        height: 425,
        bottom: 65
    }
})