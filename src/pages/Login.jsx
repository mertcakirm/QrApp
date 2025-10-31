import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import loginImg from '../assets/login.jpg'
import Footer from "../components/Footer.jsx";
import {FaHome} from "react-icons/fa";

export default function Login() {
    return (
        <div className="container-fluid p-0 m-0">
        <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="container">
                <div className="row g-0 shadow-lg rounded-4 overflow-hidden">
                    {/* Görsel */}
                    <div className="col-md-6 overflow-hidden d-none d-md-block"  style={{height:'600px'}}>
                        <img
                            src={loginImg}
                            alt="Login"
                            className="img-fluid h-100 w-100"
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                    {/* Form */}
                    <div className="col-md-6 bg-dark p-5 d-flex flex-column justify-content-center">
                        <h2 className="fw-bold text-light mb-4 animate__animated animate__fadeInDown">
                            QRApp Giriş
                        </h2>
                        <p className="text-secondary mb-4">
                            Hesabınıza giriş yapın veya yeni bir hesap oluşturun.
                        </p>

                        <form>
                            <div className="mb-3 ">
                                <label htmlFor="email" className="form-label text-light">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control bg-light text-dark border-0"
                                    id="email"
                                    placeholder="ornek@gmail.com"
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
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-3 animate__animated animate__pulse "
                            >
                                Giriş Yap
                            </button>
                        </form>

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