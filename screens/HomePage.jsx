import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';
import PuduModel from '../components/PuduModel';
import SparrowModel from '../components/SparrowModel';
import InkFishModel from '../components/InkFishModel';
import { signOutUser } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { ref, getDatabase, onValue, off } from 'firebase/database';

export default function HomePage({navigation}) {
    const [dbPet, setDbPet] = useState('');

    const handleSignOut= () => {
        signOutUser()
        .then(() => {
            navigation.replace('Login');
        }).catch((error) => {
            alert(error.message);
        })
    }

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

    React.useEffect(() => {
        const fetchDbPet = async () => {
          const user = auth.currentUser;
          const dbRef = ref(getDatabase(), `users/${user.uid}/selectedPet`);
      
          const petRef = onValue(dbRef, (snapshot) => {
            const selectedPet = snapshot.val();
            setDbPet(selectedPet);
          });
      
          return () => {
            off(petRef);
          };
        };
      
        fetchDbPet();
      }, []);

    return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.container}>
                <StatusBar style="auto" />
                {dbPet === 'pudu' && (
                    <Image
                        source={require('../assets/img/background/pudu-background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                {dbPet === 'sparrow' && (
                    <Image
                        source={require('../assets/img/background/sparrow-background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                {dbPet === 'inkfish' && (
                    <Image
                        source={require('../assets/img/background/inkfish-background.jpg')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                <View style={styles.canvasWrapper} {...events}>
                    <Canvas
                        onCreated={onCreated}
                        style={styles.canvas}>
                        <ambientLight/>
                            <OrbitControls/>
                            <Suspense fallback={null}>
                                {/* <PuduModel /> */}
                                {dbPet === 'pudu' && <PuduModel />}
                                {dbPet === 'sparrow' && <SparrowModel />}
                                {dbPet === 'inkfish' && <InkFishModel />}
                            </Suspense>
                    </Canvas>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={handleSignOut}
                    >
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