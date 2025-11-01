import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import './css/Home.css';
import header from "../assets/home_header.jpg";
import Footer from "../components/Footer.jsx";

export default function Home() {
    const [users, setUsers] = useState(0);
    const [menus, setMenus] = useState(0);
    const [qrGenerated, setQrGenerated] = useState(0);

    useEffect(() => {
        let userInterval = setInterval(() => {
            setUsers((prev) => (prev < 1500 ? prev + 50 : prev));
        }, 20);

        let menuInterval = setInterval(() => {
            setMenus((prev) => (prev < 1550 ? prev + 10 : prev));
        }, 30);

        let qrInterval = setInterval(() => {
            setQrGenerated((prev) => (prev < 12000 ? prev + 100 : prev));
        }, 10);

        return () => {
            clearInterval(userInterval);
            clearInterval(menuInterval);
            clearInterval(qrInterval);
        };
    }, []);


    return (
        <div style={{ backgroundColor: "#0d1117", color: "#fff",overflow: "hidden" }}>
            {/* HERO SECTION */}
            <section className="position-relative text-center" data-aos="fade-up">
                <img
                    src={header}
                    alt="QRApp Hero"
                    className="w-100"
                    style={{ height: "700px", objectFit: "cover" }}
                />

                <div
                    className="position-absolute top-50 start-50 translate-middle text-light"
                    style={{ zIndex: 2 }}
                >
                    <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">
                        QRApp'e Hoş Geldiniz
                    </h1>
                    <p className="lead mt-3 animate__animated animate__fadeInUp">
                        Menülerinizi dijitale taşıyın, müşterilerinizle hızlıca paylaşın!
                    </p>
                    <a href="/login" className="btn text-decoration-none btn-primary btn-lg mt-4 animate__animated animate__pulse animate__infinite">
                        Hemen Başla
                    </a>
                </div>

                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1 }}
                ></div>
            </section>

            {/* Hakkında */}
            <section className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6 animate__animated animate__fadeInLeft">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                            alt="QRApp"
                            className="img-fluid rounded-4 shadow-lg"
                        />
                    </div>
                    <div className="col-md-6 text-light animate__animated animate__fadeInRight">
                        <h2 className="fw-bold mb-3">QRApp Nedir?</h2>
                        <p className="text-secondary">
                            QRApp, restoran ve işletmelerin menülerini hızlı, kolay ve modern bir şekilde müşterilerine sunmasını sağlar.
                            Kâğıt masrafı olmadan menülerinizi QR kodla dijital ortama taşıyın.
                        </p>
                        <a href="#footer" className="btn text-decoration-none btn-outline-light mt-3">Daha Fazla Bilgi</a>
                    </div>
                </div>
            </section>

            {/* Özellikler */}
            <section className="py-5 bg-dark text-center" data-aos="fade-up">
                <div className="container">
                    <h2 className="fw-bold mb-5 animate__animated animate__fadeInDown">Özellikler</h2>
                    <div className="row g-4">
                        <div className="col-md-4  animate__animated animate__zoomIn">
                            <div className="card feature-card bg-secondary text-light h-100 p-4 rounded-4 shadow">
                                <h4>🚀 Hızlı & Güvenli</h4>
                                <p>Menüleriniz saniyeler içinde görüntülenir. Hızlı, kolay ve güvenli.</p>
                            </div>
                        </div>
                        <div className="col-md-4  animate__animated animate__zoomIn animate__delay-1s">
                            <div className="card feature-card bg-secondary text-light h-100 p-4 rounded-4 shadow">
                                <h4>📱 Mobil Uyumlu</h4>
                                <p>Tüm cihazlarda mükemmel görünün. QRApp tamamen responsive.</p>
                            </div>
                        </div>
                        <div className="col-md-4  animate__animated animate__zoomIn animate__delay-2s">
                            <div className="card feature-card bg-secondary text-light h-100 p-4 rounded-4 shadow">
                                <h4>🧾 Kolay Yönetim</h4>
                                <p>Menülerinizi panelden kolayca güncelleyin. Kodlama bilgisi gerekmez.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* İstatistikler */}
            <section className="py-5 text-center" data-aos="fade-up">
                <div className="container">
                    <h2 className="fw-bold mb-5 animate__animated animate__fadeInUp">QRApp İstatistikleri</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <h1 className="display-4 fw-bold text-primary">{users}+</h1>
                            <p>Kayıtlı Kullanıcı</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h1 className="display-4 fw-bold text-success">{menus}+</h1>
                            <p>Yayınlanan Menü</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h1 className="display-4 fw-bold text-warning">{qrGenerated}+</h1>
                            <p>Oluşturulan QR Kodu</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}