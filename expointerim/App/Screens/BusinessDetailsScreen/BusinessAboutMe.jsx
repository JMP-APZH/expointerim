import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors';

export default function BusinessAboutMe({business}) {

    const [isReadMore, setIsReadMore] = useState(false);

  return (
    <View>
      <View>
            <Heading text={'About me'} />
            <Text 
                style={{fontFamily: 'outfit-regular', color:Colors.DARK_GRAY, fontSize: 16, lineHeight: 28}}
                numberOfLines={isReadMore ? 20 : 3}
            > 
                {business.about} 
            </Text>
            <TouchableOpacity
                onPress={() => setIsReadMore(!isReadMore)}
            >
                <Text 
                    style={{color: Colors.PRIMARY, fontSize: 15, fontFamily: 'outfit-regular', 
                            marginLeft: -3}}
                > 
                    {isReadMore ? 'Read Less' : 'Read More'} 
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}