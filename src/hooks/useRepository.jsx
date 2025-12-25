import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
    const {data, loading, error, fetchMore} = useQuery(GET_REPOSITORY, {variables: {repositoryId: id, first}}, {
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

        if(!canFetchMore) return;

        await fetchMore({variables: {
            repositoryId: id,
            first,
            after: data.repository.reviews.pageInfo.endCursor
        }})
    }

    return {data, fetchMore: handleFetchMore}
}

export default useRepository;