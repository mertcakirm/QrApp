import React, { useState } from "react";

export default function MenuContentModal({ show, onClose }) {
    const [menuContent, setMenuContent] = useState({
        name: "",
        description: "",
        base64Image: "",
        variants: [],
    });

    const [variant, setVariant] = useState({ name: "", price: "" });

    if (!show) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMenuContent({ ...menuContent, base64Image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const addVariant = () => {
        if (!variant.name || !variant.price) return;
        setMenuContent({
            ...menuContent,
            variants: [
                ...menuContent.variants,
                { name: variant.name, price: Number(variant.price) },
            ],
        });
        setVariant({ name: "", price: "" });
    };

    const removeVariant = (index) => {
        const newVariants = menuContent.variants.filter((_, i) => i !== index);
        setMenuContent({ ...menuContent, variants: newVariants });
    };

    const handleSubmit = () => {
        if (!menuContent.name || !menuContent.description || !menuContent.base64Image) {
            return;
        }
        setMenuContent({ name: "", description: "", base64Image: "", variants: [] });
    };

    return (
        <div
            className="modal show d-block bg-dark bg-opacity-75  position-fixed w-100 h-100"
            style={{ backdropFilter: "blur(4px)" }}
        >
            <div className="modal-dialog  d-flex justify-content-center align-items-center w-100 h-75">
                <div className="modal-content bg-dark text-light rounded-4 p-4">
                    <h5 className="modal-title mb-3">Yeni İçerik Ekle</h5>

                    <input
                        type="text"
                        className="form-control mb-3 text-light border-0"
                        placeholder="İçerik Adı"
                        value={menuContent.name}
                        onChange={(e) =>
                            setMenuContent({ ...menuContent, name: e.target.value })
                        }
                    />

                    <textarea
                        className="form-control mb-3 text-light border-0"
                        placeholder="Açıklama"
                        value={menuContent.description}
                        onChange={(e) =>
                            setMenuContent({ ...menuContent, description: e.target.value })
                        }
                    />

                    <input
                        type="file"
                        className="form-control mb-3"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {/* Variant Ekleme */}
                    <div className="mb-3">
                        <h6>Variantlar</h6>
                        <div className="d-flex gap-2 mb-2">
                            <select
                                className="form-select border-0"
                                value={variant.name}
                                onChange={(e) => setVariant({ ...variant, name: e.target.value })}
                            >
                                <option value="">Boy Seç</option>
                                <option value="S">Küçük</option>
                                <option value="M">Orta</option>
                                <option value="L">Büyük</option>

                            </select>

                            <input
                                type="number"
                                className="form-control border-0"
                                placeholder="Fiyat"
                                value={variant.price}
                                onChange={(e) =>
                                    setVariant({ ...variant, price: e.target.value })
                                }
                            />

                            <button className="btn btn-success" onClick={addVariant}>
                                Ekle
                            </button>
                        </div>

                        {menuContent.variants.length > 0 && (
                            <ul className="list-group">
                                {menuContent.variants.map((v, i) => (
                                    <li
                                        key={i}
                                        className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-light"
                                    >
                                        {v.name} - {v.price}₺
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeVariant(i)}
                                        >
                                            Sil
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={onClose}>
                            İptal
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}