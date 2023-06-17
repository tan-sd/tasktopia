import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

export default function HomePage({navigation}) {
    return (
        <>
        <SafeAreaView>
            <StatusBar/>
            <Text
                style={styles.homeHeader}
            >Home Page</Text>

            {/* <Button
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}></Button> */}
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    homeHeader: {
        textAlign: 'center'
    }
})