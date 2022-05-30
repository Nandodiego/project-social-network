import { followServices } from "../follow.services";
import mockAxios from "axios";

jest.mock("axios", () => ({
    post: jest.fn(),
    delete: jest.fn()
}));


describe("Follow services tests", () => {
    it.skip("should follow user", async () => {
        const data = {
            user_from: 'c8886f08-6339-40ca-bead-bddfc388cde9',
            user_to: 'c8886f08-6339-40ca-bead-bddfc388cdea'
        }

        const response_post_mock = {
            data: {
                sucess: true,
                data: [],
                code: 201
            }
        }

        mockAxios.post.mockImplementation(() => Promise.resolve({ 
            data: {
                sucess: true,
                data: [],
                code: 201
            } 
        }));
        
        const result = await followServices.followUser('asdlsad', data);

        expect(result).toEqual(response_post_mock)
        expect(mockAxios.post).toHaveBeenCalled();
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it("should fail when user wants to follow other user", async () => {
        const data = {
            user_from: 'c8886f08-6339-40ca-bead-bddfc388cde9',
            user_to: 'c8886f08-6339-40ca-bead-bddfc388cdea'
        }

        const error_response_post_mock = {
            data: {
                sucess: false,
                data: [],
                code: 500
            }
        }

        mockAxios.post.mockImplementation(() => Promise.reject({ 
            data: {
                sucess: false,
                data: [],
                code: 500
            } 
        }));
        
        try{
            await followServices.followUser('asdlsad', data);
        }catch(error){
            expect(error).toEqual(error_response_post_mock)
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        }
    });

    it.skip("do something 2", async () => {
        const data = {
            from: 'c8886f08-6339-40ca-bead-bddfc388cde9'
        }

        mockAxios.delete
        .mockImplementation(
            () => Promise.resolve({ data: { algo: 'assk' } })
        );

        const result = await followServices.unFollowUser('sadsad', data);
        console.log(result);
        expect(mockAxios.delete).toHaveBeenCalled();

    });
})