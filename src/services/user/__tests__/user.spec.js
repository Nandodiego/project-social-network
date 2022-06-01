import { userServices } from '../user.services';
import {
    mockDataCreateUser,
    mockResponsePromiseResolve,
    mockResponsePromiseFail,
    mockDataLoginUser,
    mockEmailRecoveryPass,
    mockChangePassword,
    mockGetUserProfile,
    mockFindUser,
    mockChangeUserImage
} from '../__mocks__/user.mock';

import mockAxios from "axios";

jest.mock("axios", () => ({
    post: jest.fn(),
    put: jest.fn(),
    get: jest.fn(),
}));

describe("users services tests", () => {
    it.skip("should create a user", async () => {
        const data = mockDataCreateUser;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.post.mockImplementation(() => Promise.resolve(response_post_mock));

        const result = await userServices.create(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.post).toHaveBeenCalled();
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when create a user", async () => {
        const data = mockDataCreateUser;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.post.mockImplementation(() => Promise.reject(response_post_mock));

        try{
            await userServices.create(data);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should login the user", async () => {
        const data = mockDataLoginUser;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.post.mockImplementation(() => Promise.resolve(response_post_mock));
        const result = await userServices.logIn(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.post).toHaveBeenCalled();
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when login the user", async () => {
        const data = mockDataLoginUser;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.post.mockImplementation(() => Promise.reject(response_post_mock));
        try{
            await userServices.logIn(data);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should recovery the password", async () => {
        const data = mockEmailRecoveryPass;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.post.mockImplementation(() => Promise.resolve(response_post_mock));
        const result = await userServices.recoveryPassword(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.post).toHaveBeenCalled();
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when recovery the password", async () => {
        const data =  mockEmailRecoveryPass;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.post.mockImplementation(() => Promise.reject(response_post_mock));
        try{
            await userServices.recoveryPassword(data);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should change the password", async () => {
        const data = mockChangePassword;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.put.mockImplementation(() => Promise.resolve(response_post_mock));
        const result = await userServices.changePassword(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.put).toHaveBeenCalled();
        expect(mockAxios.put).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when change the password", async () => {
        const data =  mockChangePassword;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.put.mockImplementation(() => Promise.reject(response_post_mock));
        try{
            await userServices.changePassword(data)
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.put).toHaveBeenCalled();
            expect(mockAxios.put).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should get user data", async () => {
        const data = mockGetUserProfile;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.get.mockImplementation(() => Promise.resolve(response_post_mock));
        const result = await userServices.userData(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.get).toHaveBeenCalled();
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when get user data", async () => {
        const data = mockGetUserProfile;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.get.mockImplementation(() => Promise.reject(response_post_mock));
        try{
            await userServices.userData(data)
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.get).toHaveBeenCalled();
            expect(mockAxios.get).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should find a user", async () => {
        const data = mockFindUser;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.post.mockImplementation(() => Promise.resolve(response_post_mock));
        const result = await userServices.findUser(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.post).toHaveBeenCalled();
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when find a user", async () => {
        const data = mockFindUser;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.post.mockImplementation(() => Promise.reject(response_post_mock));
        try{
            await userServices.findUser(data);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should change the user image", async () => {
        const data = mockChangeUserImage;
        const response_post_mock = mockResponsePromiseResolve;

        mockAxios.put.mockImplementation(() => Promise.resolve(response_post_mock));
        const result = await userServices.changeImage(data);
        expect(result).toEqual(response_post_mock);
        expect(mockAxios.put).toHaveBeenCalled();
        expect(mockAxios.put).toHaveBeenCalledTimes(1);
    });

    it("should fail when change the user image", async () => {
        const data = mockChangeUserImage;
        const response_post_mock = mockResponsePromiseFail;

        mockAxios.put.mockImplementation(() => Promise.reject(response_post_mock));
        try{
            await userServices.changeImage(data);
        }catch(error){
            expect(error).toEqual(response_post_mock);
            expect(mockAxios.put).toHaveBeenCalled();
            expect(mockAxios.put).toHaveBeenCalledTimes(1);
        }
    });
})