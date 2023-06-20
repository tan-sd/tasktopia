import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { auth } from '../firebase/firebase';
import { ref as ref_database, getDatabase, onValue, off } from 'firebase/database';
import { useState } from 'react';
import { getStorage, ref as ref_storage, getDownloadURL } from "firebase/storage";

export default function ProfilePage({navigation}) {
    const [dbPet, setDbPet] = useState('');
    const [jRole, setJRole] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    React.useEffect(() => {
        const fetchDbPet = async () => {
          const user = auth.currentUser;
          const storage = getStorage();
          const dbRef = ref_database(getDatabase(), `users/${user.uid}`);
      
          const petRef = onValue(dbRef, (snapshot) => {
            const selectedPet = snapshot.val().selectedPet;
            const firstName = snapshot.val().firstName;
            const lastName = snapshot.val().lastName;
            const jobRole = snapshot.val().jobRole;
            const profileImg = snapshot.val().profileImg;

            const pathReference = ref_storage(storage, profileImg);

            const fetchDownloadUrl = async () => {
                try {
                const url = await getDownloadURL(pathReference);
                setProfilePic(url);
            } catch (error) {
                console.error('Error getting download URL:', error)
            }
        };


            console.log(pathReference);
            setDbPet(selectedPet);
            setFName(firstName);
            setLName(lastName);
            setJRole(jobRole);
            fetchDownloadUrl();
          }, []);
      
          return () => {
            off(petRef);
          };
        };
      
        fetchDbPet();
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
            <StatusBar/>
            <View style={styles.profileWrapper}>
                <View>
                    <Text
                        style={[styles.profileHeader, styles.gothamBold]}
                    >Profile</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: profilePic}}
                        style={styles.profileImg}
                        resizeMode="cover"
                    />
                    <View style={styles.profileDetails}>
                        <Text style={[styles.profileName, styles.gothamBold]}>{fName} {lName}</Text>
                        <Text style={[styles.profileJobRole, styles.gothamBook]}>{jRole}</Text>
                        <View style={{flexDirection: 'row', marginTop: 25}}>
                        <Text style={styles.gothamBook}>{dbPet.charAt(0).toUpperCase()}{dbPet.slice(1)}, Level</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.achievementsWrapper}>
                    <Text style={[styles.gothamBold, styles.achievementsHeader]}>Achievements</Text>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 20}}>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            Achievement 1
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            Achievement 2
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            Achievement 3
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            Achievement 4
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            Achievement 5
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fedb7d',
    },
    profileWrapper: {
        marginLeft: 40,
        marginTop: 15
    },
    profileHeader: {
        fontSize: 35,
    },
    profileImg: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        width: 100,
        height: 100,
        marginTop: 30
    },
    profileDetails: {
        marginLeft: 50
    },
    profileName: {
        fontSize: 20
    },
    profileJobRole: {
        marginTop: 5,
        fontSize: 14
    },
    achievementsWrapper: {
        marginTop: 75
    },
    achievementsHeader: {
        fontSize: 29,
    },
    achievement: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 15,
        borderRadius: 13,
        width: '40%',
        marginRight: 10,
        marginBottom: 20
    },
    gothamBold: {
        fontFamily: 'GothamBold'
    },
    gothamBook: {
        fontFamily: 'GothamBook'
    }
})