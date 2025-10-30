import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateMenuContentPopup from "../components/popups/CreateMenuContentPopup.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";

export default function MenuContents({ menuId }) {
    const [contents, setContents] = useState([
        {
            name: "Omlet",
            description: "Lezzetli kahvaltılık",
            base64Image: "",
            variants: [{ name: "M", price: 50 },{name: "L", price: 100 },],
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    const handleDeleteContent = (index) => {
        if (window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
            const newContents = contents.filter((_, i) => i !== index);
            setContents(newContents);
        }
    };

    return (
        <div className="min-vh-100 bg-dark text-light">
            <AdminNavbar />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-light">Menü İçerikleri</h2>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Yeni İçerik Ekle
                    </button>
                </div>

                <div className="row g-4">
                    {contents.map((c, i) => (
                        <div key={i} className="col-md-4">
                            <div className="card bg-secondary text-light p-3 rounded-4 shadow position-relative">
                                {c.base64Image && (
                                    <img
                                        src={c.base64Image}
                                        alt={c.name}
                                        className="img-fluid rounded mb-2"
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                )}
                                <h5 className="fw-semibold mb-2">{c.name}</h5>
                                <p>{c.description}</p>
                                {c.variants.length > 0 && (
                                    <ul className="list-group list-group-flush">
                                        {c.variants.map((v, idx) => (
                                            <li
                                                key={idx}
                                                className="list-group-item bg-secondary text-light p-1"
                                            >
                                                {v.name} - {v.price}₺
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {/* Silme Butonu */}
                                <div className="d-flex justify-content-end w-100 position-absolute" style={{right:'20px'}}>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteContent(i)}
                                    >
                                        Sil
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CreateMenuContentPopup
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}