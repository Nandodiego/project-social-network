export const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmMyNzkwOC02ZmQ4LTRiYzAtODY2Zi1kYjg3ZjYxODlkMjEiLCJpYXQiOjE2NTQwNDQwNzB9.C2jAWB2pZAN6jsQGvjo6htTp7OinWBwlEvrCNAItbVU";

export const mockUsersFromAndTo = {
    user_from: 'c8886f08-6339-40ca-bead-bddfc388cde9',
    user_to: 'c8886f08-6339-40ca-bead-bddfc388cdea'
};

export const mockResponsePromiseResolve = {
    data: {
        sucess: true,
        data: [],
        code: 201
    }
};

export const mockPromiseResponseFail = {
    data: {
        sucess: false,
        data: [],
        code: 500
    }
};

export const mockUnfollowResponseOk = {
    error: false,
    status: 200,
    data: "unfollow user"
}

export const mockUnfollowResponseFail = {
    error: true,
    status: 500,
    message: "la sintaxis de entrada no es válida para tipo uuid: «0bc14530-aff1-40fa-9811-801b30917625asa»"
}