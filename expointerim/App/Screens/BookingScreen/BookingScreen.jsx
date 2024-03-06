import { View, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react';

export default function BookingScreen() {
  return (
    <View style={styles.centralView}>
      <Text>BookingScreen</Text>
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