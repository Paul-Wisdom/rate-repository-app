import { useQuery } from "@apollo/client/react"
import { ME } from "../graphql/queries"

const useloggedInUser = (includeReviews = false) => {
    const {data} = useQuery(ME, {variables: {includeReviews}});

    return {data};
}

export default useloggedInUser;