import { Pressable } from "react-native"
import Text from "./Text"
import useAuthStorageContext from "../hooks/useAuthStorageContext"
import { useApolloClient } from "@apollo/client/react";

const SignOut = () => {
    const authStorage = useAuthStorageContext();
    const apolloClient = useApolloClient();
    const onPress = () => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
        
    }
    return (
        <Pressable onPress={onPress}><Text style={{ color: 'white', marginLeft: 7, marginBottom: 5 }}>Sign out</Text></Pressable>
    )
}

export default SignOut;