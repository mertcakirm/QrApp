import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MenuContents from "./pages/MenuContents.jsx";
import Menus from "./pages/Menus.jsx";
import MenuContentsList from "./pages/MenuContentsList.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import {getCookie} from "./components/cookie/Cookie.js";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const ProtectedRoute = ({ children }) => {
        const token = getCookie("token");
        if (!token) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    const PublicRoute = ({ children }) => {
        const token = getCookie("token");
        if (token) {
            return <Navigate to="/profile" replace />;
        }
        return children;
    };

    return (
        <BrowserRouter>
            <ToastContainer theme="colored" closeOnClick position="bottom-center" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu-content-list/:id" element={<MenuContentsList />}/>
                <Route path="/menus/:name" element={<Menus />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/menu-content/:id"
                    element={
                        <ProtectedRoute>
                            <MenuContents />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;