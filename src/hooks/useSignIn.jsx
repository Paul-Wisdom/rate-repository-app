import { useState } from "react";
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client/react";
import useAuthStorageContext from "./useAuthStorageContext";

const useSignIn = () => {
    const [error, setError] = useState(null);
    const apolloClient = useApolloClient()
    const authStorage = useAuthStorageContext();

    const [authenticate, result] = useMutation(AUTHENTICATE, {
        onError: (error) => {
            console.log(error.message);
            setError(error.message);
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    });

    const signIn = async ({username, password}) => {
        const {data} = await authenticate({variables: {username, password}});
        console.log(data);

        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore()
    }

    return {signIn, error, result}
}

export default useSignIn;