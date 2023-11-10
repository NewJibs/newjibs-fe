import axios from 'axios'

const {SERVER_URL, SERVER_VERSION} = import.meta.env

export const instance = axios.create({
    baseURL: SERVER_URL + SERVER_VERSION,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',

    }
})