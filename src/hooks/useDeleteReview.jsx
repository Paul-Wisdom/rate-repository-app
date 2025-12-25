import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";
import { ME } from "../graphql/queries";

const useDeleteReview = () => {
    const [mutate, {data}] = useMutation(DELETE_REVIEW, {refetchQueries: [ME]})

    const deleteReview = async (id) => {
        await mutate({variables: {id}})

    }

    return {deleteReview}
}

export default useDeleteReview;