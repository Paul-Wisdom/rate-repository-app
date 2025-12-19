import { useContext } from "react"
import AuthStorageContext from "../context/AuthStorage"

const useAuthStorageContext = () => {
    return useContext(AuthStorageContext)
}

export default useAuthStorageContext;