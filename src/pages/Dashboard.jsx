import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import CreateMenuPopup from "../components/popups/CreateMenuPopup.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";
import {DeleteMenuRequest, GetCompanyMenusRequest} from "../api/MenuApi.js"; // 👈 API fonksiyonunu import et

export default function Dashboard() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [refreh, setRefreh] = useState(false);


    const fetchMenus = async () => {
        try {
            const response = await GetCompanyMenusRequest();
            if (response.data && Array.isArray(response.data)) {
                setMenus(response.data);
            } else {
                console.warn("Beklenmeyen API yanıtı:", response.data);
            }
        } catch (error) {
            console.error("Menüler yüklenirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMenus();
    }, [refreh]);

    const handleMenuClick = (menu) => {
        console.log("Seçilen Menü:", menu);
        window.location.href = `/menu-content/${menu.id}`;
    };

    const handleDelete = async (id) => {
        await DeleteMenuRequest(id);
        setRefreh(!refreh);
    };

    return (
        <div className="min-vh-100 bg-dark text-light">
            <AdminNavbar />

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Menüleriniz</h2>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Yeni Menü Oluştur
                    </button>
                </div>

                {loading ? (
                    <p className="text-secondary text-center">Menüler yükleniyor...</p>
                ) : menus.length === 0 ? (
                    <p className="text-secondary text-center">Henüz menü oluşturulmamış.</p>
                ) : (
                    <div className="row g-4">
                        {menus.map((menu) => (
                            <motion.div
                                key={menu.id}
                                className="col-md-3"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className="card bg-secondary text-light rounded-4 overflow-hidden shadow position-relative"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleMenuClick(menu)}
                                >
                                    <button
                                        className="btn btn-sm btn-danger position-absolute"
                                        style={{ top: "10px", right: "10px", zIndex: 10 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(menu.id);
                                        }}
                                    >
                                        Sil
                                    </button>

                                    {menu.base64Image && (
                                        <img
                                            src={menu.base64Image}
                                            alt={menu.title}
                                            className="img-fluid rounded mb-2"
                                            style={{ height: "150px", objectFit: "cover" }}
                                        />
                                    )}
                                    <h5 className="fw-semibold text-center mb-2">{menu.title}</h5>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <CreateMenuPopup show={showModal} onClose={() => {
                setShowModal(false);
                setRefreh(!refreh);
            }} />
        </div>
    );
}