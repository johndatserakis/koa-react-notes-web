import axios from 'axios'

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api/v1',
})

export default instance
