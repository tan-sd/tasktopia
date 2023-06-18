import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, TouchableHighlight, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
// import * as Keychain from 'react-native-keychain';
// import CustomButton from "../components/customButton";
import{useForm, Controller} from "react-hook-form";

export default function LoginPage({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {control, handleSubmit, formState:{errors}} = useForm();
    console.log(errors);
    const {height} = useWindowDimensions();
    const onLogin = (data) => {
        console.log(data);
        console.warn('Login');
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

    return (
        <>
        <SafeAreaView>
            <StatusBar/>
            <Image source={require('../assets/tasktopia-logo.png')} style={[styles.logo, {height: height*0.3}]} resizeMode="contain"   />

            <View style={styles.middleSection}>
            <Text style={styles.labels}>Username</Text>
            
            <Controller control={control} name="username" rules={{required:'Username is required'}} render={({field:    {value, onChange, onBlur}, fieldState:{error}}) => 
                <>
                <View>
                <TextInput placeholder={''} style={[styles.textInput, {borderColor: error ? 'red' : 'black'}]}
               
                onChangeText={onChange} value={value} onBlur={onBlur} /> 
                
                {!!error && (<Text style={{color:'red', fontSize:12}}>{error.message || 'Error'}</Text>)} 
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
                <TextInput placeholder={''} style={[styles.textInput, {borderColor: error ? 'red' : 'black'}]} secureTextEntry={true} onChangeText={onChange} value={value} onBlur={onBlur} /> 
                
                {!!error && (<Text style={{color:'red', fontSize:12}}>{error.message || 'Error'}</Text>)} 
                </View>
                </>

            } /> 
            </View> 
                {/* <TouchableHighlight style={styles.button}>
            <Button 
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}/></TouchableHighlight> */}
            
            
            
            <View style={styles.login}>
            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AnimalSelection')}> */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onLogin)}>
                <Text style={{textAlign: 'center', marginTop: 10, color:'white'}}>Login</Text>
            </TouchableOpacity>
            </View>
            {/* <CustomButton onPress={onLogin} text="Login" /> */}

        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:196,
        borderRadius:5,
    },
    homeHeader: {
        textAlign: 'center',
        color: '#EF524A',
    },
    homeHeaderSecond: {
        textAlign: 'center'
    },
    labels:{
        // color: '#EF524A',
        color: 'black',
    },
    middleSection:{
        display: 'flex',
        alignItems: 'center',
        top: 80,
    },
    button:{
        height:40,
        width:160,
        backgroundColor: "#16D7E1",
        borderRadius: 20,
        top:120,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    login:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        alignSelf: 'center',
    }
})