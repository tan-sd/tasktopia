import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
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
            >Tasktopia</Text>

            <Text>Username</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={onChangeUsername}
            />
            <Text>Password</Text>
            <TextInput 
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={onChangePassword}
                />
            <Button
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}></Button>
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
    },
    homeHeader: {
        textAlign: 'center'
    }
})