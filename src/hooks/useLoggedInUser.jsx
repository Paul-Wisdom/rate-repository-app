import { useQuery } from "@apollo/client/react"
import { ME } from "../graphql/queries"

const useloggedInUser = () => {
    const {data} = useQuery(ME);

    return {data};
}

export default useloggedInUser;