import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

export default function BusinessItemSmall({business}) {
  return (
    <View style={styles.container}>
      <Image 
        source={{uri:business?.images[0].url}}
        style={styles.image}
      />
      <View>
        <Text 
            style={{fontSize: 13, fontFamily:'outfit-medium'}}
        >
            { business?.name }
        </Text>
        <Text 
            style={{fontSize: 10, fontFamily:'outfit-regular'}}
        >
            { business?.contactPerson }
        </Text>
        <Text
            style={{fontSize: 8, fontFamily:'outfit-regular', padding: 3, color:Colors.PRIMARY}}
        >{ business?.category?.name }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10,
    },
    
})