import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { auth } from "../firebase/firebase";
import {ref as ref_database, onValue} from 'firebase/database';
import { database } from "../firebase/firebase";
import { getStorage, ref as ref_storage, getDownloadURL } from '@firebase/storage';

export default function FriendsPage({navigation}) {
    const [friends, setFriends] = React.useState(null);
    const [profileP, setProfileP] = React.useState('');
    const [convertedData, setConvertedData] = React.useState([]);
    const storage = getStorage();

    var data = '';

    const friendsRef = ref_database(database, 'users/');
    onValue(friendsRef, (snapshot) => {
      data = snapshot.val();
    })

    const convertImageURLs = async (data) => {
        const convertedData = [];

        for (const userId in data) {
            const user = data[userId];
            const { firstName, lastName, jobRole, profileImg } = user;

            if (profileImg) {
                try {
                    const storage = getStorage();
                    const storageRef = ref_storage(storage, profileImg);
                    const url = await getDownloadURL(storageRef);

                    const convertedUser = {
                    userId,
                    firstName,
                    lastName,
                    jobRole,
                    profileImg: url,
                    };

                    convertedData.push(convertedUser);
                } catch (error) {
                    console.error('Error converting image URL:', error);
                }
            }
        }
    return convertedData;
    };

    const handleDataConversion = async () => {
    try {
        const convertedData = await convertImageURLs(data);
        // Use the converted data in your React Native component or perform further operations
        console.log(convertedData);
    } catch (error) {
        console.error('Error converting image URLs:', error);
    }
    };

    handleDataConversion();

    React.useEffect(() => {
        const fetchDataAndConvertImages = async () => {

        const convertedData = await convertImageURLs(data);
        
        setConvertedData(convertedData);
        };
        
        fetchDataAndConvertImages();
    }, []);
        
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
            <ScrollView>
            <StatusBar/>
            <View style={styles.friendsWrapper}>
                <View>
                    <Text
                        style={[styles.friendsHeader, styles.gothamBold]}
                    >My Friends</Text>
                </View>

                <View>
                    { convertedData ? convertedData.map((item) => {
                        return( 
                            <>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 50, marginLeft: -40}}>
                            <View>
                            <Image
                                source={{uri: item.profileImg}}
                                style={styles.friendsImg}
                            />
                            </View>

                            <View style={styles.friendDetailsWrapper}>
                                <Text style={[styles.friendName, styles.gothamBold]}>{item.firstName} {item.lastName}</Text>
                                <Text style={[styles.friendJobRole, styles.gothamBook]}>{item.jobRole}</Text>
                                <TouchableOpacity style={styles.visitButton}>
                                    <Text style={{...styles.gothamBook, textAlign: 'center'}}>Visit</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            </>
                            )
                        } ) : (
                        <Text>Loading...</Text>
                        )
                    }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fedb7d',
    },
    friendsWrapper: {
        marginLeft: 40,
        marginTop: 15
    },
    friendsHeader: {
        fontSize: 35,
    },
    friendsImg: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        width: 90,
        height: 90
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
    visitButton: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        padding: 5,
        backgroundColor: '#fff',
        width: 175,
        marginTop: 15
    },
    gothamBold: {
        fontFamily: 'GothamBold'
    },
    gothamBook: {
        fontFamily: 'GothamBook'
    }
})