import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

export default function RewardsPage({navigation}) {
    return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text
                style={styles.rewardsHeader}
            >Rewards Page</Text>

            {/* <Button
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}></Button> */}
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fedb7d',
    },
    rewardsHeader: {
        textAlign: 'center'
    }
})