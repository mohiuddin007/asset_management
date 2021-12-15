import axios from "axios";

const Api = axios.create({
    baseURL: `http://192.168.87.36:3000/api`
})

export default Api;

