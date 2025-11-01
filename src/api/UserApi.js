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

export const DeleteUserRequest = async (id) => {
    return await api.delete(`/users/${id}`);
}

export const UpdateProfilePhotoRequest = async (base64Image) => {
    return await api.put("/users/photo", base64Image, {
        headers: {
            "Content-Type": "text/plain"
        }
    });
};

export const UpdateCompanyRequest = async (companyData) => {
    return await api.put("/users/update/company", companyData);
};

export const ChangePasswordRequest = async (passwordDto) => {
    return await api.put("/users/change-password", passwordDto);
};