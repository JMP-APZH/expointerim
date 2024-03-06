import { View, Text, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import BusinessList from './BusinessList'


export default function HomeScreen() {
  return (
    <View style={styles.centralView}>
      <Header />
      <View style={{padding: 20}}>
        <Slider />
        <Categories />
        <BusinessList />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centralView: {
    marginTop: 10,
    height: hp('100%'),
    width: wp('100%')
  }
})