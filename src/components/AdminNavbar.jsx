import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "./cookie/Cookie.js";
import {CheckRoleRequest} from "../api/AuthApi.js";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    const fetchRole = async () => {
        const userRole = await CheckRoleRequest();
        setRole(userRole.data);
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    const handleAdminDashboard = () => {
        navigate("/admin-dashboard");
    };

    const handleLogout = async () => {
        await deleteCookie("token");
        navigate("/login");
    };

    useEffect(() => {
        fetchRole();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
                <a className="navbar-brand fw-bold" href="/dashboard">
                    QRApp Dashboard
                </a>
                <div className="ms-auto d-flex gap-2">
                    {role === "ADMİN" && (
                        <button className="btn btn-outline-light" onClick={handleAdminDashboard}>
                            Yönetim
                        </button>
                    )}

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