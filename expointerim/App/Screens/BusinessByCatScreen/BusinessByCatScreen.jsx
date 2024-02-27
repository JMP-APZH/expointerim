import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

export default function BusinessByCatScreen() {

    const param = useRoute().params;

    useEffect(() => {
      console.log('Category passed is: ', param.category)
    }, [])
    

  return (
    <View>
      <Text>BusinessByCatScreen</Text>
    </View>
  )
}