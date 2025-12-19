import { Image, StyleSheet, View } from "react-native"
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50
    },
    container: {
        flexDirection: 'column',
        padding: 15,
        backgroundColor: 'white'
    },
    repoInfoContainer: {
        flexDirection: 'row',
        // flexGrow: 0,
    },
    repoStatsContainer: {
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'space-evenly',
    }
})

const Stats = ({ name, value }) => {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text fontWeight={'bold'}>{value}</Text>
            <Text color={'textSecondary'}>{name}</Text>
        </View>
    )
}
const RepositoryItem = ({ repository }) => {
    return (
        <View style={styles.container}>
            <View style={styles.repoInfoContainer}>
                <View style={{padding: 5}}>
                    <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text fontWeight={'bold'}>{repository.fullName}</Text>
                    <Text color={'textSecondary'} style={{marginRight: 50}}>{repository.description}</Text>
                    <Text style={{ backgroundColor: theme.colors.primary, color: 'white', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 5, marginVertical: 8 }}>{repository.language}</Text>
                </View>
            </View>
            <View style={styles.repoStatsContainer}>
                <Stats name={'Stars'} value={repository.stargazersCount > 1000 ? `${Number(repository.stargazersCount / 1000).toFixed(1)}k` : repository.stargazersCount} />
                <Stats name={'Forks'} value={repository.forksCount > 1000 ? `${Number(repository.forksCount / 1000).toFixed(1)}k` : repository.forksCount} />
                <Stats name={'Reviews'} value={repository.reviewCount} />
                <Stats name={'Rating'} value={repository.ratingAverage} />
            </View>
        </View>
    )
}

export default RepositoryItem;