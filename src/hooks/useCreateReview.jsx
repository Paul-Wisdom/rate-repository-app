import { useMutation } from "@apollo/client/react"
import { CREATE_REVIEW } from "../graphql/mutations"
import { useState } from "react";
import { useNavigate } from "react-router-native";

const useCreateReview = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [mutate, {data}] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            console.log(error.message);
            setError(error.message);
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    });

    const createReview = async ({repositoryName, ownerName, rating, text}) => {
       const {data} = await mutate({variables: {repositoryName, ownerName, rating, text}})
       if(data){
        console.log(data);
        navigate(`/repositories/${data.createReview.repositoryId}`)
       }
       
    }

    return {createReview, error};
}

export default useCreateReview;