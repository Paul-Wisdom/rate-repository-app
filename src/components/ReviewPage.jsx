import { FlatList, View } from "react-native";
import useloggedInUser from "../hooks/useLoggedInUser";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const ReviewPage = () => {
    const { data } = useloggedInUser(true);
    console.log(data);
    const reviews = data ? data.me.reviews.edges.map(r => r.node).map(r => {
        return { ...r, name: `${r.repository.ownerName}/${r.repository.name}` }
    }) : []

    return (
        <>
            {reviews.length > 0 && <FlatList
                ItemSeparatorComponent={ItemSeparator}
                data={reviews}
                renderItem={(review) => <ReviewItem key={review.item.id} review={review.item} reviewPage={true}/>}
            />}
            {reviews.length === 0 && <Text>No reviews yet</Text>}
        </>
    )
}

export default ReviewPage;