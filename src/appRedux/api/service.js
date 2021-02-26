import axios from 'axios'


const rootService = (BASE_URL) => {
    return axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': 'http://app.abylogistics.com/',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}
export default rootService