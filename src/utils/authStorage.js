import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage{
    constructor(namespace = 'auth'){
        this.namespace = namespace;
    }

    async getAccessToken(){
        const token = JSON.parse(await AsyncStorage.getItem(`${this.namespace}:token`))
        return token
    }

    async setAccessToken(accesstoken){
        await AsyncStorage.setItem(`${this.namespace}:token`, JSON.stringify(accesstoken))
    }

    async removeAccessToken(){
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}

export default AuthStorage;