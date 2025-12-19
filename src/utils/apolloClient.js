import { InMemoryCache } from "@apollo/client"
import { HttpLink } from "@apollo/client"
import { ApolloClient } from "@apollo/client"
import { setContext, SetContextLink } from "@apollo/client/link/context"
import Constants from 'expo-constants'

const { apollo_uri } = Constants.expoConfig.extra
const httpLink = new HttpLink({ uri: apollo_uri });


const createApolloClient = (authStorage) => {
    const authLink = new SetContextLink(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            console.log(accessToken)
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : ''
                }
            }
        } catch (e) {
            console.log(e);
            return {
                headers
            }
        }
    })
// const createApolloClient = (authStorage) => {
//     const authLink = setContext(async (_, { headers }) => {
//         try {
//             const accessToken = await authStorage.getAccessToken();
//             console.log(accessToken)
//             return {
//                 headers: {
//                     ...headers,
//                     authorization: accessToken ? `Bearer ${accessToken}` : ''
//                 }
//             };
//         } catch (e) {
//             console.log(e);
//             return {
//                 headers
//             };
//         }
//     });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    })
}

export default createApolloClient;