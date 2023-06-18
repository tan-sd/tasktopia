import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { useEnvironment } from '@react-three/drei';
import HomePage from './HomePage';

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

function SparrowModel(props) {
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

function InkFishModel(props) {
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
        require('../assets/animals/textures/T_Inkfish.png'),
        // require('./assets/Airmax/textures/Normal.jpg'),
        // require('./assets/Airmax/textures/Roughness.png'),
      ]);

    const gltf = useLoader(
        GLTFLoader,
        require('../assets/animals/models/GLTF/animations/Inkfish_Animations.glb'),
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
              defaultAnimation.current = mixer.current.clipAction(gltf.animations[16]);
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

export default function AnimalSelection({navigation}) {
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

    const [selectedModel, setSelectedModel] = useState('pudu');
    const [selectedBgImg, setSelectedBgImg] = useState('pudu');
    const [OrbitControls, events] = useControls();

    const handleImageChange = (imageName) => {
      setSelectedBgImg(imageName)
    }

    return (
        <>
        <View style={styles.container} {...events}>
          <View style={styles.header}>
            <Text>Choose your pets</Text>
            <StatusBar style="auto" />
          </View>
          <Image
            source={getImageSource(selectedBgImg)}
            style={{ position: 'absolute', width: '80%', height: '50%', borderRadius: 30, top: 150}}
            resizeMode="cover"
          />
            <Canvas
                onCreated={onCreated}
                style={styles.canvas}>
                <ambientLight/>
                    <OrbitControls/>
                    <Suspense fallback={null}>
                        {/* <PuduModel /> */}
                        {selectedModel === 'pudu' && <PuduModel />}
                        {selectedModel === 'sparrow' && <SparrowModel />}
                        {selectedModel === 'inkfish' && <InkFishModel />}
                    </Suspense>
            </Canvas>
            <View style={styles.imageWrapper}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => 
                [setSelectedModel('pudu'), handleImageChange('image1')]}>
                <Image
                source={require('../assets/animals/img/Pudu.png')}
                style={styles.buttonImageIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() =>
                [setSelectedModel('sparrow'), handleImageChange('image2')]}>
                <Image
                source={require('../assets/animals/img/Sparrow.png')}
                style={styles.buttonImageIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() =>
                [setSelectedModel('inkfish'), handleImageChange('image3')]}>
                <Image
                source={require('../assets/animals/img/InkFish.png')}
                style={styles.buttonImageIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 15}}>
            <Button
              // onPress={onPressLearnMore}
              title="Confirm"
              color="black"
              accessibilityLabel="Learn more about this purple button"
              onPress={() => navigation.navigate('HomePage')} />
            </View>
        </View>
        </>
    )
}

const getImageSource = (imageName) => {
  switch (imageName) {
    case 'image1':
      return require('../assets/img/background/pudu-background.png');
    
    case 'image2':
      return require('../assets/img/background/sparrow-background.png');
    
    case 'image3':
      return require('../assets/img/background/inkfish-background.jpg');
    default:
      return require('../assets/img/background/pudu-background.png');
  }
} 

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    textAlign: 'center',
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 750
  },
  canvas: {
    width: '80%',
    // aspectRatio: 1,
    borderColor: 'black',
    borderRadius: 30
    // borderWidth: 1
  },
  buttonImageIcon: {
    // padding: 10,
    margin: 5,
    height: 150,
    width: 110,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
    // width: 'auto',
    // resizeMode: 'stretch',
  },
  imageWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  }
});