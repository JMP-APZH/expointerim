import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function Login() {
  return (
    <View style={{alignItems:'center'}}>
      <Image 
        source={require('./../../../assets/images/login.png')}
        style={styles.loginImage}
      />

      <View style={styles.subContainer}>
        <Text style={{fontSize:27, color:Colors.WHITE, textAlign:'center'}}>
            Let's find 
            <Text style={{fontWeight:'bold'}}>
                 Professional Cleaning and Repair 
            </Text>
            Services
        </Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage:{
        width:230,
        height:450,
        marginTop:70,
        borderWidth:4,
        borderColor:Colors.BLACK,
        borderRadius:15
    },
    subContainer:{
        width:'100%',
        backgroundColor:Colors.PRIMARY,
        height:'70%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20,
    }
})