import React, { useEffect, useState } from 'react';
import AdminNavbar from "../components/AdminNavbar.jsx";
import {DeleteUserRequest, UsersGetAllRequest} from "../api/UserApi.js";
import CreateUserPopup from "../components/popups/CreateUserPopup.jsx"; // 👈 API fonksiyonunu import et

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await UsersGetAllRequest();
            if (res.data && Array.isArray(res.data)) {
                const mappedUsers = res.data.map(u => ({
                    id: u.id,
                    name: u.email,
                    email: u.email,
                    business: u.company?.name || "-"
                }));
                setUsers(mappedUsers);
            }
        } catch (err) {
            console.error("Kullanıcılar alınamadı:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await DeleteUserRequest(id);
        setRefresh(!refresh);
    };

    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    return (
        <div className="container-fluid p-0 px-5 m-0 overflow-hidden text-light bg-dark vh-100">
            <AdminNavbar />

            <h2 className="text-center my-4">Süper Admin Paneli</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Kullanıcı Listesi</h5>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    + Kullanıcı Ekle
                </button>
            </div>


            {loading ? (
                <p className="text-center text-secondary">Kullanıcılar yükleniyor...</p>
            ) : (
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
            )}

            {showModal && (
                <CreateUserPopup onClose={() => {
                    setShowModal(false);
                    setRefresh(!refresh);
                }} />
            )}
        </div>
    );
};

export default AdminDashboard;