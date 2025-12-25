import { ScrollView, StyleSheet, View } from "react-native"
import Text from "./Text"
import theme from "../theme"
import { Link } from "react-router-native"
import useloggedInUser from "../hooks/useLoggedInUser"
import SignOut from "./SignOut"

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: 'row',
        backgroundColor: theme.tab.color
    }
})

const AppBarTab = ({ tabName, route }) => {
    return <Link to={route}><Text style={{ color: 'white', marginLeft: 7, marginBottom: 5 }}>{tabName}</Text></Link>
}
const AppBar = () => {
    const {data} = useloggedInUser();
    console.log(data);
    const user = data? data.me : null
    

    return <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab tabName={'Repositories'} route={'/'} />
             {user && <AppBarTab tabName={'Create a review'} route={'/review'}/>}
             {user && <AppBarTab tabName={'My reviews'} route={'/reviews'}/>}
            {!user? <AppBarTab tabName={'Sign In'} route={'/sign-in'} />: <SignOut />}
            {!user && <AppBarTab tabName={'Sign up'} route={'/sign-up'}/>}
        </ScrollView>
    </View>
}

export default AppBar;