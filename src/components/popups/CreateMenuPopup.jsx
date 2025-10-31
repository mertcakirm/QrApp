import React, { useState } from "react";
import { CreateNewMenuRequest } from "../../api/menuApi.js";
import {base64Convert} from "../../helpers/base64Convert.js";

export default function CreateMenuPopup({ show, onClose }) {
    const [menu, setMenu] = useState({
        title: "",
        description: "",
        base64Image: "",
    });
    const [loading, setLoading] = useState(false);

    if (!show) return null;

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await base64Convert(file);
            setMenu({ ...menu, base64Image: base64 });
        }
    };

    const handleCreate = async () => {
        if (!menu.title || !menu.description || !menu.base64Image) {
            return;
        }

        try {
            setLoading(true);
            await CreateNewMenuRequest(menu);
            setMenu({ title: "", description: "", base64Image: "" });
            onClose();
        } catch (error) {
            console.error("Menü oluşturulamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="modal show d-block bg-dark bg-opacity-75 position-fixed w-100 h-100"
            tabIndex="-1"
            style={{ backdropFilter: "blur(4px)" }}
        >
            <div className="modal-dialog d-flex justify-content-center align-items-center w-100 h-75">
                <div className="modal-content bg-dark text-light rounded-4 p-4">
                    <h5 className="modal-title mb-3">Yeni Menü Oluştur</h5>

                    <input
                        type="text"
                        className="form-control mb-3 text-light border-0"
                        placeholder="Menü Adı"
                        value={menu.title}
                        onChange={(e) => setMenu({ ...menu, title: e.target.value })}
                    />

                    <textarea
                        className="form-control mb-3 text-light border-0"
                        placeholder="Menü Açıklaması"
                        value={menu.description}
                        onChange={(e) => setMenu({ ...menu, description: e.target.value })}
                    />

                    <input
                        type="file"
                        className="form-control mb-3"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={onClose}>
                            İptal
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleCreate}
                            disabled={loading}
                        >
                            {loading ? "Oluşturuluyor..." : "Oluştur"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}