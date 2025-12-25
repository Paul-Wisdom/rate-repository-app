import { View } from "react-native"
import RepositoryItem from "./RepositoryItem"
import { useParams } from "react-router-native"
import useRepository from "../hooks/useRepository";
import { FlatList } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
const RepositoryPage = () => {
    const {id} = useParams();

    const {data, fetchMore} = useRepository(id, 10);
    const repository = data? data.repository : null
    const reviews = repository? repository.reviews.edges.map(r => r.node).map(r => {
        return {...r, name: r.user.username}
    }) : [];

    const onEndReached = async () => {
        await fetchMore()
    }

    return(<>
        {data && <FlatList 
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={(review) => <ReviewItem key={review.item.id} review={review.item}/>}
            ListHeaderComponent={<RepositoryItem repository={data.repository} singleRepositoryPage={true}/>}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />}
        </>
    )
}



export default RepositoryPage