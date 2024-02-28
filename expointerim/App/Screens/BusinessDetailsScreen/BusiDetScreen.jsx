import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';

export default function BusiDetScreen() {

    const param = useRoute().params;
    const [business, setBusiness] = useState(param?.business)

    const navigation = useNavigation()
    // useEffect(() => {
    //   console.log('Param from business: ', param?.business)
    // }, [param])

    // useEffect(() => {
    //     param && setBusiness(param?.business)
    //   }, [param])
    
    
    

  return (
    <>
    <FlatList
            data={[business]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <>
                <TouchableOpacity 
                    style={{marginTop: 30, position: 'absolute', zIndex: 10, padding: 20}}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={30} color={Colors.WHITE} />
                </TouchableOpacity>
                
                {item && (

                <View style={{marginTop: 35,}}>
                    <Image 
                        source={{uri:item?.images[0]?.url}}
                        style={{width: '100%', height: 225}}
                    />
                </View>

                )}

                <View style={styles.infoContainer}>
                    <Text style={{fontSize: 25, fontFamily:'outfit-bold'}}>
                        { item?.name }
                    </Text>
                    <View style={styles.subContainer}>
                        <Text style={{fontSize: 20, fontFamily:'outfit-medium', color:Colors.PRIMARY}}>
                            { item?.contactPerson } 🌟
                        </Text>
                        <Text style={{fontSize: 17, fontFamily:'outfit-regular', color:Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, padding: 3, borderRadius: 5}}>
                            { item?.category.name }
                        </Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="location" size={18} color={Colors.PRIMARY} style={{marginRight: 3}} />
                        <Text style={{fontSize: 17, fontFamily:'outfit-regular', color:Colors.DARK_GRAY}}>
                            { item?.address }
                        </Text>
                    </View>
                    <View style={{borderWidth: 0.4, marginTop: 15, marginBottom: 15, borderColor: Colors.DARK_GRAY}}>
                    </View>
                    <BusinessAboutMe business={item} />
                    <View style={{borderWidth: 0.4, marginTop: 15, marginBottom: 15, borderColor: Colors.DARK_GRAY}}>
                    </View>
                    <BusinessPhotos business={item} />
                </View>
                </>
            )}
        />

    </>
  )
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 20,
        display: 'flex',
        gap: 7
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
})