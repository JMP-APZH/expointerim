import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'

import { FontAwesome, Ionicons  } from '@expo/vector-icons';

export default function Header() {

    const { user, isLoading } = useUser()

  return user && (
    <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
                <Image 
                    source={{uri:user?.imageUrl}}
                    style={styles.userImage}
                />
                <View style={styles.userData}>
                    <Text 
                        style={{color: Colors.WHITE, fontFamily:'outfit-regular'}}
                    >
                        Welcome, 
                    </Text>
                    <Text
                        style={{color: Colors.WHITE, fontSize: 20, fontFamily:'outfit-medium'}}
                    >
                        {user?.fullName}
                    </Text>
                </View>
            </View>
            <FontAwesome name="bookmark-o" size={25} color={Colors.WHITE} />
        </View> 
        {/* Search Bar Section */}
        <View style={styles.SearchBarContainer}>
            <TextInput 
                placeholder='Search'
                style={styles.TextInput}
            />
            <FontAwesome 
                style={styles.searchBtn}
                name="search" 
                size={25} color={Colors.PRIMARY} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        padding: 15,
        paddingTop: 20,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userImage:{
        width: 45,
        height: 45,
        borderRadius:99,
    },
    userData: {
        // paddingLeft: 5,
    },
    SearchBarContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        gap: 10,
        marginBottom: 5
    },
    TextInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        // fontFamily: 'outfit-regular'
    },
    searchBtn: {
        backgroundColor: Colors.WHITE,
        padding: 8,
        borderRadius: 8
    }
})