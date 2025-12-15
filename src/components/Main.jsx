import { StyleSheet, View } from "react-native"
import RepositoryList from "./RepositoryList";
import Constants from 'expo-constants'
import Text from "./Text";
import AppBar from "./AppBar";
import theme from "../theme";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.background.mainBackgroundColor,
        marginTop: Constants.statusBarHeight
    }
})

const Main = () => {
    return(
    <View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path="/" element= {<RepositoryList />}/>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Navigate to={'/'} replace/>}/>
        </Routes>
        
    </View>)
}

export default Main;