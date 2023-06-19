import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

export default function RewardsPage({navigation}) {
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
                    <Image
                        source={require('../assets/animals/img/Pudu.png')}
                        style={styles.petImg}
                        />
                    <View style={styles.levelWrapper}>
                        <Text style={[styles.levelBar, styles.gothamBold]}>
                            Level 1
                        </Text>
                        <View style={styles.levelProgress}></View>
                    </View>
                </View>

                <View style={styles.rewardsTierWrapper}>
                    <View style={styles.activeRewardTier}>
                        <View>
                            <Text style={{...styles.gothamBold, fontSize: 12}}>Tier 1</Text>
                            <Text style={{...styles.gothamBook, marginTop: 5}}>Starbucks $10 Voucher</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.claimButton}>
                                <Text style={{...styles.gothamBold, fontSize: 10}}>
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
        backgroundColor: '#10a958'
    },
    gothamBold: {
        fontFamily: 'GothamBold'
    },
    gothamBook: {
        fontFamily: 'GothamBook'
    }
})