import axios from "axios";

const URL_API = `${process.env.VUE_APP_URL_API}`;

export const userServices = {
    create: async (user) => {
        return axios.post(`${URL_API}users`, user);
    },
    logIn: async (user) => {
        return axios.post(`${URL_API}auth/login`, user);
    },
    recoveryPassword: async (user) => {
        return axios.post(`${URL_API}auth/forgot-password`, user);
    },
    changePassword: async (user) => {
        return axios.put(`${URL_API}auth/change-password`, user)
    },
    userData:async (id, token) => {
        return axios.get( `${URL_API}profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    findUser: async (token, nick) => {
        return axios.post(`${URL_API}users/find`, nick, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    changeImage: async (id, token, file) =>{
        return axios.put( `${URL_API}users/change-phote/${id}`, file, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
}