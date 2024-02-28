import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function BusinessListItem({business}) {
  return (
    <View 
        style={styles.container}
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
                <Text>
                    {business.contactPerson}
                </Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', // Set flex direction to column
      },
      businessDetailContainer: {
        flexDirection: 'row', // Set flex direction to row
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
      },
      textContainer: {
        marginLeft: 10, // Add some margin to separate image and text
        justifyContent: 'center', // Center text vertically
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 15
      }
})

