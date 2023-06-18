import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

export default function FriendsPage({navigation}) {
    return (
        <>
        <SafeAreaView>
            <StatusBar/>
            <Text
                style={styles.friendsHeader}
            >Friends Page</Text>

            {/* <Button
                title="Login"
                onPress={() => navigation.navigate('AnimalSelection')}></Button> */}
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    friendsHeader: {
        textAlign: 'center'
    }
})