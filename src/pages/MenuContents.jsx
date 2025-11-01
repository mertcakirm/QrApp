import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateMenuContentPopup from "../components/popups/CreateMenuContentPopup.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";
import { useParams } from "react-router-dom";
import {DeleteMenuItemRequest, GetMenuItemsRequest} from "../api/MenuApi.js";

export default function MenuContents() {
    const [contents, setContents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [title, setTitle] = useState("");
    const { id } = useParams();

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const res = await GetMenuItemsRequest(id);
            setTitle(res.data.name);
            setContents(res.data.items);
        } catch (error) {
            console.error("Menü içerikleri alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMenuItems();
        }
    }, [id,refresh]);

    const handleDeleteContent = async (id) => {
        await DeleteMenuItemRequest(id);
        setRefresh(!refresh);
    };

    return (
        <div className="min-vh-100 bg-dark text-light">
            <AdminNavbar />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-light">{title} Menü İçerikleri</h2>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Yeni İçerik Ekle
                    </button>
                </div>

                {loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-light" role="status"></div>
                        <p className="mt-3">Menü içerikleri yükleniyor...</p>
                    </div>
                ) : contents.length === 0 ? (
                    <p className="text-center text-muted">Henüz menü içeriği bulunmuyor.</p>
                ) : (
                    <div className="row g-4">
                        {contents.map((c) => (
                            <div key={c.id} className="col-md-4">
                                <div className="card bg-secondary text-center text-light overflow-hidden rounded-4 shadow position-relative">
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

                                    {c.variants && c.variants.length > 0 && (
                                        <ul className="list-group list-group-flush">
                                            {c.variants.map((v) => (
                                                <li
                                                    key={v.id}
                                                    className="list-group-item bg-secondary text-light p-1"
                                                >
                                                    {v.name} - {v.price}₺
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div
                                        className="d-flex justify-content-end w-100 position-absolute"
                                        style={{ right: "20px",top:'20px' }}
                                    >
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteContent(c.id)}
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CreateMenuContentPopup
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setRefresh(!refresh);
                }}
            />
        </div>
    );
}