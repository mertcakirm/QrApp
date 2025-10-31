import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Menus.css";
import { useParams } from "react-router-dom";
import { GetMenusByCompanyName } from "../api/MenuApi.js";

export default function Menus() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();

    const decodedName = decodeURIComponent(name.replace(/-/g, " "));

    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true);
            try {
                const response = await GetMenusByCompanyName(decodedName);
                setMenus(response.data);
            } catch (err) {
                console.error("Menüler çekilirken hata:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, [decodedName]);

    if (loading) {
        return (
            <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-dark text-light py-5">
            <div className="container">
                <h2 className="mb-5 text-center">{decodedName}</h2>
                <div className="row g-4">
                    {menus.length > 0 ? (
                        menus.map((menu) => (
                            <div key={menu.id} className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
                                <div className="border shadow-sm rounded-3 overflow-hidden">
                                    <a
                                        href={`/menu-content-list/${menu.id}`}
                                        className="modern-card overflow-hidden rounded-4 position-relative text-decoration-none text-light"
                                    >
                                        <img
                                            src={menu.base64Image}
                                            alt={menu.title}
                                            className="card-img-top"
                                        />
                                        <div className="card-body text-center py-4">
                                            <h5 className="card-title mb-1">{menu.title}</h5>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-light py-5">
                            Bu şirkete ait menü bulunamadı.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}