import React, { useState } from 'react';
import { AddUserRequest } from "../../api/UserApi.js";
import {base64Convert} from "../../helpers/base64Convert.js";

const CreateUserPopup = ({ onClose, onUserAdded }) => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        companyAddress: "",
        companyBase64Image: ""
    });

    const [loading, setLoading] = useState(false);

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await base64Convert(file);
                setNewUser({ ...newUser, companyBase64Image: base64 });
            } catch (err) {
                console.error("Logo dönüştürülürken hata:", err);
            }
        }
    };

    const handleAddUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.password || !newUser.companyName) {
            return;
        }

        const payload = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            company: {
                name: newUser.companyName.replace(/\s+/g, "-"),
                email: newUser.companyEmail || newUser.email,
                phone: newUser.companyPhone,
                address: newUser.companyAddress,
                base64Image: newUser.companyBase64Image
            }
        };

        try {
            setLoading(true);
            await AddUserRequest(payload);
            setNewUser({
                name: "",
                email: "",
                password: "",
                companyName: "",
                companyEmail: "",
                companyPhone: "",
                companyAddress: "",
                companyBase64Image: ""
            });
            onUserAdded?.();
            onClose(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
            style={{ zIndex: 9999 }}
        >
            <div className="card bg-secondary text-light p-4 rounded-4 shadow-lg" style={{ width: "450px" }}>
                <h5 className="text-center mb-3">Yeni Kullanıcı Ekle</h5>


                <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="form-control mb-2"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="E-posta"
                    className="form-control mb-2"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    className="form-control mb-2"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="İşletme Adı"
                    className="form-control mb-2"
                    value={newUser.companyName}
                    onChange={(e) => setNewUser({ ...newUser, companyName: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="İşletme E-posta"
                    className="form-control mb-2"
                    value={newUser.companyEmail}
                    onChange={(e) => setNewUser({ ...newUser, companyEmail: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="İşletme Telefon"
                    className="form-control mb-2"
                    value={newUser.companyPhone}
                    onChange={(e) => setNewUser({ ...newUser, companyPhone: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="İşletme Adres"
                    className="form-control mb-2"
                    value={newUser.companyAddress}
                    onChange={(e) => setNewUser({ ...newUser, companyAddress: e.target.value })}
                />

                <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-2"
                    onChange={handleLogoChange}
                />

                {newUser.companyBase64Image && (
                    <img
                        src={newUser.companyBase64Image}
                        alt="Logo önizleme"
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: "80px" }}
                    />
                )}

                <div className="d-flex justify-content-between mt-2">
                    <button onClick={handleAddUser} className="btn btn-success px-3" disabled={loading}>
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                    <button type="button" className="btn btn-outline-light px-3" onClick={() => onClose(false)}>
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserPopup;