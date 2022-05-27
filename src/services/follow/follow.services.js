import axios from "axios";
const URL_API = `${process.env.VUE_APP_URL_API}follower`;

export const followServices =  {
    followUser: async (token, data) => {
        return axios({
            method: 'POST',
            url: `${URL_API}/follow`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        })
    },
    unFollowUser: async (token, data) => {
        return axios({
            method: 'DELETE',
            url: `${URL_API}/un-follow`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        })
    }
}