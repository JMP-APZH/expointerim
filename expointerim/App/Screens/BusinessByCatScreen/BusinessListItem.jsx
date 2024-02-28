import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business}) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={() => navigation.push('business-detail', {
            business: business
          })
        }
    >
        <View 
            style={styles.businessDetailContainer}
        >
            {/* <View> */}
                <Image 
                    source={{uri: business?.images[0]?.url}}
                    style={styles.image}
                />
            {/* </View> */}
            <View style={styles.textContainer}>
                <Text style={{fontFamily:'outfit-regular', color:Colors.DARK_GRAY, fontSize:12}}>
                    {business.contactPerson}
                </Text>
                <Text style={{fontFamily:'outfit-bold', color:Colors.BLACK, fontSize:15}}>
                    {business.name}
                </Text>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 3}}>
                        <Entypo name="location" size={16} color={Colors.PRIMARY} />
                        <Text style={{fontFamily:'outfit-regular', color:Colors.DARK_GRAY, fontSize:13}}>
                        {business.address}
                        </Text>
                    </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'column', // Set flex direction to column
      },
      businessDetailContainer: {
        flexDirection: 'row', // Set flex direction to row
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
      },
      textContainer: {
        display: 'flex',
        gap: 4,
        marginLeft: 10, // Add some margin to separate image and text
        justifyContent: 'center', // Center text vertically
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 15
      }
})

