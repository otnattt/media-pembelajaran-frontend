import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Video,
  ClipboardList,
  GraduationCap,
  Users,
  User,
  LogOut,
  Menu,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const namaGuru = user?.nama || "Guru";

  const inisialGuru = namaGuru
    .split(" ")
    .filter((kata) => kata.length > 0)
    .map((kata) => kata[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];

    toast.success("Berhasil logout");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800);
  };

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/video", name: "Manajemen Video", icon: Video },
    { path: "/admin/kuis", name: "Manajemen Kuis", icon: ClipboardList },
    { path: "/admin/hasil", name: "Hasil Penilaian", icon: GraduationCap },
    { path: "/admin/siswa", name: "Data Siswa", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#f6f8fc]">
      {/* SIDEBAR */}
      <aside
        className={`bg-[#0f172a] text-white flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-5 border-b border-white/10">
          <h1 className="text-xl font-bold">Media Pembelajaran</h1>
          <p className="text-xs text-gray-400">SDN Tambahrejo 02</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-600 hover:text-white transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Profil dan Logout */}
        <div className="p-3 border-t border-white/10">
          <Link
            to="/admin/pengaturan"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-600 hover:text-white transition"
          >
            <User className="w-5 h-5" />
            <span>Profil</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">
          {/* Left */}
          <div className="flex items-center gap-4 w-full">
            <Menu
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="relative w-[400px]">
              <input
                type="text"
                placeholder="Cari..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md select-none">
                {inisialGuru}
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {namaGuru}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}