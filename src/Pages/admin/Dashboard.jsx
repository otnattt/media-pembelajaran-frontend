import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";

import StatCard from "../../Components/admin/StatCard.jsx";
import PageHeader from "../../Components/admin/PageHeader.jsx";

import {
  Video,
  ClipboardList,
  Users,
  GraduationCap,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_video: 0,
    video_aktif: 0,
    total_kuis: 0,
    total_siswa: 0,
    total_hasil: 0,
  });

    const user = JSON.parse(localStorage.getItem("user"));

  const namaGuru = user?.nama || "Guru";

  useEffect(() => {
    fetchStatistik();
  }, []);

 const fetchStatistik = async () => {
  try {
    const response = await axiosInstance.get(
      "/dashboard/statistik"
    );

    setStats(response.data);
  } catch (error) {
    console.error("Gagal mengambil statistik:", error);
  }
};

  return (
    <div>
      <PageHeader
  title="Dashboard"
  description={`Selamat datang kembali, ${namaGuru}. Berikut ringkasan aktivitas hari ini.`}
/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Total Video"
          value={stats.total_video}
          icon={Video}
          gradient="bg-gradient-primary"
        />

        <StatCard
          title="Video Aktif"
          value={stats.video_aktif}
          icon={Activity}
          gradient="bg-gradient-success"
        />

        <StatCard
          title="Total Kuis"
          value={stats.total_kuis}
          icon={ClipboardList}
          gradient="bg-gradient-warning"
        />

        <StatCard
          title="Total Siswa"
          value={stats.total_siswa}
          icon={Users}
          gradient="bg-gradient-info"
        />

        <StatCard
          title="Hasil Penilaian"
          value={stats.total_hasil}
          icon={GraduationCap}
          gradient="bg-gradient-danger"
        />
      </div>
    </div>
  );
}