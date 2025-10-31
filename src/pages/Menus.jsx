import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Menus.css";
import {useParams} from "react-router-dom";

export default function Menus() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();

    const decodedName = decodeURIComponent(name.replace(/-/g, " "));

    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                companyName: "Kahvaltı Dünyası",
                base64Image:
                    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250",
                menuCount: 5,
                productCount: 24,
            },
            {
                id: 2,
                companyName: "Coffee & Co",
                base64Image:
                    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250",
                menuCount: 3,
                productCount: 12,
            },
            {
                id: 3,
                companyName: "Tatlıcılar",
                base64Image:
                    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250",
                menuCount: 4,
                productCount: 18,
            },
            {
                id: 4,
                companyName: "Burger King",
                base64Image:
                    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250",
                menuCount: 6,
                productCount: 32,
            },
        ];

        setTimeout(() => {
            setMenus(sampleData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center">
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
                    {menus.map((menu) => (
                        <div key={menu.id} className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="border shadow-sm rounded-3 overflow-hidden">
                            <a
                                href="/menu-content-list"
                                className="modern-card  overflow-hidden rounded-4 position-relative text-decoration-none text-light "
                            >
                                <img
                                    src={menu.base64Image}
                                    alt={menu.companyName}
                                    className="card-img-top"
                                />
                                <div className="card-body text-center py-4">
                                    <h5 className="card-title mb-1">{menu.companyName}</h5>
                                </div>
                            </a>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}