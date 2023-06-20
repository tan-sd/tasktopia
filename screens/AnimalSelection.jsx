import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
// import { useEnvironment } from '@react-three/drei';
// import HomePage from './HomePage';
import PuduModel from '../components/PuduModel';
import SparrowModel from '../components/SparrowModel';
import InkFishModel from '../components/InkFishModel';
import { auth } from '../firebase/firebase';
import { ref, getDatabase, get, child, update } from 'firebase/database';

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
    const [selectedPet, setSelectedPet] = useState({
      button1: true,
      button2: false,
      button3: false,
    });
    const [OrbitControls, events] = useControls();

    const handleImageChange = (imageName) => {
      setSelectedBgImg(imageName)
    };

    const handleClickPet = (button) => {
      setSelectedPet((prevState) => ({
        button1: button === 'button1',
        button2: button === 'button2',
        button3: button === 'button3'
      }));
    };

    const handleDBPet = (pet) => {
      const user = auth.currentUser;
      const db = getDatabase();
      const dbRef = ref(db);

      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        update(ref(db, 'users/' + user.uid), {
          selectedPet: pet,
        })
      })
    }

    const buttonStyle = selectedPet ? styles.activeButton : styles.inactiveButton;

    const [loaded] = useFonts({
      GothamBold: require('../assets/fonts/Gotham-Bold.otf'),
      GothamBook: require('../assets/fonts/Gotham-Book.otf')
    });

    if (!loaded) {
      return null;
    }

    return (
        <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fedb7d'}}>
        <View style={styles.container}>
          <View style={{...styles.header}}>
            <Text style={{...styles.gothamBold, fontSize: 25}}>Choose your pet! ADAMBFT</Text>
            <StatusBar style="auto" />
          </View>
          <Image
            source={getImageSource(selectedBgImg)}
            style={styles.bgImage}
            resizeMode="cover"
          />
          <View style={styles.canvasWrapper} {...events}>
            <Canvas
                onCreated={onCreated}
                style={styles.canvas}
                >
                <ambientLight/>
                    <OrbitControls/>
                    <Suspense fallback={null}>
                        {/* <PuduModel /> */}
                        {selectedModel === 'pudu' && <PuduModel />}
                        {selectedModel === 'sparrow' && <SparrowModel />}
                        {selectedModel === 'inkfish' && <InkFishModel />}
                    </Suspense>
            </Canvas>
            </View>
            <View style={styles.imageWrapper}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => 
                [setSelectedModel('pudu'), handleImageChange('image1'), handleClickPet('button1')]}>
                <Image
                source={require('../assets/animals/img/Pudu.png')}
                style={selectedPet.button1 ? styles.activeButton : styles.inactiveButton}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() =>
                [setSelectedModel('sparrow'), handleImageChange('image2'), handleClickPet('button2')]}>
                <Image
                source={require('../assets/animals/img/Sparrow.png')}
                style={selectedPet.button2 ? styles.activeButton : styles.inactiveButton}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() =>
                [setSelectedModel('inkfish'), handleImageChange('image3'), handleClickPet('button3')]}>
                <Image
                source={require('../assets/animals/img/InkFish.png')}
                style={selectedPet.button3 ? styles.activeButton : styles.inactiveButton}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 10}}>
              <TouchableOpacity
              onPress={() => {
                handleDBPet(selectedModel); navigation.navigate('HomePage'); }} style={styles.confirmButton}
              >
                <Text style={{...styles.gothamBook, textAlign: 'center'}}>Confirm</Text>
              </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
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
    // width: '100%',
    height: 100,
    textAlign: 'center',
    // marginTop: 50,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fedb7d',
    // height: 750
  },
  canvasWrapper: {
    width: 350,
    height: 475,
    bottom: 10,
  },
  canvas: {
    height: '56%',
    // aspectRatio: 1,
    borderColor: 'black',
    borderRadius: 30,
    // borderWidth: 1, 
  },
  activeButton: {
    // padding: 10,
    margin: 5,
    height: 160,
    width: 110,
    borderWidth: 3,
    borderColor: '#16d7e1',
    borderRadius: 10,
    // width: 'auto',
    // resizeMode: 'stretch',
  },
  inactiveButton: {
    // padding: 10,
    margin: 5,
    height: 160,
    width: 110,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    // width: 'auto',
    // resizeMode: 'stretch',
  },
  imageWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bgImage: {
    position: 'absolute',
    width: '80%',
    height: '56%',
    borderRadius: 30,
    top: 100
  },
  confirmButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    width: 100,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  gothamBold: {
    fontFamily: 'GothamBold'
  },
  gothamBook: {
      fontFamily: 'GothamBook'
  }
});