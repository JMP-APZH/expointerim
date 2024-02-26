import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi';

export default function Slider() {

    const [slider, setSlider] = useState();
    useEffect(() => {
        getSliders();
    }, [])
    
    const getSliders = () => {
        GlobalApi.getSlider().then(resp => {
            console.log("API response: ", resp)
            setSlider(resp?.sliders)
        })
    }

  return (
    <View>
      <Text>Slider</Text>
    </View>
  )
}