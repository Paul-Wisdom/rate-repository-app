import { ScrollView, StyleSheet, View } from "react-native"
import Text from "./Text"
import theme from "../theme"
import { Link } from "react-router-native"

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
    return <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab tabName={'Repositories'} route={'/'} />
            <AppBarTab tabName={'Sign In'} route={'/sign-in'} />
        </ScrollView>
    </View>
}

export default AppBar;