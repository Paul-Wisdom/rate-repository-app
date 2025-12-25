import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
    const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }
        await fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    }

    return { data, error, loading, fetchMore: handleFetchMore}


};

export default useRepositories;