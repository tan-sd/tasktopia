import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, TouchableHighlight, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
// import * as Keychain from 'react-native-keychain';
// import CustomButton from "../components/customButton";
import{useForm, Controller} from "react-hook-form";
import { useFonts } from 'expo-font';
import { auth, createUser, signInUser } from '../firebase/firebase';
import { ref, set, getDatabase, get, child } from 'firebase/database';

export default function LoginPage({navigation}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
      };
    
      const handlePasswordChange = (text) => {
        setPassword(text);
      };

    const {control, handleSubmit, formState:{errors}} = useForm();
    console.log(errors);
    const {height} = useWindowDimensions();
    const onLogin = (data) => {
        // console.log(data);
        // console.warn('Login');
        navigation.navigate('AnimalSelection')
    }

    const handleSignUp = (email, password) => {
        // const email = "example@example.com"; // Replace with the desired email
        // const password = "password123"; // Replace with the desired password
      
        alert('Sign Up');
      
        createUser(email, password)
          .then((userCredential) => {
            // console.log(userCredential);
            const user = userCredential.user;
            // console.log(user.email);
          })
          .catch(error => {
            alert(error.message);
          });
      };

    const handleSignIn = (email, password) => {
        
        // alert('Sign In');

        signInUser(email, password)
        .then((userCredential) => {
            // console.log(userCredential);
            // const user = userCredential.user;
            // console.log(user.email);
            const user = auth.currentUser;
            // console.log(user);
            const db = getDatabase();
            // set(ref(db, 'users/' + user.uid), {
            //     email: email,
            //   });

            const dbRef = ref(db);

            get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                if(snapshot.exists()) {
                    // console.log('Exists');
                    if(snapshot.child('selectedPet').val() === "") {
                        navigation.navigate('AnimalSelection');
                    } else {
                        navigation.navigate('HomePage');
                    }
                } else {
                    // console.log('Not exist');
                    set(ref(db, 'users/' + user.uid), {
                        selectedPet: '',
                      });

                    navigation.navigate('AnimalSelection');
                }
            }).catch((error) => {
                console.error(error)
            })
        })
        .catch(error => {
            alert(error.message);
        })
    }
    // const [preLogTest, setPreLogTest] = React.useState(false);

    // React.useEffect(() => {
    //     checkUserStatus();
    // }, []);

    // React.useEffect(() => {
    //     if (preLogTest) {
    //     login();
    //     }
    // }, [username, password])

    // const screenWidth = Dimensions.get('screen').width;
    // console.log(screenWidth);

    // const checkUserStatus = async () => {
    //     try {
    //       const credentials = await Keychain.getGenericPassword();
    //       if (credentials) {
    //         setPreLogTest(true);
    //         setEmail(credentials.username);
    //         setPassword(credentials.password);
    //       } else {
    //       setLoading(false);
    //       }
    //       }
    //     catch (error) {
    //       console.log('Keychain couldn\'t be accessed!', error);
    //       setLoading(false);
    //     }}
      

    //     const login = async () => {
    //         try {
    //           const response = await fetch('' + 'signin', {
    //             method: 'POST',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               username,
    //               password,
    //             }),
    //           });
    //           const responseJson = await response.json();
    //           var message = responseJson.msg;
    //           if (responseJson.success === true) {
    //               await Keychain.setGenericPassword(username, password);
    //             }
    //           }
    //         catch (error) {
    //           console.error(error);
    //         }
    //       };

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
            <StatusBar/>
            <Image source={require('../assets/tasktopia-logo.png')} style={[styles.logo]} resizeMode="contain"   />

            <View style={styles.middleSection}>
            <Text style={styles.labels}>Email</Text>
            
            <Controller control={control} name="email" rules={{required:'Email is required'}} render={({field: {value, onChange, onBlur}, fieldState:{error}}) => 
                <>
                <View>
                <TextInput placeholder={''} style={[styles.textInput, {borderColor: error ? 'red' : 'black'}]}
               
                onChangeText={handleEmailChange} value={value} onBlur={onBlur} /> 
                
                {!!error && (<Text style={{color:'red', fontSize: 12, paddingTop: 5}}>{error.message || 'Error'}</Text>)} 
                </View>
                </>

            } /> 
                <Text style={styles.labels}>Password</Text>

                <Controller control={control} name="password" rules={{required:'Password is required',minLength:{
                        value: 6,
                        message:"Password must be at least 6 characters"
                    }}} render={({field:{value, onChange, onBlur}, fieldState:{error}}) => 
                <>
                <View>
                <TextInput placeholder={''} style={[styles.textInput, {borderColor: error ? 'red' : 'black'}]} secureTextEntry={true} onChangeText={handlePasswordChange} value={value} onBlur={onBlur} /> 
                
                {!!error && (<Text style={{color:'red', fontSize: 12, paddingTop: 5}}>{error.message || 'Error'}</Text>)} 
                </View>
                </>

            } /> 
                {/* <TouchableHighlight style={styles.button}>
            <Button 
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}/></TouchableHighlight> */}
            
            
            
            <View style={styles.login}>
            <TouchableOpacity style={styles.button} onPress={() => handleSignIn(email, password)}>
                <Text style={{textAlign: 'center', marginTop: 10, color:'white',fontFamily: 'GothamBold'}}>Login</Text>

            </TouchableOpacity>
            </View>
            {/* <CustomButton onPress={onLogin} text="Login" /> */}

            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AnimalSelection')}>
                <Text style={{textAlign: 'center', marginTop: 10, color:'white', fontFamily: 'GothamBold'}}>Login</Text>
            </TouchableOpacity></View> */}
            </View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fedb7d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        marginTop: '2%',
        borderWidth: 1,
        padding: 10,
        width: 230,
        borderRadius: 5,
    },
    labels: {
        color: '#EF524A',
        fontFamily: "GothamBook",
        marginTop: '5%'
    },
    middleSection: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: 160,
        backgroundColor: "#16D7E1",
        borderRadius: 20,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    login: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%'
    },
    logo: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: '5%'
    }
})