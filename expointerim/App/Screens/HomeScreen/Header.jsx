import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'

export default function Header() {

    const { user, isLoading } = useUser()

  return user && (
    <View style={styles.container}>    
        <View style={styles.profileContainer}>
            <Image 
                source={{uri:user?.imageUrl}}
                style={styles.userImage}
            />
            <View style={styles.userData}>
                <Text 
                    style={{color: Colors.WHITE}}
                >
                    Welcome, 
                </Text>
                <Text
                    style={{color: Colors.WHITE, fontSize: 20}}
                >
                    {user?.fullName}
                </Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        padding: 20,
        paddingTop: 20,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userImage:{
        width: 45,
        height: 45,
        borderRadius:99,
    },
    userData: {
        paddingLeft: 5,
    }
})