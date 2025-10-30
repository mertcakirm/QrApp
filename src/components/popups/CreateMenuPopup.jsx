import React, { useState } from "react";

export default function CreateMenuPopup({ show, onClose }) {
    const [menu, setMenu] = useState({
        title: "",
        description: "",
        base64Image: "",
    });

    if (!show) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMenu({ ...menu, base64Image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate = () => {
        if (!menu.title || !menu.description || !menu.base64Image) {
            alert("Lütfen tüm alanları doldurun ve bir resim seçin!");
            return;
        }
        setMenu({ title: "", description: "", base64Image: "" });
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
                        <button className="btn btn-primary" onClick={handleCreate}>
                            Oluştur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}