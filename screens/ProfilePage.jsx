import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { auth } from '../firebase/firebase';
import { ref as ref_database, getDatabase, onValue, off } from 'firebase/database';
import { useState } from 'react';
import { getStorage, ref as ref_storage, getDownloadURL } from "firebase/storage";
import { signOutUser } from '../firebase/firebase';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'

export default function ProfilePage({navigation}) {
    const [dbPet, setDbPet] = useState('');
    const [jRole, setJRole] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const handleSignOut= () => {
        signOutUser()
        .then(() => {
            navigation.replace('Login');
        }).catch((error) => {
            alert(error.message);
        })
    }

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
                        <Text style={styles.gothamBook}><Text style={styles.gothamBold}>{dbPet.charAt(0).toUpperCase()}{dbPet.slice(1)}</Text>, Level 4</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.achievementsWrapper}>
                    <Text style={[styles.gothamBold, styles.achievementsHeader]}>Achievements</Text>

                    <View style={styles.achievementButtonContainer}>
                        {/* Badge 1 */}
                        <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                        <Icon3 name="flash" size={18} color="black" style={styles.icon}/>
                            <Text style={styles.buttonText}>Efficiency Guru</Text>
                        </View>
                        </TouchableOpacity>
                        {/* Badge 2 */}
                        <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                        <Icon5 name="glass-cheers" size={18} color="black" style={styles.icon}/>
                            <Text style={styles.buttonText}>Customer Delight</Text>
                        </View>
                        </TouchableOpacity>
                        {/* Badge 3 */}
                        <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                        <Icon5 name="globe-asia" size={18} color="black" style={styles.icon}/>
                            <Text style={styles.buttonText}>Global Explorer</Text>
                        </View>
                        </TouchableOpacity>
                        {/* Badge 4 */}
                        <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                        <Icon4 name="handshake-o" size={18} color="black" style={styles.icon}/>
                            <Text style={styles.buttonText}>Partnership Pro</Text>
                        </View>
                        </TouchableOpacity>
                        {/* Badge 5 */}
                        <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                        <Icon2 name="rocket1" size={18} color="black" style={styles.icon}/>
                            <Text style={styles.buttonText}>Revenue Rockstar</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    
                    {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 20}}>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            <Icon3 name="flash" size={18} color="black" style={styles.icon}/>
                            Efficiency Guru
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            <Icon5 name="glass-cheers" size={18} color="black" style={styles.icon}/>
                            Customer Delight
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            <Icon5 name="globe-asia" size={18} color="black" style={styles.icon}/>
                            Global Explorer
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                            <Icon4 name="handshake-o" size={18} color="black" style={styles.icon}/>
                            Partnership Pro
                        </Text>
                        <Text style={[styles.achievement, styles.gothamBook]}>
                        <Icon2 name="rocket1" size={18} color="black" style={styles.icon}/>
                            Revenue Rockstar
                        </Text>
                    </View> */}
                </View>

                <View>
                <View style={styles.logOutBtnContainer}>
                    <TouchableOpacity onPress={handleSignOut} style={{flexDirection: 'row', gap: 10}}>
                        <Icon1 name="log-out" size={18} color="black" />
                        <Text style={styles.logOutBtnText}>Log out</Text>
                    </TouchableOpacity>
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
        // marginLeft: 40,
        marginHorizontal: 30,
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
        marginTop: 70,
        marginBottom: 0,
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
    logOutBtnContainer: {
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 11,
        borderRadius: 5,
        marginLeft: -40,
        borderRadius: 10,
        bottom: -150,
        borderWidth: 1,
    },
    logOutBtnText: {
        fontFamily: 'GothamBold',
    },
    gothamBold: {
        fontFamily: 'GothamBold'
    },
    gothamBook: {
        fontFamily: 'GothamBook'
    },
    achievementButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FFF5DB',
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        width: '48%',
        borderWidth: 1,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'left',
    },
    buttonText: {
        marginLeft: 10,
    },
    icon: {
        marginLeft: 15,
        color: '#EF524A',
    },

})