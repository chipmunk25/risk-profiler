import axios from 'axios'

export const BASE_URL = "https://chipsoft-pos.herokuapp.com/v1"
export const ONLINE_TEST_URL = "https://tschms.herokuapp.com/v1"
export const TEST_URL = "http://localhost:8081/v1"

const root = () => {
    return axios.create({
        baseURL: TEST_URL,
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}
export default root