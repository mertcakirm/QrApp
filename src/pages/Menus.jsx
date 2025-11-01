import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Menus.css";
import { useParams } from "react-router-dom";
import { GetMenusByCompanyName } from "../api/MenuApi.js";

export default function Menus() {
    const [menus, setMenus] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();

    const decodedName = decodeURIComponent(name.replace(/-/g, " "));

    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true);
            try {
                const response = await GetMenusByCompanyName(decodedName);

                setMenus(response.data.items || []);
                setCompanyInfo({
                    name: response.data.companyName,
                    phone: response.data.companyPhone,
                    email: response.data.companyEmail,
                    address: response.data.companyAddress
                });

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
        <div className="min-vh-100 bg-dark overflow-hidden text-light py-5">
            <div className="container">
                <h2 className="mb-5 text-center">{decodedName}</h2>

                <div className="row w-100 g-4 mb-5">
                    {menus.length > 0 ? (
                        menus.map((menu) => (
                            <div key={menu.id} className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
                                <div className="border shadow-sm rounded-3 overflow-hidden" data-aos="fade-up">
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

                {companyInfo && (
                    <div className="d-flex flex-column gap-2 bg-secondary bg-opacity-25 p-4 mt-5 rounded-4 text-light text-center" data-aos="fade-up">
                        <h4 className="mb-3">İletişim Bilgileri</h4>
                        <p>
                            📞 <a href={`tel:${companyInfo.phone}`} className="text-light text-decoration-none">{companyInfo.phone}</a>
                        </p>
                        <p>
                            ✉️ <a href={`mailto:${companyInfo.email}`} className="text-light text-decoration-none">{companyInfo.email}</a>
                        </p>
                        <p>
                            📍 <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light text-decoration-none"
                        >
                            {companyInfo.address}
                        </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}