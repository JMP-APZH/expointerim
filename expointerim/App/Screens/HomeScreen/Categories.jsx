import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';

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

    const { loading, error, data } = useQuery(GET_CATEGORIES);

    // if (loading) {console.log('Loading...')};
    // if (error) {console.log('Error!', error)};

    // console.log('Out of the Categories API: ', data)

    const data2 = data?.categories

    // console.log('Out of the Categories API2: ', data2)

  return (
    <View>
      <Heading 
        text={'Categories'} 
        isViewAll = {true}
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
    
})