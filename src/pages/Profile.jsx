import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "../components/AdminNavbar.jsx";
import QrPopup from "../components/popups/QrPopup.jsx";
import { GetMeRequest, UpdateProfilePhotoRequest, UpdateCompanyRequest } from "../api/UserApi.js";
import PasswordChangePopup from "../components/popups/PasswordChangePopup.jsx";
import { base64Convert } from "../helpers/base64Convert.js";
import {toast} from "react-toastify";

const Profile = () => {
    const [logo, setLogo] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await GetMeRequest();
            const data = res.data;

            setBusinessName(data.company?.name || "");
            setEmail(data.company?.email || "");
            setPhone(data.company?.phone || "");
            setLogo(data.company?.base64Image || null);
            setAddress(data.company?.address || "");
        } catch (err) {
            console.error("Profil verisi alınamadı:", err);
        }
    };

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLogo(URL.createObjectURL(file));
            const base64String = await base64Convert(file);
            await UpdateProfilePhotoRequest(base64String);
            toast.success("Logo başarıyla değiştirildi!");
            setRefresh(!refresh);
        } catch (err) {
            console.error("Logo güncellenirken hata:", err);
            toast.error("Logo değiştirilirken bir hata oluştu!");

        }
    };

    const handleProfileUpdate = async () => {
        const updatedData = {
            name: businessName,
            email,
            phone,
            address,
        };

        try {
            await UpdateCompanyRequest(updatedData);
            toast.success("Bilgiler başarıyla değiştirildi!");
            setRefresh(!refresh);
        } catch (err) {
            console.error("Profil güncellenemedi:", err);
            toast.error("Bilgiler değiştirilirken bir hata oluştu!");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [refresh]);

    return (
        <div className="container-fluid p-0 m-0 text-light bg-dark vh-100 overflow-hidden">
            <AdminNavbar />
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-secondary p-4 rounded-4 shadow-lg">
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

                        <div>
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

                            <div className="mb-3">
                                <label className="form-label">Adres</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Adresinizi girin"
                                    required
                                />
                            </div>

                            <hr className="border-light" />

                            <div className="d-flex justify-content-between mt-4">
                                <button onClick={handleProfileUpdate} className="btn btn-success px-4">
                                    Bilgileri Güncelle
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordPopup(true)}
                                    className="btn btn-dark px-4"
                                >
                                    Şifre Değiştir
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(true)}
                                    className="btn btn-warning px-4"
                                >
                                    QR Kod Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showPasswordPopup && (
                <PasswordChangePopup onClose={(b) => {
                    if (b === false) setShowPasswordPopup(false);
                }} />
            )}
            {showPopup && (
                <QrPopup onClose={(b) => {
                    if (b === false) setShowPopup(false);
                }} companyName={businessName} />
            )}
        </div>
    );
};

export default Profile;