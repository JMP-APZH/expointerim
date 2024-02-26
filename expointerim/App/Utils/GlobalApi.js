
// API's Endpoints

// import { request, gql } from 'graphql-request'

import { gql, useQuery } from '@apollo/client';

// const M_URL = process.env.HYGRAPH_MASTER_URL

const M_URL = "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clt2ywf2t1xc508vwzieo93jo/master";

const getSlider1 = async () => {

    const query = gql`
      query GetSlider {
        sliders {
            id
            name
            image {
             url
            }
        }
    }
    `
    const result = await request(M_URL, query);
    // console.log('From Query : ', query)
    return result
    

}

// function Slider2({query}) {

//     const { loading, error, data } = useQuery(query);
    
//             if (loading) return 'Loading...';
//             if (error) return `Error! ${error.message}`;
    
//             console.log('data from Apollo: ', data)
// }

// const getSlider1 = () => {

//         const QUERY = gql`
//           query GetSlider {
//             sliders {
//                 id
//                 name
//                 image {
//                  url
//                 }
//             }
//         }
//         `
//         const result = request(M_URL, QUERY).then((data) => console.log(data));
    
//         return {JSON(result)}
        
    
//     }


export default {
    getSlider1
}
