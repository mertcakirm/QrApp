import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import CreateMenuPopup from "../components/popups/CreateMenuPopup.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";

export default function Dashboard() {
    const [menus, setMenus] = useState([
        {
            id: 1,
            title: "Kahvaltı Menüsü",
            description: "Güne enerjik başlayın",
            base64Image: "",
        },
    ]);
    const [showModal, setShowModal] = useState(false);

    const handleMenuClick = (menu) => {
        alert(`Menü seçildi: ${menu.title}`);
        window.location.href = "/menu-content";
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

                <div className="row g-4">
                    {menus.map((menu, i) => (
                        <motion.div
                            key={menu.id}
                            className="col-md-4"
                        >
                            <div
                                className="card bg-secondary text-light p-3 rounded-4 shadow"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleMenuClick(menu)}
                            >
                                {menu.base64Image && (
                                    <img
                                        src={menu.base64Image}
                                        alt={menu.title}
                                        className="img-fluid rounded mb-2"
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                )}
                                <h5 className="fw-semibold mb-2">{menu.title}</h5>
                                <p>{menu.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <CreateMenuPopup
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            />
        </div>
    );
}