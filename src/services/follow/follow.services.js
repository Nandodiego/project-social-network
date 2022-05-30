import axios from "axios";
const URL_API = `${process.env.VUE_APP_URL_API}follower`;

export const followServices =  {
    followUser: async (token, data) => {
        return axios.post(`${URL_API}/follow`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    unFollowUser: async (token, data) => {
        return axios.delete(`${URL_API}/un-follow`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}