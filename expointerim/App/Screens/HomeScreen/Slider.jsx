import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi';

// import { gql, useQuery } from '@apollo/client';

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Colors from '../../Utils/Colors';

const client = new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
    cache: new InMemoryCache(),
  });

  const GET_SLIDERS = gql`
      query GetSlider {
        sliders {
            id
            name
            image {
             url
            }
        }
    }
    `;

export default function Slider() {


    const { loading, error, data } = useQuery(GET_SLIDERS);

        // const [slider, setSlider] = useState([]);
    


        if (loading) {console.log('Loading...')};
        if (error) {console.log('Error!', error)};
        
        const [slider, setSlider] = useState([]);
        // setSlider(data?.sliders)

        const data2 = data?.sliders

        // console.log('From New Slider:', data2)
    
    
    // useEffect(() => {
    //     getSliders();
    // }, [])
    
    // const getSliders = () => {
    //     GlobalApi.getSlider1().then(resp => {
    //         console.log("API response: ", resp)
    //         // setSlider(resp?.sliders)
    //         // console.log("Sliders: ", slider)
            
    //     })
    // }

  return (
    <View>
      <Text style={StyleSheet.heading}> Offers for you </Text>
      <FlatList 
        data={data2}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
            <View 
                style={{marginRight: 10}}
            >
                {/* <Text 
                    style={{color: Colors.PRIMARY}}
                > */}
                    {/* {item.name} */}
                    <Image 
                        source={{uri:item?.image?.url}}
                        style={styles.sliderImage}
                    />
                {/* </Text> */}
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    },
    sliderImage: {
        width: 270,
        height: 150,
        borderRadius: 10,
        objectFit: 'contain',
    }
})