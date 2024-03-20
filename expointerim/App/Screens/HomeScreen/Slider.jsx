import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi';

// import { gql, useQuery } from '@apollo/client';

import { ApolloClient, HttpLink, createHttpLink, InMemoryCache, gql, useLazyQuery, useQuery } from '@apollo/client';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';

import { Logger } from 'apollo-link-logger';

// import axios from 'axios';


// const baseUrl = 'http://localhost:4000/';
// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
{/* <script src="http://localhost:8097"></script> */}

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/',
//     cache: new InMemoryCache(),
//   });

  

const client = new ApolloClient({
  uri: 'http://10.177.51.171:4000/', // Replace with your GraphQL endpoint
  cache: new InMemoryCache()
});


// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/',
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

// const loggerLink = new Logger();

// const client = new ApolloClient({
//   link: loggerLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

// const client = new ApolloClient({
//     uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master',
//     cache: new InMemoryCache(),
//   });

//   const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql/',
//     cache: new InMemoryCache(),
//     defaultOptions: {
//       watchQuery: {
//         errorPolicy: 'none'
//       },
//       query: {
//         errorPolicy: 'none'
//       },
//       mutate: {
//         errorPolicy: 'none'
//       }
//     }
//   });

//   const client = new ApolloClient({
//     link: new HttpLink({
//         uri: "http://localhost:4000/",
//     }),
//     cache: new InMemoryCache(),
// });

  const GET_SLIDERS = gql`
      query Sliders {
        sliders {
            id
            name
            imageUrl
        }
    }
    `;

// const GET_SLIDERS = gql`
// query GetSlider {
//   sliders {
//       id
//       name
//       image {
//        url
//       }
//   }
// }
// `;


export default function Slider() {


    const { loading, error, data } = useQuery(GET_SLIDERS, {client});
    // const { loading, error, data } = useQuery(GET_SLIDERS, { errorPolicy: "all" });
    
    // const { loading, error, data } = useLazyQuery(GET_SLIDERS, {client});
    // const { loading, error, data } = useQuery(GET_SLIDERS, {
    //     fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    //   });

        // const [slider, setSlider] = useState([]);
    


        if (loading) {console.log('Loading...')};
        // if (error) {console.log('Error!', error)};
        if (error) {console.log('from Error-Details: ', JSON.stringify(error, null, 2))}
        // console.log('from Error-Details: ', JSON.stringify(error, null, 2))

        const [slider, setSlider] = useState([]);
        // setSlider(data?.sliders)

        const data2 = data?.sliders

        console.log('From New Slider:', data2)
    
    
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
      <Heading text={'Offers for you'} />
      <FlatList 
        data={data2}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
            <View 
                style={{marginRight: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
            >
                
                    <Image 
                        source={{uri:item.imageUrl}}
                        style={styles.sliderImage}
                    />
                    <Text 
                    style={{color: Colors.PRIMARY}}
                >
                    {item.name}
                    {/* {item.imageUrl} */}
                    </Text>
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: 220,
        height: 110,
        borderRadius: 10,
        objectFit: 'contain',
    }
})