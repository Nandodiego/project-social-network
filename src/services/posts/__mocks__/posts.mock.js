export const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmMyNzkwOC02ZmQ4LTRiYzAtODY2Zi1kYjg3ZjYxODlkMjEiLCJpYXQiOjE2NTQwNDQwNzB9.C2jAWB2pZAN6jsQGvjo6htTp7OinWBwlEvrCNAItbVU";


export const mockResponsePromiseResolve = {
    data: {
        sucess: true,
        data: [],
        code: 200
    }
};

export const mockResponsePromiseFail = {
    status: 401,
    success: false,
    data: {
        message: "Unauthorized"
    }
};

export const mockIdUser = "0bc14530-aff1-40fa-9811-801b30917625";

export const mockPostId = "79c2c9ff-cdaa-4d49-8d9a-fd1621a7cd2c";

export const mockDataCreatePost = {
    description: 'Acá va la descripción',
    userId: '0bc14530-aff1-40fa-9811-801b30917625',
    file: 'fondo.png'
}