import { useMutation } from "@apollo/client/react"
import { CREATE_USER } from "../graphql/mutations"
import { useState } from "react";

const useCreateUser = () => {
    const [error, setError] = useState(null);

    const [mutate, { data }] = useMutation(CREATE_USER, {
        onError: (error) => {
            console.log(error.message);
            setError(error.message);
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    });

    const createUser = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } })
    }

    return { createUser, error };
}


export default useCreateUser;