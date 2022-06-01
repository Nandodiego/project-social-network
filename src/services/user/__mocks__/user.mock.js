export const mockDataCreateUser = {
    email: 'diego@gmail.com',
    nick: 'Diego369',
    password: '12345'
};

export const mockEmailRecoveryPass = {
    email: 'diego@gmail.com'
};

export const mockDataLoginUser = {
    email: 'diego@gmail.com',
    password: '12345'
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

export const mockChangePassword = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmMyNzkwOC02ZmQ4LTRiYzAtODY2Zi1kYjg3ZjYxODlkMjEiLCJpYXQiOjE2NTQwNDQwNzB9.C2jAWB2pZAN6jsQGvjo6htTp7OinWBwlEvrCNAItbVU",
    password: '1234'
}; 

export const mockGetUserProfile = {
    id: '0bc14530-aff1-40fa-9811-801b30917625',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmMyNzkwOC02ZmQ4LTRiYzAtODY2Zi1kYjg3ZjYxODlkMjEiLCJpYXQiOjE2NTQwNDQwNzB9.C2jAWB2pZAN6jsQGvjo6htTp7OinWBwlEvrCNAItbVU"
};

export const mockFindUser = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmMyNzkwOC02ZmQ4LTRiYzAtODY2Zi1kYjg3ZjYxODlkMjEiLCJpYXQiOjE2NTQwNDQwNzB9.C2jAWB2pZAN6jsQGvjo6htTp7OinWBwlEvrCNAItbVU",
    nick: 'diego369'
};

export const mockChangeUserImage = {
    id: '0bc14530-aff1-40fa-9811-801b30917625',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmMyNzkwOC02ZmQ4LTRiYzAtODY2Zi1kYjg3ZjYxODlkMjEiLCJpYXQiOjE2NTQwNDQwNzB9.C2jAWB2pZAN6jsQGvjo6htTp7OinWBwlEvrCNAItbVU",
    file: 'image.png'
}