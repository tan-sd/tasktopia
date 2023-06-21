import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import PuduModel from '../components/PuduModel';
import SparrowModel from '../components/SparrowModel';
import InkFishModel from '../components/InkFishModel';
import useControls from 'r3f-native-orbitcontrols';
import ProgressBar from 'react-native-progress/Bar'
import Icon from 'react-native-vector-icons/FontAwesome'

const useHeartsAnimation = () => {
    const [hearts, setHearts] = useState([]);
  
    const addHeart = () => {
      const newHeart = {
        id: Date.now(),
        position: new Animated.Value(0),
        opacity: new Animated.Value(1),
        size: new Animated.Value(0),
      };
  
      setHearts([...hearts, newHeart]);
  
      Animated.parallel([
        Animated.timing(newHeart.position, {
          toValue: -200,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(newHeart.opacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(newHeart.size, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setHearts(hearts.filter((heart) => heart.id !== newHeart.id));
      });
    };
  
    return [hearts, addHeart];
  };

const FriendHomePage = ({ route }) => {
    const { userDetails } = route.params;
    const [OrbitControls, events] = useControls();
    const [leftProgress, setLeftProgress] = useState(0);
    const [rightProgress, setRightProgress] = useState(0.3);
    const [feedRemaining, setFeedRemaining] = useState(4);
    const [hearts, addHeart] = useHeartsAnimation();

    const navigation = useNavigation();

    const handleGoBack = () => {
      navigation.goBack();
    };  

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
    };
    
    const handleFeedButtonPress = () => {
        if (feedRemaining > 0 && rightProgress < 1) {
          setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds - 1);
  
          if (rightProgress < 1) {
          setRightProgress((prevProgress) => Math.round((prevProgress + 0.1)*10)/10);
        }}
    };

    const [loaded] = useFonts({
        GothamBold: require('../assets/fonts/Gotham-Bold.otf'),
        GothamBook: require('../assets/fonts/Gotham-Book.otf')
      });

      if (!loaded) {
        return null;
      }
  
    return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 70, marginLeft: -40}}>
                    <View>
                        <Image
                            source={{uri: userDetails.profileImg}}
                            style={styles.friendsImg}
                        />
                    </View>

                    <View style={styles.friendDetailsWrapper}>
                        <Text style={[styles.friendName, styles.gothamBold]}>{userDetails.firstName} {userDetails.lastName}</Text>
                        <Text style={[styles.friendJobRole, styles.gothamBook]}>{userDetails.jobRole}</Text>
                    </View>
                </View>
                <StatusBar style="auto" />

                <View style={styles.progressContainer}>
            {/* Level Progress Bar */}
              <View style={[styles.progressBar, styles.leftProgressBar]}>
                <View style={styles.iconContainer}>
                  <Icon name="star" size={18} color="black" />
                </View>
                  <ProgressBar
                    progress={leftProgress + 0.4} // progress value 40%
                    width={135}
                    height={25}
                    borderRadius={20}
                    borderWidth={3}
                    color={'#FF8577'}
                  />
                    <View style={styles.progressTextContainer}>
                      <Text style={styles.progressText}>Level 4</Text>
                    </View>
              </View>
            {/* Health Progress Bar */}
              <View style={[styles.progressBar, styles.rightProgressBar]}>
                <View style={styles.iconContainer}>
                  <Icon name="heart" size={18} color="black" />
                </View>
                <ProgressBar
                  progress={rightProgress} // progress value (30%)
                  width={135}
                  height={25}
                  borderRadius={20}
                  borderWidth={3}
                  color={'#FF8577'}
                />
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>{rightProgress *100 }%</Text>
                </View>
              </View>
          </View>

                {userDetails.selectedPet === 'pudu' && (
                    <Image
                        source={require('../assets/img/background/pudu-background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                {userDetails.selectedPet === 'sparrow' && (
                    <Image
                        source={require('../assets/img/background/sparrow-background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                {userDetails.selectedPet === 'inkfish' && (
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
                                {userDetails.selectedPet === 'pudu' && <PuduModel />}
                                {userDetails.selectedPet === 'sparrow' && <SparrowModel />}
                                {userDetails.selectedPet === 'inkfish' && <InkFishModel />}
                            </Suspense>
                    </Canvas>
                </View>

                {hearts.map((heart) => (
                    <Animated.View
                    key={heart.id}
                    style={[
                        styles.heart,
                        {
                        transform: [
                            { translateY: heart.position },
                            { scale: heart.size.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1.2, 1] }) },
                        ],
                        opacity: heart.opacity,
                        },
                    ]}
                    >
                    {/* Customize the heart shape or icon */}
                    <Text style={styles.heartIcon}>❤️</Text>
                    </Animated.View>
                ))}

                <View style={styles.feedButtonContainer}>
                    <Text style={styles.infoText}>Feed to add health</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { handleFeedButtonPress(); addHeart(); }}
                        disabled={feedRemaining === 0 || rightProgress === 1.0}>
                    <View style={styles.buttonContent}>
                        <Icon name="heart" size={18} color="#FF8577" />
                        <Text style={styles.buttonText}>{feedRemaining} remaining</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.goBackBtn}
                    >
                    <Icon name="arrow-left" size={25} color="black" />
                </TouchableOpacity>
                {/* <View>
                  <TouchableOpacity
                    onPress={handleSignOut}
                    >
                    <Text>Log out</Text>
                  </TouchableOpacity>
                </View>
            </View>
        <View>
            <Text>User Details:</Text>
            <Text>Name: {userDetails.firstName} {userDetails.lastName}</Text>
            <Text>Job Role: {userDetails.jobRole}</Text>
            {/* ... */}
        </View>
      </SafeAreaView>
      </>
    );
  };

export default FriendHomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fedb7d',
        width: '100%'
    },
    bgImage: {
        position: 'absolute',
        width: '70%',
        height: '50%',
        borderRadius: 30,
        top: 255
    },
    canvas: {
        height: '56%',
        // aspectRatio: 1,
        borderColor: 'black',
        borderRadius: 30,
        // borderWidth: 1,          
    },
    canvasWrapper: {
        width: 300,
        height: '50%',
        bottom: 0,
        position: 'absolute',
        top:'30%',
    },
    friendsImg: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        width: 90,
        height: 90
    },
    goBackBtn: {
        top: 0,
        position: "absolute",
        left: 0,
        marginLeft: 40,
        marginTop: 15,
    },
    friendDetailsWrapper: {
        alignContent: 'center',
    },
    friendName: {
        fontSize: 20
    },
    friendJobRole: {
        marginTop: 5,
        fontSize: 14
    },
    progressContainer: {
        position: 'absolute',
        top: 190,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    progressBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    leftProgressBar: {
        justifyContent: 'flex-start',
      },
      rightProgressBar: {
        justifyContent: 'flex-end',
      },
      progressTextContainer: {
        position: 'absolute',
        left: 30,
        right: 0,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -6 }],
      },
      progressText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
      },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2.5,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2,
    },
    feedButtonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '6%', 
    },
    infoText: {
        color: 'black',
        fontSize: 14,
        // fontWeight: 'bold',
        marginBottom: 10,
      },
    button: {
        borderColor: 'black',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderWidth: 1,
    },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    gothamBold: {
        fontFamily: 'GothamBold'
    },
    gothamBook: {
        fontFamily: 'GothamBook'
    },
    heart: {
        position: 'absolute',
        bottom: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartIcon: {
        fontSize: 30,
        color: 'red',
    },
})