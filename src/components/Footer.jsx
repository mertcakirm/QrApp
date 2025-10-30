import React from 'react';

const Footer = () => {
    return (
        <div>
            {/* CONTACT FOOTER */}
            <footer className="bg-dark text-light py-5" id="footer">
                <div className="container">
                    <div className="row text-center text-md-start">
                        {/* Hakkımızda */}
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInLeft">
                            <h5 className="fw-bold mb-3">QRApp</h5>
                            <p className="text-secondary">
                                Dijital menü ve QR kod yönetimi platformu. Restoranlar ve işletmeler için hızlı ve güvenli çözümler.
                            </p>
                        </div>

                        {/* İletişim */}
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInUp">
                            <h5 className="fw-bold mb-3">İletişim</h5>
                            <p className="text-secondary mb-1">
                                📧 <a  href="mailto:info@qrapp.com" className="text-secondary text-decoration-none">info@qrapp.com</a>
                            </p>
                            <p className="text-secondary mb-1">
                                📞 <a href="tel:+905555555555" className="text-secondary text-decoration-none">+90 555 555 55 55</a>
                            </p>
                            <p className="text-secondary mb-0">
                                📍 İstanbul, Türkiye
                            </p>
                        </div>

                        {/* Sosyal Medya */}
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInRight">
                            <h5 className="fw-bold mb-3">Sosyal Medya</h5>
                            <div className="d-flex justify-content-center justify-content-md-start gap-3">
                                <a href="#" className="text-info fs-4"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="text-info fs-4"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="text-info fs-4"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="text-info fs-4"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <hr className="border-secondary" />

                    <p className="text-center text-secondary mb-0 mt-3">
                        © 2025 QRApp. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;