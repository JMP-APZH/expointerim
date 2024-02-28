import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import BusinessItemSmall from '../../Components/BusinessItemSmall';

const client = new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
    cache: new InMemoryCache(),
  });

  const GET_BUSINESS_LISTS = gql`
      query GetBusinessList {
            businessLists {
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


export default function BusinessList() {

    const { loading, error, data } = useQuery(GET_BUSINESS_LISTS);

    if (loading) {console.log('Loading...')};
    if (error) {console.log('Error!', error)};
    

    const data2 = data?.businessLists

    // console.log('From New BusinessList:', data2)


  return (
    <View style={{marginTop: 20}}>
        <Heading 
        text={'Latest Business'} 
        isViewAll = {true}
        />
      {/* <Text>BusinessList</Text> */}
      <FlatList 
        data={data2}
        // numColumns={4}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
            <View 
                // style={styles.container}
            >
                <View 
                    style={{marginRight: 10}}
                >
                    {/* <Image 
                        source={{uri:item?.images[0].url}}
                        style={{width: 30, height: 30}}
                    /> */}
                <BusinessItemSmall business={item} />
                </View>
            </View>
        )}
      />
    </View>
  )
}