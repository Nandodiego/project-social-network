import axios from "axios";
const URL_POSTS = `${process.env.VUE_APP_URL_API}posts/`;

export const postsServices = {
    getAllPosts:async (token) => {
        return axios({
            method: 'GET',
            url: `${URL_POSTS}all`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getPostsByUser: async (id, token) => {
        return axios({
            method: 'GET',
            url: `${URL_POSTS}all/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getPostById: async (postId, token) => {
        return axios({
            method: 'GET',
            url: `${URL_POSTS}one/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    likePostByUser: async (id, token) => {
        return axios({
            method: 'PUT',
            url: `${URL_POSTS}like/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    createPost: async (token, data) => {
        return axios({
            method: 'POST',
            url: `${URL_POSTS}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        });
    },
    deletePost: async (postId, token) => {
        return axios({
            method: 'DELETE',
            url: `${URL_POSTS}delete/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }
}
    