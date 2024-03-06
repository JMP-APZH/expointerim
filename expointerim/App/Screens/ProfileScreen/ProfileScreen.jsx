import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ProfileScreen() {
  return (
    <View style={styles.centralView}>
      <Text>ProfileScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  centralView: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('100%'),
    width: wp('100%')
  }
})