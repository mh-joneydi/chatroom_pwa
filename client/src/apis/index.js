import axios from 'axios';

//MESSAGES API
export const messages =  axios.create({
    baseURL: 'https://603fda2af3abf00017785352.mockapi.io/api/messages'
});
//USERS API
export const users = axios.create({
    baseURL: 'http://localhost:3001/users'
});