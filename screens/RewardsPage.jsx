import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { auth } from '../firebase/firebase';
import { ref, getDatabase, onValue, off } from 'firebase/database';
import { useState } from 'react';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RewardsPage({navigation}) {
    const [dbPet, setDbPet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonColor, setButtonColor] = useState('')
    

    React.useEffect(() => {
        const fetchDbPet = async () => {
          const user = auth.currentUser;
          const dbRef = ref(getDatabase(), `users/${user.uid}/selectedPet`);
      
          const petRef = onValue(dbRef, (snapshot) => {
            const selectedPet = snapshot.val();
            setDbPet(selectedPet);
          });
      
          return () => {
            off(petRef);
          };
        };
      
        fetchDbPet();
      }, []);
    return (
        <>
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <StatusBar/>
            <View style={styles.rewardsWrapper}>
                <View>
                    <Text
                        style={[styles.rewardsHeader, styles.gothamBold]}
                    >Rewards</Text>
                </View>

                <View style={{alignSelf: 'center', marginTop: 25}}>
                {dbPet === 'pudu' && (
                    <Image
                        source={require('../assets/animals/img/Pudu.png')}
                        style={styles.petImg}
                        />
                )}
                {dbPet === 'sparrow' && (
                    <Image
                        source={require('../assets/animals/img/Sparrow.png')}
                        style={styles.petImg}
                        />
                )}
                {dbPet === 'inkfish' && (
                    <Image
                        source={require('../assets/animals/img/InkFish.png')}
                        style={styles.petImg}
                        />
                )}
                    {/* <View style={styles.levelWrapper}>
                        <Text style={[styles.levelBar, styles.gothamBold]}>
                            Level 4
                        </Text>
                        <View style={styles.levelProgress}></View>
                    </View> */}

                    <View style={[styles.progressBar, styles.leftProgressBar]}>
                <View style={styles.iconContainer}>
                  <Icon name="star" size={18} color="black" />
                </View>
                  <ProgressBar
                    progress={0.4} // progress value 40%
                    width={135}
                    height={25}
                    borderRadius={20}
                    borderWidth={3}
                    color={'#FF8577'}
                  />
                    <View style={styles.progressTextContainer}>
                      <Text style={styles.progressText}>Level 4</Text>
                    </View>
              </View>
 
                </View>

                <View style={styles.rewardsTierWrapper}>
                    <View style={styles.activeRewardTier}>
                        <View>
                            <Text style={{...styles.gothamBold, fontSize: 12}}>Tier 1</Text>
                            <Text style={{...styles.gothamBook, marginTop: 5}}>Starbucks $10 Voucher</Text>
                        </View>
               
                        <View>
                        <Modal 
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            Alert.alert('Reward is successfully claimed.');
                            setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>A Starbucks $10 voucher has successfully been claimed.</Text>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                            </View>
                        </Modal>
            
                        <TouchableOpacity style={styles.claimButton}>
                                <Text style={{...styles.gothamBold, fontSize: 10}} onPress={() => setModalVisible(true)}>
                                    Claim
                                </Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{...styles.inactiveRewardTier, gap: 90}}>
                        <View>
                            <Text style={{...styles.gothamBold, fontSize: 12}}>Tier 2</Text>
                            <Text style={{...styles.gothamBook, marginTop: 5}}>???</Text>
                        </View>
                        <View>
                        <TouchableOpacity style={{padding: 10}}>
                                <Text style={{...styles.gothamBold, fontSize: 10}}>
                                    Reach level 5 to unlock
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{...styles.inactiveRewardTier, gap: 90}}>
                        <View>
                            <Text style={{...styles.gothamBold, fontSize: 12}}>Tier 3</Text>
                            <Text style={{...styles.gothamBook, marginTop: 5}}>???</Text>
                        </View>
                        <View>
                        <TouchableOpacity style={{padding: 10}}>
                                <Text style={{...styles.gothamBold, fontSize: 10}}>
                                    Reach level 10 to unlock
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{...styles.inactiveRewardTier, gap: 90}}>
                        <View>
                            <Text style={{...styles.gothamBold, fontSize: 12}}>Tier 4</Text>
                            <Text style={{...styles.gothamBook, marginTop: 5}}>???</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={{padding: 10}}>
                                <Text style={{...styles.gothamBold, fontSize: 10}}>
                                    Reach level 15 to unlock
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{...styles.inactiveRewardTier, gap: 90}}>
                        <View>
                            <Text style={{...styles.gothamBold, fontSize: 12}}>Tier 5</Text>
                            <Text style={{...styles.gothamBook, marginTop: 5}}>???</Text>
                        </View>
                        <View>
                        <TouchableOpacity style={{padding: 10}}>
                                <Text style={{...styles.gothamBold, fontSize: 10}}>
                                    Reach level 20 to unlock
                                </Text>
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
    rewardsHeader: {
        marginLeft: 40,
        fontSize: 35,
    },
    rewardsWrapper: {
        marginTop: 15
    },
    petImg: {
        height: 150,
        width: 150,
    },
    levelWrapper: {
        marginTop: 15,
        width: 125,
        // flexDirection: 'row'
    }, 
    levelBar: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        textAlign: 'center',
        width: 125
    },
    levelProgress: {
        position: 'absolute',
        borderRadius: 20,
        backgroundColor: '#ff8577',
        width: '75%',
        height: 38,
        zIndex: -1,
    },
    rewardsTierWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeRewardTier: {
        flexDirection: 'row',
        gap: 50,
        width: 350,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff6db',
        marginTop: 15
    },
    inactiveRewardTier: {
        flexDirection: 'row',
        gap: 50,
        width: 350,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        marginTop: 15,
        opacity: 0.5
    },
    claimButton: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderRadius: 20,
        right: 0,
        // backgroundColor: '#10a958'
    },
    gothamBold: {
        fontFamily: 'GothamBold'
    },
    gothamBook: {
        fontFamily: 'GothamBook'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      centeredView: {
        flex: 1,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      progressBar: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
      },
      progressTextContainer: {
        position: 'absolute',
        left: 30,
        right: 0,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -6 }],
      },
      progressText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
      },
      iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2.5,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2,
      },
})