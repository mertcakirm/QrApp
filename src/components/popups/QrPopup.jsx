import React, { useState } from "react";
import { CreateQrCodeRequest } from "../../api/QrApi.js";

const QrPopup = ({ onClose , companyName}) => {
    const [loading, setLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [qrBlob, setQrBlob] = useState(null);

    const handleGenerateQr = async () => {
        const encodedName = encodeURIComponent(companyName.replace(/ /g, "-"));
        try {
            setLoading(true);
            const res = await CreateQrCodeRequest(`http://localhost:5173/menus/${encodedName}`);
            const blob = new Blob([res.data], { type: "image/png" });
            const url = URL.createObjectURL(blob);
            setQrCodeUrl(url);
            setQrBlob(blob);
        } catch (err) {
            console.error("QR oluşturulamadı:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!qrBlob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(qrBlob);
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className="modal show d-block bg-dark bg-opacity-75 position-fixed w-100 h-100"
            style={{ backdropFilter: "blur(4px)" }}
        >
            <div className="modal-dialog d-flex justify-content-center align-items-center w-100 h-75">
                <div className="modal-content bg-dark text-light rounded-4 p-4">
                    <h5 className="modal-title mb-3">QR Code Oluştur</h5>



                    {qrCodeUrl ? (
                        <div className="text-center d-flex flex-column align-items-center mb-3">
                            <img
                                src={qrCodeUrl}
                                alt="QR Code"
                                className="img-fluid"
                                style={{ maxWidth: "200px" }}
                            />
                            <button
                                className="btn btn-success mt-3"
                                onClick={handleDownload}
                            >
                                İndir
                            </button>
                        </div>
                    ):(
                        <button
                            className="btn btn-primary mb-3"
                            onClick={handleGenerateQr}
                            disabled={loading}
                        >
                            {loading ? "Oluşturuluyor..." : "QR Code Oluştur"}
                        </button>
                    )}

                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-secondary" onClick={()=> onClose(false)}>
                            Kapat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrPopup;