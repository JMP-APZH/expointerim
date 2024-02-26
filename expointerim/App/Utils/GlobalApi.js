
// API's Endpoints

import { request, gql } from 'graphql-request'

const M_URL = process.env.HYGRAPH_MASTER_URL

const getSlider = async () => {

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
    const result = await request(M_URL, query)

    return result

}
 
export default {
    getSlider
}