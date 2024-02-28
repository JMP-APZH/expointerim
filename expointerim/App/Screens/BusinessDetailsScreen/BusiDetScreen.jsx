import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function BusiDetScreen() {

    const param = useRoute().params;
    const [business, setBusiness] = useState(param?.business)

    // useEffect(() => {
    //   console.log('Param from business: ', param?.business)
    // }, [param])

    // useEffect(() => {
    //     param && setBusiness(param?.business)
    //   }, [param])
    
    
    

  return (
    
    business && (

    <View>
        <Image 
            source={{uri:business?.images[0]?.url}}
            style={{width: '100%', height: 300}}
        />
      <Text>BusiDetScreen</Text>
    </View>

    )
  )
}