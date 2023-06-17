import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

export default function ProfilePage({navigation}) {
    return (
        <>
        <SafeAreaView>
            <StatusBar/>
            <Text
                style={styles.profileHeader}
            >Profile Page</Text>

            {/* <Button
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}></Button> */}
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    profileHeader: {
        textAlign: 'center'
    }
})