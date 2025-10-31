import React from 'react';
import {useNavigate} from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();


    const handleProfile = () => {
        navigate("/profile");
    };

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
                <a className="navbar-brand fw-bold" href="/dashboard">
                    QRApp Dashboard
                </a>
                <div className="ms-auto d-flex gap-2">
                    <button className="btn btn-outline-light" onClick={handleProfile}>
                        Profil
                    </button>
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                        Çıkış Yap
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default AdminNavbar;