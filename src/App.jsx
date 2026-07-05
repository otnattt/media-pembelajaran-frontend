import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";

import AdminLayout from "./Components/admin/AdminLayout.jsx";
import Dashboard from "./Pages/admin/Dashboard.jsx";
import Video from "./Pages/admin/Video.jsx";
import Kuis from "./Pages/admin/Kuis.jsx";
import Hasil from "./Pages/admin/Hasil.jsx";
import Siswa from "./Pages/admin/Siswa.jsx";
import Pengaturan from "./Pages/admin/Pengaturan.jsx";

// COMPONENT UNTUK PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Jika tidak ada token, redirect ke login
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<Landing />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Admin - DILINDUNGI */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="video" element={<Video />} />
                    <Route path="kuis" element={<Kuis />} />
                    <Route path="hasil" element={<Hasil />} />
                    <Route path="siswa" element={<Siswa />} />
                    <Route path="pengaturan" element={<Pengaturan />} />
                </Route>

                {/* 404 */}
                <Route
                    path="*"
                    element={<div className="p-10">404 — Halaman tidak ditemukan</div>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;