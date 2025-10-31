import React ,{useState} from 'react';
import AdminNavbar from "../components/AdminNavbar.jsx";

const AdminDashboard = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", business: "Kahve Dünyası" },
        { id: 2, name: "Ayşe Demir", email: "ayse@example.com", business: "Tatlıcı Ayşe" },
        { id: 3, name: "Mert Çelik", email: "mert@example.com", business: "Burger Point" },
    ]);

    const [newUser, setNewUser] = useState({ name: "", email: "", business: "" });
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    // Kullanıcı ekleme
    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email || !newUser.business) {
            setMessage("Lütfen tüm alanları doldurun!");
            return;
        }

        const id = users.length + 1;
        setUsers([...users, { id, ...newUser }]);
        setNewUser({ name: "", email: "", business: "" });
        setShowModal(false);
        setMessage("Yeni kullanıcı başarıyla eklendi ✅");
    };

    const handleDelete = (id) => {
        if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
            setUsers(users.filter((user) => user.id !== id));
            setMessage("Kullanıcı silindi 🗑️");
        }
    };

    return (
        <div className="container-fluid p-0 px-5 m-0 overflow-hidden text-light bg-dark vh-100">
            <AdminNavbar />

            <h2 className="text-center mb-4">Süper Admin Paneli</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Kullanıcı Listesi</h5>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    + Kullanıcı Ekle
                </button>
            </div>

            {message && <div className="alert alert-info">{message}</div>}

            <div className="table-responsive">
                <table className="table table-striped table-dark table-hover align-middle text-center">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ad Soyad</th>
                        <th>E-posta</th>
                        <th>Bağlı İşletme</th>
                        <th>İşlemler</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.business}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDelete(user.id)}>
                                        Sil
                                    </button>
                                    <button className="btn btn-sm btn-outline-light">Düzenle</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                Kayıtlı kullanıcı bulunamadı.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9999 }}
                >
                    <div className="card bg-secondary text-light p-4 rounded-4 shadow-lg" style={{ width: "400px" }}>
                        <h5 className="text-center mb-3">Yeni Kullanıcı Ekle</h5>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-3">
                                <label className="form-label">Ad Soyad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="Ad Soyad girin"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-posta</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="E-posta adresi"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Bağlı İşletme</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newUser.business}
                                    onChange={(e) => setNewUser({ ...newUser, business: e.target.value })}
                                    placeholder="İşletme adı"
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-success px-3">
                                    Kaydet
                                </button>
                                <button type="button" className="btn btn-outline-light px-3" onClick={() => setShowModal(false)}>
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;