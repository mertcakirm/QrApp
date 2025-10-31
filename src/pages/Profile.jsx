import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "../components/AdminNavbar.jsx";

const Profile = () => {
    const [logo, setLogo] = useState(null);
    const [businessName, setBusinessName] = useState("Örnek İşletme");
    const [email, setEmail] = useState("ornek@isletme.com");
    const [phone, setPhone] = useState("05321234567");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file)); // önizleme
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            return;
        }

        const updatedData = {
            businessName,
            email,
            phone,
            password: password || undefined,
        };

        console.log("Güncellenen veriler:", updatedData);

    };

    const handleGenerateQR = () => { };

    return (
        <div className="container-fluid p-0 m-0 text-light bg-dark vh-100 overflow-hidden">
            <AdminNavbar />
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-secondary text-light p-4 rounded-4 shadow-lg">
                        <h3 className="text-center mb-4">İşletme Profilim</h3>

                        <div className="text-center mb-4">
                            <img
                                src={logo || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fit=crop&w=400&h=250"}
                                alt="Logo"
                                className="rounded-circle border border-3 mb-3"
                                width="120"
                                height="120"
                            />
                            <div>
                                <label className="btn btn-outline-light btn-sm">
                                    Logo Değiştir
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>

                        <form onSubmit={handleProfileUpdate}>
                            <div className="mb-3">
                                <label className="form-label">İşletme Adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="İşletme adını girin"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">E-posta</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-posta adresinizi girin"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Telefon Numarası</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Telefon numaranızı girin"
                                    required
                                />
                            </div>

                            <hr className="border-light" />

                            <div className="mb-3">
                                <label className="form-label">Yeni Şifre</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Yeni şifrenizi girin"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Yeni Şifre (Tekrar)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Şifreyi tekrar girin"
                                />
                            </div>


                            <div className="d-flex justify-content-between mt-4">
                                <button type="submit" className="btn btn-success px-4">
                                    Bilgileri Güncelle
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGenerateQR}
                                    className="btn btn-warning px-4"
                                >
                                    QR Kod Oluştur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;