import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { auth } from "../firebase/firebase";
// import { getFriends } from "../firebase/firebase";
import {ref, onValue} from 'firebase/database';
import { database } from "../firebase/firebase";
export default function FriendsPage({navigation}) {
    const [friends, setFriends] = React.useState(null);

    // React.useEffect(() => {
    //     async function friendsObj() {
    //         const allFriends = await getFriends();
    //         console.log(allFriends);
    //         setFriends(allFriends);
    //     }
    //     friendsObj();
    // }, []);
    // const [friends, setFriends] = useState([]);

  const getFriends = () => {
    const friendsRef = ref(database, 'users/');
    onValue(friendsRef, (snapshot) => {
      const data = snapshot.val();
      setFriends(data); // Update the state here
    });
  };

  React.useEffect(() => {
    getFriends();
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
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 30, marginTop: 50, marginLeft: -40}}>
               
                        <View style={styles.friendDetailsWrapper}>
                            { friends ? (Object.keys(friends).map((uid) =>{
                                const friend = friends[uid]
                                return( 
                                <>
                                <View>
                                <Image
                                source={require('../assets/favicon.png')}
                                style={styles.friendsImg}
                                />
                                </View>

                                <View style={{flexDirection:'right'}}>
                                <Text style={[styles.friendName, styles.gothamBold]}>{friend.firstName} {friend.lastName}</Text>
                                 <Text style={[styles.friendJobRole, styles.gothamBook]}>{friend.jobRole}</Text>
                                 <TouchableOpacity style={styles.visitButton}>
                                     <Text style={{...styles.gothamBook, textAlign: 'center'}}>Visit</Text>
                                 </TouchableOpacity>
                                </View>
                                </>
                                )
                            } )) : (
                                <Text>Loading...</Text>
                            )
                        }
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 50, marginLeft: -40}}>
                        <View>
                            {/*TODO: Convert o component with props*/}
                            <Image
                                source={require('../assets/favicon.png')}
                                style={styles.friendsImg}
                            />
                        </View>
                        <View style={styles.friendDetailsWrapper}>
                            <Text style={[styles.friendName, styles.gothamBold]}>Friend Name 2</Text>
                            <Text style={[styles.friendJobRole, styles.gothamBook]}>Friend Job 2</Text>
                            <TouchableOpacity style={styles.visitButton}>
                                <Text style={{...styles.gothamBook, textAlign: 'center'}}>Visit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 50, marginLeft: -40}}>
                        <View>
                            {/*TODO: Convert o component with props*/}
                            <Image
                                source={require('../assets/favicon.png')}
                                style={styles.friendsImg}
                            />
                        </View>
                        <View style={styles.friendDetailsWrapper}>
                            <Text style={[styles.friendName, styles.gothamBold]}>Friend Name 3</Text>
                            <Text style={[styles.friendJobRole, styles.gothamBook]}>Friend Job 3</Text>
                            <TouchableOpacity style={styles.visitButton}>
                                <Text style={{...styles.gothamBook, textAlign: 'center'}}>Visit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 50, marginLeft: -40}}>
                        <View>
                            {/*TODO: Convert o component with props*/}
                            <Image
                                source={require('../assets/favicon.png')}
                                style={styles.friendsImg}
                            />
                        </View>
                        <View style={styles.friendDetailsWrapper}>
                            <Text style={[styles.friendName, styles.gothamBold]}>Friend Name 4</Text>
                            <Text style={[styles.friendJobRole, styles.gothamBook]}>Friend Job 4</Text>
                            <TouchableOpacity style={styles.visitButton}>
                                <Text style={{...styles.gothamBook, textAlign: 'center'}}>Visit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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