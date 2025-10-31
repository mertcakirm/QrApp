import api from "./api.js";

export const LoginRequest = async (loginDto) => {
    return await api.post("auth/login", loginDto);
}

export const CheckRoleRequest = async () => {
    return await api.get("auth/checkRole");

}