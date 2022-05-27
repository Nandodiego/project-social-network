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
        return axios({
            method: 'GET',
            url: `${URL_API}profile/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    findUser: async (token, data) => {
        return axios({
            method: 'POST',
            url: `${URL_API}users/find`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        })
    },
    changeImage: async (id, token, data) =>{
        return axios({
            method: 'PUT',
            url: `${URL_API}users/change-phote/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        });
    },
}