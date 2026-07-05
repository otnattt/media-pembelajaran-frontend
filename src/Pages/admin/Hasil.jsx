import { useEffect, useState } from "react";
import axios from "axios";

import {
  FileSpreadsheet,
  FileText,
  FileType,
  Search,
} from "lucide-react";

import { toast } from "sonner";

import PageHeader from "../../Components/admin/PageHeader.jsx";
import Button from "../../Components/admin/Button.jsx";

export default function Hasil() {

  // =========================
  // STATE
  // =========================
  const [hasil, setHasil] = useState([]);

  const [q, setQ] = useState("");

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchHasil();
  }, []);

  async function fetchHasil() {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/hasil"
      );

      setHasil(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Gagal mengambil data hasil"
      );
    }
  }

  // =========================
  // FILTER SEARCH
  // =========================
  const data = hasil.filter((h) =>
    h.siswa
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  // =========================
  // EXPORT
  // =========================
  const exp = async (type) => {
  try {

    const url =
      type === "Excel"
        ? "http://127.0.0.1:8000/api/hasil/export/excel"
        : "http://127.0.0.1:8000/api/hasil/export/pdf";

    const response = await axios.get(url, {
      responseType: "blob",
    });

    const blob = new Blob(
      [response.data]
    );

    const link =
      document.createElement("a");

    link.href =
      window.URL.createObjectURL(blob);

    link.download =
      type === "Excel"
        ? "hasil_penilaian.xlsx"
        : "hasil_penilaian.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    toast.success(
      `Export ${type} berhasil`
    );

  } catch (error) {

    console.error(error);

    toast.error(
      `Export ${type} gagal`
    );
  }
};

  return (
    <div>

      <PageHeader
        title="Hasil Penilaian"
        description="Pantau nilai kuis siswa dan ekspor laporan."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => exp("Excel")}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </Button>

            <Button
              variant="outline"
              onClick={() => exp("PDF")}
            >
              <FileText className="h-4 w-4" />
              PDF
            </Button>

          </>
        }
      />

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">

        {/* SEARCH */}
        <div className="p-4 border-b border-slate-100">

          <div className="relative max-w-sm">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari siswa..."
              className="w-full pl-9 pr-3 h-10 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-600">

              <tr>

                {[
                  "Siswa",
                  "Kuis",
                  "Nilai",
                  "Tanggal",
                  "Status",
                ].map((h) => (

                  <th
                    key={h}
                    className="text-left font-semibold px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {data.map((h) => (

                <tr
                  key={h.id}
                  className="border-t border-slate-100"
                >

                  <td className="px-5 py-3 font-medium">
                    {h.siswa}
                  </td>

                  <td className="px-5 py-3">
                    {h.kuis}
                  </td>

                  <td className="px-5 py-3">

                    <span className="font-bold">
                      {h.nilai}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-slate-500">
                    {h.tanggal}
                  </td>

                  <td className="px-5 py-3">

                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        h.status === "lulus"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}