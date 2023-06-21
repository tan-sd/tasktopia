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

    const handleVisitPress = (userDetails) => {
        navigation.navigate('FriendHomePage', { userDetails });
      };  

    React.useEffect(() => {
        const fetchDataAndConvertImages = async () => {
          try {
            const friendsRef = ref_database(database, 'users/');
            onValue(friendsRef, (snapshot) => {
              const data = snapshot.val();
    
              if (data) {
                convertAndSetData(data);
              }
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDataAndConvertImages();
      }, []);
    
      const convertAndSetData = async (data) => {
        const convertedData = [];

        const currentUser = auth.currentUser;
        const currentUserId = currentUser.uid;
    
        for (const userId in data) {
            if(userId !== currentUserId) {
          const user = data[userId];
          const { selectedPet, firstName, lastName, jobRole, profileImg } = user;
    
          if (profileImg) {
            try {
              const storageRef = ref_storage(storage, profileImg);
              const url = await getDownloadURL(storageRef);
    
              const convertedUser = {
                selectedPet,
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
    }
    
        setConvertedData(convertedData);
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
                                <TouchableOpacity
                                    style={styles.visitButton}
                                    onPress={() => handleVisitPress(item)}
                                    >
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
        height: 90,
    },
    friendDetailsWrapper: {
        alignContent: 'center',
    },
    friendName: {
        fontSize: 20
    },
    friendJobRole: {
        marginTop: 5,
        fontSize: 14,
        width: 200
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