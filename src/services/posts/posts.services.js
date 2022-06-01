import axios from "axios";
const URL_POSTS = `${process.env.VUE_APP_URL_API}posts/`;

export const postsServices = {
    getAllPosts:async (token) => {
        return axios.get( `${URL_POSTS}all`,{ 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getPostsByUser: async (id, token) => {
        return axios.get(`${URL_POSTS}all/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getPostById: async (postId, token) => {
        return axios.get( `${URL_POSTS}one/${postId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    likePostByUser: async (id, token) => {
        return axios.put( `${URL_POSTS}like/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    createPost: async (token, data) => {
        return axios.post( `${URL_POSTS}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    deletePost: async (postId, token) => {
        return axios.delete( `${URL_POSTS}delete/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
    