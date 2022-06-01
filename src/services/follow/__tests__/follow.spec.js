import { followServices } from "../follow.services";

import { 
    mockUsersFromAndTo,
    mockResponsePromiseResolve,
    mockPromiseResponseFail,
    mockToken,
    mockUnfollowResponseOk,
    mockUnfollowResponseFail
} from "../__mocks__/follow.mock";

import mockAxios from "axios";

jest.mock("axios", () => ({
    post: jest.fn(),
    delete: jest.fn()
}));


describe("Follow services tests", () => {
    it.skip("should follow user", async () => {
        const data = mockUsersFromAndTo;

        const response_post_mock = mockResponsePromiseResolve

        mockAxios.post.mockImplementation(() => Promise.resolve(response_post_mock));
        
        const result = await followServices.followUser(mockToken, data);

        expect(result).toEqual(response_post_mock)
        expect(mockAxios.post).toHaveBeenCalled();
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it.skip("should fail when user wants to follow other user", async () => {
        const data = mockUsersFromAndTo;

        const error_response_post_mock = mockPromiseResponseFail;

        mockAxios.post.mockImplementation(() => Promise.reject(mockPromiseResponseFail));
        
        try{
            await followServices.followUser(mockToken, data);
        }catch(error){
            expect(error).toEqual(error_response_post_mock)
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("should unfollow user", async () => {
        const data = mockUsersFromAndTo;

        mockAxios.delete
        .mockImplementation(
            () => Promise.resolve(mockUnfollowResponseOk)
        );

        const result = await followServices.unFollowUser(mockToken, data);
        expect(result).toEqual(mockUnfollowResponseOk)
        expect(mockAxios.delete).toHaveBeenCalled();
        expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    });

    it("should fail when unfollow user", async () => {
        const data = mockUsersFromAndTo; 

        mockAxios.delete
        .mockImplementation(
            () => Promise.reject(mockUnfollowResponseFail)
        );

        try{
            await followServices.unFollowUser(mockToken, data);
        }catch(error){
            expect(error).toEqual(mockUnfollowResponseFail);
            expect(mockAxios.delete).toHaveBeenCalled();
            expect(mockAxios.delete).toHaveBeenCalledTimes(1);
        }
    })
})