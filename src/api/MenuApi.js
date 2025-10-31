import api from "./api.js";

export const GetCompanyMenusRequest = async () => {
    return await api.get("menu/get-all");
};

export const GetCompanyMenusByNameRequest = async () => {
    return await api.get("menu/get-all-by-name/test", {
        headers: {
            NoAuth: true,
        },
    });
};

export const CreateNewMenuRequest = async (menu) => {
    return await api.post("menu/create-menu", menu)
}

export const CreateNewMenuItemRequest = async (menuItem) => {
    return await api.post("menu/add-menu-item", menuItem)
}

export const GetMenuItemsRequest = async (id) => {
    return await api.get(`menu/get-by-menuId/${id}`, {
        headers: {
            NoAuth: true,
        },
    });
}

export const DeleteMenuRequest = async (menuId) => {
    return await api.delete(`menu/delete/${menuId}`);
}

export const DeleteMenuItemRequest = async (menuItemId) => {
    return await api.delete(`menu/delete-item/${menuItemId}`);
}
