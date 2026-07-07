import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { toast } from "sonner";

import {
  Plus,
  Pencil,
  X,
  UserCheck,
  UserX,
} from "lucide-react";

import PageHeader from "../../Components/admin/PageHeader.jsx";
import Button from "../../Components/admin/Button.jsx";

export default function Siswa() {

  // =========================
  // DATA SISWA
  // =========================
  const [dataSiswa, setDataSiswa] = useState([]);

  // =========================
  // MODAL
  // =========================
  const [showTambahModal, setShowTambahModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  // =========================
  // FORM TAMBAH
  // =========================
  const [form, setForm] = useState({
    nis: "",
    nama: "",
  });

  // =========================
  // FORM EDIT
  // =========================
  const [editForm, setEditForm] = useState({
    id_siswa: null,
    nis: "",
    nama: "",
    status_siswa: "aktif",
  });

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    try {

      const response = await axiosInstance.get("/siswa");

      setDataSiswa(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // HANDLE INPUT TAMBAH
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE INPUT EDIT
  // =========================
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // TAMBAH SISWA
  // =========================
  const handleTambah = async (e) => {

    e.preventDefault();

    try {

      await axiosInstance.post(
  "/siswa",
  {
    nis: form.nis,
    nama: form.nama,
  }
);

      fetchSiswa();

      setForm({
        nis: "",
        nama: "",
      });

      setShowTambahModal(false);

      toast.success("Data siswa berhasil ditambahkan");

    } catch (error) {

      console.log(error.response?.data);

      toast.error("Gagal menambahkan data");
    }
  };

  // =========================
  // OPEN EDIT
  // =========================
  const handleOpenEdit = (siswa) => {

    setEditForm({
      id_siswa: siswa.id_siswa,
      nis: siswa.nis,
      nama: siswa.nama,
      status_siswa: siswa.status_siswa,
    });

    setShowEditModal(true);
  };

  // =========================
  // UPDATE SISWA
  // =========================
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await axiosInstance.put(
  `/siswa/${editForm.id_siswa}`,
  {
    nis: editForm.nis,
    nama: editForm.nama,
    status_siswa: editForm.status_siswa,
  }
);

      fetchSiswa();

      setShowEditModal(false);

      toast.success("Data siswa berhasil diperbarui");

    } catch (error) {

      console.log(error.response?.data);

      toast.success("Gagal Update Data Siswa");
    }
  };

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}
      <PageHeader
        title="Data Siswa"
        description="Daftar siswa yang mengakses media pembelajaran."
        actions={
          <Button
            onClick={() =>
              setShowTambahModal(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Tambah Siswa
          </Button>
        }
      />

      {/* =========================
          TABLE
      ========================= */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-slate-600">
            <tr>

              <th className="text-left font-semibold px-5 py-3">
                NISN
              </th>

              <th className="text-left font-semibold px-5 py-3">
                Nama
              </th>

              <th className="text-left font-semibold px-5 py-3">
                Status
              </th>

              <th className="text-left font-semibold px-5 py-3">
                Aksi
              </th>

            </tr>
          </thead>

          <tbody>
            {dataSiswa.map((s) => (
              <tr
                key={s.id_siswa}
                className="border-t border-slate-100 hover:bg-slate-50"
              >

                {/* NIS */}
                <td className="px-5 py-3 font-mono">
                  {s.nis}
                </td>

                {/* NAMA */}
                <td className="px-5 py-3 font-medium">
                  {s.nama}
                </td>

                {/* STATUS */}
                <td className="px-5 py-3">

                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      s.status_siswa === "aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {s.status_siswa === "aktif" ? (
                      <UserCheck className="h-4 w-4" />
                    ) : (
                      <UserX className="h-4 w-4" />
                    )}

                    {s.status_siswa === "aktif" ? "Aktif" : "Nonaktif"}

                  </div>

                </td>

                {/* AKSI */}
                <td className="px-5 py-3">

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleOpenEdit(s)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* =========================
          MODAL TAMBAH
      ========================= */}
      {showTambahModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-4">

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Tambah Data Siswa
                </h2>

                <p className="text-sm text-slate-500">
                  Tambahkan data siswa baru.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowTambahModal(false)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleTambah}
              className="space-y-4 p-6"
            >

              {/* NIS */}
              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  NISN
                </label>

                <input
                  type="text"
                  name="nis"
                  value={form.nis}
                  onChange={handleChange}
                  placeholder="Masukkan NISN"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* NAMA */}
              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Nama Siswa
                </label>

                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama siswa"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-3 pt-2">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setShowTambahModal(false)
                  }
                >
                  Batal
                </Button>

                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Simpan
                </Button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* =========================
          MODAL EDIT
      ========================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-4">

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Edit Data Siswa
                </h2>

                <p className="text-sm text-slate-500">
                  Ubah data siswa.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleUpdate}
              className="space-y-4 p-6"
            >

              {/* NIS */}
              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  NISN
                </label>

                <input
                  type="text"
                  name="nis"
                  value={editForm.nis}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* NAMA */}
              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Nama Siswa
                </label>

                <input
                  type="text"
                  name="nama"
                  value={editForm.nama}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* STATUS */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status Siswa
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setEditForm({
                      ...editForm,
                      status_siswa:
                        editForm.status_siswa === "aktif"
                          ? "nonaktif"
                          : "aktif",
                    })
                  }
                  className={`w-full rounded-xl border px-4 py-3 font-medium transition-all duration-200 ${
                    editForm.status_siswa === "aktif"
                      ? "border-green-200 bg-green-500/10 text-green-700 hover:bg-green-500/15"
                      : "border-red-200 bg-red-500/10 text-red-700 hover:bg-red-500/15"
                  }`}
                >

                  <div className="flex items-center  gap-2">

                    {editForm.status_siswa === "aktif" ? (
                      <>
                        <UserCheck className="h-5 w-5" />
                        Aktif
                      </>
                    ) : (
                      <>
                        <UserX className="h-5 w-5" />
                        Nonaktif
                      </>
                    )}

                  </div>

                </button>

                <p className="mt-2 text-xs text-slate-500">
                  Klik tombol untuk mengubah status siswa.
                </p>

              </div>
              {/* BUTTON */}
              <div className="flex justify-end gap-3 pt-2">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                >
                  Batal
                </Button>

                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Update
                </Button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}