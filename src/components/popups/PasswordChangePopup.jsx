import React, { useState } from "react";
import { ChangePasswordRequest } from "../../api/UserApi.js";
import { toast } from "react-toastify";

export default function PasswordChangePopup({ onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!currentPassword) {
            toast.warning("Mevcut şifrenizi girin!");
            return;
        }

        if (!newPassword || !confirmPassword) {
            toast.warning("Yeni şifre ve tekrarını girin!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Yeni şifre ve tekrar eşleşmiyor!");
            return;
        }

        const dto = {
            oldPassword: currentPassword,
            newPassword: newPassword
        };

        try {
            setLoading(true);
            await ChangePasswordRequest(dto);
            toast.success("Şifre başarıyla değiştirildi!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onClose(false);
        } catch (err) {
            console.error(err);
            toast.error("Şifre değiştirilemedi!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
            <div className="popup-content bg-dark text-light p-4 rounded-4 shadow-lg" style={{ width: '320px' }}>
                <h4 className="mb-3">Şifre Değiştir</h4>

                <div className="mb-3">
                    <label className="form-label">Mevcut Şifre</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Mevcut şifrenizi girin"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Yeni Şifre</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        placeholder="Yeni şifreyi tekrar girin"
                    />
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                    <button className="btn btn-secondary" onClick={() => onClose(false)}>
                        Vazgeç
                    </button>
                </div>
            </div>
        </div>
    );
}