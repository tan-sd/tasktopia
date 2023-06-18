import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

export default function LoginPage({navigation}) {
    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text
                style={styles.homeHeader}
            >TASK</Text>
            <Text
                style={styles.homeHeaderSecond}
            >TOPIA</Text>

            <View style={styles.middleSection}>
            <Text style={styles.labels}>Username</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={onChangeUsername}
            />
            <Text style={styles.labels}>Password</Text>
            <TextInput 
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={onChangePassword}
                />
            </View> 
                {/* <TouchableHighlight style={styles.button}>
            <Button 
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}/></TouchableHighlight> */}
            <View style={styles.login}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AnimalSelection')}>
                <Text style={{textAlign: 'center', marginTop: 10, color:'white'}}>Login</Text>
            </TouchableOpacity></View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fedb7d',
    },
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
        color: '#EF524A',
    },
    middleSection:{
        display: 'flex',
        alignItems: 'center',
        top: 300,
    },
    button:{
        height:40,
        width:160,
        backgroundColor: "#16D7E1",
        borderRadius: 20,
        top:330,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    login:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})