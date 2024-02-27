import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import { useNavigation } from '@react-navigation/native';

const client = new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
    cache: new InMemoryCache(),
  });

const GET_CATEGORIES = gql`
query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `;


export default function Categories() {

    const navigation = useNavigation()
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    // if (loading) {console.log('Loading...')};
    // if (error) {console.log('Error!', error)};

    // console.log('Out of the Categories API: ', data)

    const data2 = data?.categories

    // console.log('Out of the Categories API2: ', data2)

  return (
    <View style={{marginTop: 10}}>
      <Heading 
        text={'Categories'} 
        isViewAll = {true}
        />
        <FlatList 
        data={data2}
        numColumns={4}
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => index<=4 && (
            <TouchableOpacity 
                style={styles.container}
                onPress={() => navigation.push('business-list')}
            >
                <View 
                    style={styles.iconContainer}
                >
                    <Image 
                        source={{uri:item?.icon?.url}}
                        style={{width: 30, height: 30}}
                    />
                </View>
                <Text style={{fontFamily: 'outfit-medium', marginTop: 5}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 17,
        borderRadius: 99
    }
    
})