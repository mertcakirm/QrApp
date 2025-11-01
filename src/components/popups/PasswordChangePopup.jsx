import React, { useState } from "react";
import {ChangePasswordRequest} from "../../api/UserApi.js";

export default function PasswordChangePopup({ onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
        if (!currentPassword) {
            return;
        }

        if (!newPassword || !confirmPassword) {
            return;
        }

        if (newPassword !== confirmPassword) {
            return;
        }

        const dto={
            oldPassword: currentPassword,
            newPassword: newPassword
        }

        await ChangePasswordRequest(dto);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose(false);
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
            <div className="popup-content bg-dark text-light p-4 rounded-4 shadow-lg" style={{width:'320px'}}>
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
                    <button className="btn btn-success" onClick={handleSubmit}>
                        Kaydet
                    </button>
                    <button className="btn btn-secondary" onClick={() => onClose(false)}>
                        Vazgeç
                    </button>
                </div>
            </div>
        </div>
    );
}