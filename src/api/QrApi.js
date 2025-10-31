import api from "./api.js";

export const CreateQrCodeRequest = async (url) => {
    return await api.get(`Qr/generate?url=${url}`, {
        headers: {
            Accept: "image/png"
        },
        responseType: "blob"
    });
};