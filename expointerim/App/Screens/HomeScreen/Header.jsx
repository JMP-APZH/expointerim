import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {

    const { user, isLoading } = useUser()

  return (
    <View>
      <Image 
        source={{uri:user?.imageUrl}}
        style={{}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    userImage:{
        width:

})