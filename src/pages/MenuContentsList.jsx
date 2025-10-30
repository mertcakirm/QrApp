import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/MenuContents.css";
import {IoIosArrowBack} from "react-icons/io";

export default function MenuContentsList({ menuId }) {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                name: "Omlet",
                description: "Lezzetli kahvaltılık",
                base64Image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250",
                variants: [
                    { id: 1, name: "Küçük", price: 50 },
                    { id: 2, name: "Orta", price: 70 },
                    { id: 3, name: "Büyük", price: 90 },
                ],
            },
            {
                id: 2,
                name: "Pancake",
                description: "Tatlı ve yumuşak pancake, içerik detayları ve diğer bilgiler burada görünecek.",
                base64Image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250",
                variants: [
                    { id: 1, name: "Küçük", price: 40 },
                    { id: 2, name: "Orta", price: 60 },
                ],
            },
        ];

        setTimeout(() => {
            setContents(sampleData);
            setLoading(false);
        }, 1000);
    }, [menuId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 text-light bg-dark">
                <h3>Yükleniyor...</h3>
            </div>
        );
    }

    return (
        <div className="position-relative min-vh-100 text-light py-5">
            <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=1920&h=1080"
                alt="Arkaplan"
                className="menu-bg-img"
            />

            <a
                href="/menus"
                className="btn bg-transparent text-light fs-4 position-absolute top-0 start-0 m-3 shadow d-flex align-items-center justify-content-center"
            >
                <IoIosArrowBack color="white" size={30} />
                <div>
                    Menülere Dön
                </div>
            </a>

            <div className="container position-relative">
                <h2 className="mb-5 mt-3 text-center">Menü İçerikleri</h2>
                <div className="row g-4">
                    {contents.map((content) => (
                        <div key={content.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card content-card shadow-lg overflow-hidden rounded-4 bg-dark bg-opacity-75 text-light">
                                {content.base64Image && (
                                    <img
                                        src={content.base64Image}
                                        alt={content.name}
                                        className="card-img-top"
                                        style={{ height: "150px", objectFit: "cover" }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column" style={{ height: "200px", overflowY: "auto" }}>
                                    <h5 className="card-title">{content.name}</h5>
                                    <p className="card-text">{content.description}</p>
                                    <ul className="list-group list-group-flush mt-auto">
                                        {content.variants.map((v) => (
                                            <li
                                                key={v.id}
                                                className="list-group-item bg-dark bg-opacity-50 text-light d-flex justify-content-between align-items-center p-2"
                                            >
                                                {v.name}
                                                <span>{v.price}₺</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}