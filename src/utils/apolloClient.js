import { InMemoryCache } from "@apollo/client"
import { HttpLink } from "@apollo/client"
import { ApolloClient } from "@apollo/client"
import { setContext, SetContextLink } from "@apollo/client/link/context"
import { relayStylePagination } from "@apollo/client/utilities"
import Constants from 'expo-constants'

const { apollo_uri } = Constants.expoConfig.extra
const httpLink = new HttpLink({ uri: apollo_uri });
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
            },
        },
        Repository: {
            fields: {
                reviews: relayStylePagination()
            }
        }
    }
})

const createApolloClient = (authStorage) => {
    const authLink = new SetContextLink(async ({ headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            // console.log(accessToken)
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
    return new ApolloClient({
        cache: cache,
        link: authLink.concat(httpLink)
    })
}

export default createApolloClient;