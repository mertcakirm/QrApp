import api from "./api.js";

export const GetMeRequest = async () => {
    return await api.get("/users/get-me");
}

export const UsersGetAllRequest = async () => {
    return await api.get("/users/all");
}

export const AddUserRequest = async (user) => {
    return await api.post("/users", user)
}