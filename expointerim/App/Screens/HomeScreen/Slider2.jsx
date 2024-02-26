import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi';


export default function Slider2() {
   
    useEffect(() => {
        getSliders();
    }, [])
    
    const getSliders = () => {
        GlobalApi.getSlider1().then(resp => {
            console.log("API response: ", resp)
            // setSlider(resp?.sliders)
            // console.log("Sliders: ", slider)
            
        })
    }

  return (
    <View>
      <Text style={StyleSheet.heading}> Offers for you </Text>
      <FlatList 
        data={data}
        renderItem={({item, index}) => (
            <View style={{color: Colors.PRIMARY}}>
                <Text style={{color: Colors.PRIMARY}}>
                    {item.sliders[index]}
                </Text>
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    },
})