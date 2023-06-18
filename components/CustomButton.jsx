import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}></Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        // height:40,
        // width:160,
        // backgroundColor: "#16D7E1",
        // borderRadius: 20,
        // top:120,
        // display: 'flex',
        // alignItems: 'center',
        // textAlign: 'center',
        backgroundColor: '#EF524A',
        padding:15,
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
    },
    text:{
        color:'white',
        fontWeight: 'bold',
    }});

export default CustomButton