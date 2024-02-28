import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';

const client = new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
    cache: new InMemoryCache(),
  });

const GET_BUSINESS_LISTS_BY_CAT = gql`
      query GetBusinessList($category: String!) {
            businessLists(where: {category: { name: $category }}) {
                id
                name
                email
                contactPerson
                category {
                name
                }
                address
                about
                images {
                url
                }
            }
        }
    `;


export default function BusinessByCatScreen() {

    const param = useRoute().params;
    const navigation = useNavigation();

    const { loading, error, data } = useQuery(GET_BUSINESS_LISTS_BY_CAT, {
        variables: { category: param?.category || "" }
    });

    useEffect(() => {
    //   console.log('Category passed is: ', param.category)
    }, [])


    const data2 = data?.businessLists

    // console.log('Out of the Business by Categories: ', data2)

  return (
    <View style={{padding: 20, paddingTop: 30}}>
        <TouchableOpacity 
            style={{display: 'flex', flexDirection: 'row', gap: 10, paddingTop: 10, 
                    alignItems: 'center'}}
        onPress={() => navigation.goBack()}
            >
            <Ionicons name="arrow-back-outline" size={30} color="black" />
            <Text style={{fontSize: 25, fontFamily:'outfit-medium'}}>
                { param?.category }
            </Text>
        </TouchableOpacity>
        {data2?.length > 0 ?
            <FlatList 
            data={data2}
            style={{marginTop: 10}}
            renderItem={({item, index}) => index<=4 && (
                <BusinessListItem business={item} />
            )}
        /> : <Text style={{fontFamily: 'outfit-medium', fontSize: 16, textAlign: 'center', marginTop:'20%', color: Colors.DARK_GRAY}}>
            No Business Found
        </Text>
        
        }
      </View>
  )
}