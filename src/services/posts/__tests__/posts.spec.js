import {postsServices} from '../posts.services';
import {mockToken, mockResponsePromiseResolve, mockResponsePromiseFail, mockIdUser, mockPostId, mockDataCreatePost} from '../__mocks__/posts.mock';
import mockAxios from "axios";


jest.mock("axios", () => ({
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
}));

describe('Posts services tests', () => {
    it("should get all posts", async () => {
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.get.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await postsServices.getAllPosts(mockToken);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.get).toHaveBeenCalled();
    });
    it('should fail when get all posts', async () => {
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.get.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await postsServices.getAllPosts(mockToken);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.get).toHaveBeenCalled();
        }
    });
    it('should get posts by user', async () => {
        const response_post_mock = mockResponsePromiseResolve;
        mockAxios.get.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await postsServices.getPostsByUser(mockIdUser, mockToken);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.get).toHaveBeenCalled();
    });

    it('should fail when get posts by user', async () => {
        const response_post_mock = mockResponsePromiseFail;
        mockAxios.get.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await postsServices.getPostsByUser(mockIdUser, mockToken);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.get).toHaveBeenCalled();
        }
    });

    it('should get posts by id', async () => {
        const response_post_mock = mockResponsePromiseResolve;
        mockAxios.get.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await postsServices.getPostById(mockPostId, mockToken);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.get).toHaveBeenCalled();
    });

    it('should fail when get posts by id', async () => {
        const response_post_mock = mockResponsePromiseFail;
        mockAxios.get.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await postsServices.getPostById(mockPostId, mockToken);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.get).toHaveBeenCalled();
        }
    });
    
    it('should send a like to the post', async () => {
        const response_post_mock = mockResponsePromiseResolve;
        mockAxios.put.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await postsServices.likePostByUser(mockPostId, mockToken);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.put).toHaveBeenCalled();
    });

    it('should fail when send a like to the post', async () => {
        const response_post_mock = mockResponsePromiseFail;
        mockAxios.put.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await postsServices.likePostByUser(mockPostId, mockToken);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.put).toHaveBeenCalled();
        }
    });

    it('should create one post', async () => {
        const response_post_mock = mockResponsePromiseResolve;
        mockAxios.post.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await postsServices.createPost(mockToken, mockDataCreatePost);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.post).toHaveBeenCalled();
    });

    it('should fail when create one post', async () => {
        const response_post_mock = mockResponsePromiseFail;
        mockAxios.post.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await postsServices.createPost(mockToken, mockDataCreatePost);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.post).toHaveBeenCalled();
        }
    });

    it('should delete one post', async () => {
        const response_post_mock = mockResponsePromiseResolve;
        mockAxios.delete.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await postsServices.deletePost(mockPostId, mockToken);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.delete).toHaveBeenCalled();
    });

    it('should fail when delete one post', async () => {
        const response_post_mock = mockResponsePromiseFail;
        mockAxios.delete.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await postsServices.deletePost(mockPostId, mockToken);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.delete).toHaveBeenCalled();
        }
    });
})
