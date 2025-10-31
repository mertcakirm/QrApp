import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import loginImg from "../assets/login.jpg";
import Footer from "../components/Footer.jsx";
import { FaHome } from "react-icons/fa";
import {CheckRoleRequest, LoginRequest} from "../api/AuthApi";
import {setCookie} from "../components/cookie/Cookie.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const loginDto = {
                email: email,
                password: password,
            };

            const data = await LoginRequest(loginDto);

            if (data.data) {
                setCookie("token", data.data, 7);

                const roleResponse = await CheckRoleRequest();
                const role = roleResponse.data;

                if (role === "ADMİN") {
                    window.location.href = "/admin-dashboard";
                } else if (role === "COMPANY") {
                    window.location.href = "/dashboard";
                } else {
                    //window.location.href = "/";
                }
            }
        } catch (err) {
            console.error("Giriş hatası:", err);
            alert("Email veya şifre hatalı!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-0 m-0">
            <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
                <div className="container">
                    <div className="row g-0 shadow-lg rounded-4 overflow-hidden">
                        <div
                            className="col-md-6 overflow-hidden d-none d-md-block"
                            style={{ height: "600px" }}
                        >
                            <img
                                src={loginImg}
                                alt="Login"
                                className="img-fluid h-100 w-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className="col-md-6 bg-dark p-5 d-flex flex-column justify-content-center">
                            <h2 className="fw-bold text-light mb-4 animate__animated animate__fadeInDown">
                                QRApp Giriş
                            </h2>
                            <p className="text-secondary mb-4">
                                Hesabınıza giriş yapın veya yeni bir hesap oluşturun.
                            </p>

                            <div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-light">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-light text-dark border-0"
                                        id="email"
                                        placeholder="ornek@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-light">
                                        Şifre
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-light text-dark border-0"
                                        id="password"
                                        placeholder="******"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-primary w-100 mt-3 animate__animated animate__pulse"
                                    disabled={loading}
                                >
                                    {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                                </button>
                            </div>

                            <p className="text-center text-secondary mt-4">
                                Hesabınız yok mu?{" "}
                                <a href="#footer" className="text-info text-decoration-none">
                                    Kayıt Ol
                                </a>
                            </p>

                            <div className="d-flex justify-content-center align-items-center">
                                <a href="/" className="text-decoration-none">
                                    <FaHome size={30} color="#fff" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}