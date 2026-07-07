import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { toast } from "sonner";

import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  BookOpen,
  Eye,
} from "lucide-react";

import PageHeader from "../../Components/admin/PageHeader.jsx";
import Button from "../../Components/admin/Button.jsx";
import PengaturanNilai from "./PengaturanNilai";

export default function Kuis() {

  // =========================
  // DATA KUIS
  // =========================
  const [dataKuis, setDataKuis] = useState([]);

  // =========================
  // MODAL
  // =========================
  const [showTambahModal, setShowTambahModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDetailModal, setShowDetailModal] =
  useState(false);

  const [detailKuis, setDetailKuis] =
  useState(null);

 const [showPengaturan, setShowPengaturan] = useState(false);
 const [jumlahSoal, setJumlahSoal] = useState("");
 const [editJumlahSoal, setEditJumlahSoal] = useState("");

  // =========================
  // FORM KUIS
  // =========================
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    status: "aktif",
  });

  // =========================
  // FORM EDIT
  // =========================
  const [editForm, setEditForm] = useState({
    id_kuis: null,
    judul: "",
    deskripsi: "",
    status: "aktif",
  });

  // =========================
  // EDIT SOAL
  // =========================
  const [editSoalList, setEditSoalList] =
    useState([]);
// =========================
// SOAL DEFAULT
// =========================
const defaultSoal = {
  pertanyaan: "",
  pilihan: {
    A: "",
    B: "",
    C: "",
    D: "",
  },
  jawaban: "A",
};

// =========================
// SOAL
// =========================
const [soalList, setSoalList] = useState(
  Array.from({ length: 5 }, () => ({
    ...defaultSoal,
    pilihan: { ...defaultSoal.pilihan },
  }))
);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchKuis();
  }, []);

  const fetchKuis = async () => {
  try {

    const response = await axiosInstance.get("/admin/kuis");

    setDataKuis(response.data);

  } catch (error) {
    console.log(error);
  }
};


  // =========================
  // HANDLE FORM
  // =========================
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE EDIT FORM
  // =========================
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE SOAL
  // =========================
  const handleSoalChange = (
    index,
    field,
    value
  ) => {

    const updated = [...soalList];

    updated[index][field] = value;

    setSoalList(updated);
  };

  // =========================
  // HANDLE PILIHAN
  // =========================
  const handlePilihanChange = (
    index,
    option,
    value
  ) => {

    const updated = [...soalList];

    updated[index].pilihan[option] =
      value;

    setSoalList(updated);
  };

  // =========================
  // HANDLE EDIT SOAL
  // =========================
  const handleEditSoalChange = (
    index,
    field,
    value
  ) => {

    const updated = [...editSoalList];

    updated[index][field] = value;

    setEditSoalList(updated);
  };

  // =========================
  // HANDLE EDIT PILIHAN
  // =========================
  const handleEditPilihanChange = (
    index,
    option,
    value
  ) => {

    const updated = [...editSoalList];

    updated[index].pilihan[option] =
      value;

    setEditSoalList(updated);
  };

  // =========================
  // TAMBAH SOAL
  // =========================
  const tambahSoal = () => {

  setSoalList([
    ...soalList,
    {
      pertanyaan: "",
      pilihan: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      jawaban: "A",
    },
  ]);
};

  // =========================
  // TAMBAH EDIT SOAL
  // =========================
  const tambahEditSoal = () => {

  setEditSoalList([
    ...editSoalList,
    {
      pertanyaan: "",
      pilihan: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      jawaban: "A",
    },
  ]);
};

  // =========================
  // HAPUS SOAL
  // =========================
  const hapusSoal = (index) => {

     if (soalList.length <= 5) {
    toast.error("Minimal harus terdapat 5 soal.");
    return;
  }
    const updated = soalList.filter(
      (_, i) => i !== index
    );

    setSoalList(updated);
  };

  // =========================
  // HAPUS EDIT SOAL
  // =========================
  const hapusEditSoal = (index) => {

      if (editSoalList.length <= 5) {
    toast.error("Minimal harus terdapat 5 soal.");
    return;
  }
    
    const updated = editSoalList.filter(
      (_, i) => i !== index
    );

    setEditSoalList(updated);
  };

  // =========================
  // TAMBAH KUIS
  // =========================
  const handleTambah = async (e) => {
  e.preventDefault();

  if (soalList.length < 5) {
  toast.error("Jumlah soal minimal 5.");
  return;
}

  const soalKosong = soalList.find(
    (s) =>
      !s.pertanyaan.trim() ||
      !s.pilihan.A.trim() ||
      !s.pilihan.B.trim() ||
      !s.pilihan.C.trim() ||
      !s.pilihan.D.trim()
  );

  if (soalKosong) {
    toast.error(
      "Semua soal dan pilihan jawaban harus diisi."
    );
    return;
  }

  try {
    const dataKuis = {
  ...form,
  total_soal: soalList.length,
  soal: soalList,
};

console.log("DATA KUIS");
console.log(JSON.stringify(dataKuis, null, 2));
    await axiosInstance.post(
    "/kuis",
    dataKuis
    );

    fetchKuis();

    setForm({
      judul: "",
      deskripsi: "",
      status: "aktif",
    });

   setSoalList(
  Array.from({ length: 5 }, () => ({
    ...defaultSoal,
    pilihan: { ...defaultSoal.pilihan },
  }))
);

    setShowTambahModal(false);

    toast.success(
      "Kuis berhasil ditambahkan"
    );

  } catch (error) {

    console.log(error);

    if (error.response) {

        console.log(error.response.status);
        console.log(error.response.data);

    } else {

        console.log(error.message);

    }

}
};


  const handleOpenDetail = (kuis) => {

  setDetailKuis(kuis);

  setShowDetailModal(true);
  };
  // =========================
  // OPEN EDIT
  // =========================
  const handleOpenEdit = (kuis) => {

  setEditForm({
    id_kuis: kuis.id_kuis,
    judul: kuis.judul,
    deskripsi: kuis.deskripsi,
    status: kuis.status,
  });


  // FORMATKAN DATA DATABASE
  const formattedSoal =
    kuis.detail_kuis.map((item) => ({
      pertanyaan: item.pertanyaan,

      pilihan: {
        A: item.pilihan_a,
        B: item.pilihan_b,
        C: item.pilihan_c,
        D: item.pilihan_d,
      },

      jawaban: item.jawaban,
    }));

  setEditSoalList(formattedSoal);

  setShowEditModal(true);
};

  // =========================
  // UPDATE KUIS
  // =========================
  const handleUpdate = async (e) => {
  e.preventDefault();

  // Minimal 5 soal
if (editSoalList.length < 5) {
  toast.error("Jumlah soal minimal 5.");
  return;
}

  // Validasi judul
  if (!editForm.judul.trim()) {
    toast.error("Judul kuis tidak boleh kosong.");
    return;
  }
const dataUpdate = {
  ...editForm,
  total_soal: editSoalList.length,
  soal: editSoalList,
};
  // Validasi soal
  const soalKosong = editSoalList.find(
    (s) =>
      !s.pertanyaan.trim() ||
      !s.pilihan.A.trim() ||
      !s.pilihan.B.trim() ||
      !s.pilihan.C.trim() ||
      !s.pilihan.D.trim()
  );

  if (soalKosong) {
    toast.error(
      "Semua soal dan pilihan jawaban harus diisi."
    );
    return;
  }

  try {

    const dataUpdate = {
      ...editForm,
      total_soal: editSoalList.length,
      soal: editSoalList,
    };

    await axiosInstance.put(
    `/kuis/${editForm.id_kuis}`,
    dataUpdate
);

    fetchKuis();

    setShowEditModal(false);

    toast.success(
      "Kuis berhasil diperbarui"
    );

  } catch (error) {

    console.log(error.response?.data);

    if (error.response?.data?.errors) {
      const firstError = Object.values(
        error.response.data.errors
      )[0][0];

      toast.error(firstError);
      return;
    }

    toast.error(
      error.response?.data?.message ||
      "Gagal update kuis"
    );
  }
};

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}
      <PageHeader
        title="Manajemen Kuis"
        description="Daftar kuis pembelajaran."
        actions={
        <div className="flex gap-2">

          <Button
            onClick={() =>
              setShowPengaturan(true)
            }
            className="bg-slate-500 hover:bg-slate-600 text-white"
          >
            Pengaturan Jumlah Soal
          </Button>

          <Button
            onClick={() =>
              setShowTambahModal(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Tambah Kuis
          </Button>

        </div>
      }
      />

      {/* =========================
          TABLE
      ========================= */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-slate-600">
            <tr>

              <th className="px-5 py-3 text-left font-semibold">
                Judul
              </th>

              <th className="px-5 py-3 text-left font-semibold">
                Deskripsi
              </th>

              <th className="px-5 py-3 text-left font-semibold">
                Total Soal
              </th>

              <th className="px-5 py-3 text-left font-semibold">
                Status
              </th>

              <th className="px-5 py-3 text-left font-semibold">
                Aksi
              </th>

            </tr>
          </thead>

          <tbody>

            {dataKuis.map((k) => (
              <tr
                key={k.id_kuis}
                className="border-t border-slate-100 hover:bg-slate-50"
              >

                {/* JUDUL */}
                <td className="px-5 py-3 font-medium">
                  {k.judul}
                </td>

                {/* DESKRIPSI */}
                <td className="px-5 py-3 text-slate-600">
                  {k.deskripsi}
                </td>

                {/* TOTAL SOAL */}
                <td className="px-5 py-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">

                    <BookOpen className="h-4 w-4" />

                    {k.total_soal} Soal

                  </div>
                </td>

                {/* STATUS */}
                <td className="px-5 py-3">

                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      k.status === "aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {k.status === "aktif" ? "Aktif" : "Draft"}

                  </div>

                </td>

                {/* AKSI */}
                <td className="px-5 py-3 flex gap-2">

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleOpenEdit(k)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                  variant="outline"
                  onClick={() =>
                    handleOpenDetail(k)
                  }
                >
                  <Eye className="h-4 w-4" />
                </Button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* =========================
          MODAL TAMBAH KUIS
      ========================= */}
      {showTambahModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">

          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-4">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Tambah Kuis
                </h2>

                <p className="text-sm text-slate-500">
                  Tambahkan kuis beserta soal.
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
              className="space-y-8 p-6"
            >

              {/* DATA KUIS */}
              <div className="space-y-4">

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Judul Kuis
                  </label>

                  <input
                    type="text"
                    name="judul"
                    value={form.judul}
                    onChange={handleFormChange}
                    placeholder="Masukkan judul kuis"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Deskripsi
                  </label>

                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleFormChange}
                    rows="3"
                    placeholder="Masukkan deskripsi kuis"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Status
                  </label>

                  <Button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        status:
                          form.status === "aktif"
                            ? "draft"
                            : "aktif",
                      })
                    }
                    className={`min-w-[180px] py-3 justify-center font-semibold border transition-all duration-200 ${
                      form.status === "aktif"
                        ? "border-emerald-300 bg-emerald-100 !text-emerald-800 hover:bg-emerald-200"
                        : "border-orange-300 bg-orange-100 !text-orange-800 hover:bg-orange-200"
                    }`}
                  >
                    {form.status === "aktif"
                      ? "Aktif"
                      : "Draft"}
                  </Button>
                </div>
              </div>

              {/* SOAL */}
              <div className="space-y-6">

                {soalList.map(
                  (soal, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <h2 className="font-bold text-lg">
                          Soal {index + 1}
                        </h2>

                        {soalList.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              hapusSoal(index)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}

                      </div>

                      <div className="mb-4">

                        <label className="block mb-1 text-sm font-medium">
                          Pertanyaan
                        </label>

                        <textarea
                          value={
                            soal.pertanyaan
                          }
                          onChange={(e) =>
                            handleSoalChange(
                              index,
                              "pertanyaan",
                              e.target.value
                            )
                          }
                          rows="3"
                          placeholder="Masukkan pertanyaan"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                      </div>

                      <div className="grid md:grid-cols-2 gap-4">

                        {[
                          "A",
                          "B",
                          "C",
                          "D",
                        ].map((option) => (
                          <div
                            key={option}
                          >

                            <label className="block mb-1 text-sm font-medium">
                              Pilihan{" "}
                              {option}
                            </label>

                            <input
                              type="text"
                              value={
                                soal
                                  .pilihan[
                                  option
                                ]
                              }
                              onChange={(
                                e
                              ) =>
                                handlePilihanChange(
                                  index,
                                  option,
                                  e.target
                                    .value
                                )
                              }
                              placeholder={`Masukkan pilihan ${option}`}
                              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                          </div>
                        ))}

                      </div>

                      <div className="mt-4">

                        <label className="block mb-1 text-sm font-medium">
                          Jawaban Benar
                        </label>

                        <select
                          value={
                            soal.jawaban
                          }
                          onChange={(e) =>
                            handleSoalChange(
                              index,
                              "jawaban",
                              e.target.value
                            )
                          }
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >

                          <option value="A">
                            Pilihan A
                          </option>

                          <option value="B">
                            Pilihan B
                          </option>

                          <option value="C">
                            Pilihan C
                          </option>

                          <option value="D">
                            Pilihan D
                          </option>

                        </select>

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* BUTTON */}
              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={tambahSoal}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                  <Plus className="h-5 w-5" />
                  Tambah Soal
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
                >
                  <Save className="h-5 w-5" />
                  Simpan Kuis
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* =========================
          MODAL EDIT
      ========================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">

          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b px-6 py-4">

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Edit Kuis
                </h2>

                <p className="text-sm text-slate-500">
                  Ubah data kuis.
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

            <form
              onSubmit={handleUpdate}
              className="space-y-6 p-6"
            >

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Judul
                </label>

                <input
                  type="text"
                  name="judul"
                  value={editForm.judul}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Deskripsi
                </label>

                <textarea
                  name="deskripsi"
                  value={
                    editForm.deskripsi
                  }
                  onChange={
                    handleEditChange
                  }
                  rows="3"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>
                  <label className="block mb-2 text-sm font-medium">
                    Status
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setEditForm({
                        ...editForm,
                        status:
                          editForm.status === "aktif"
                            ? "draft"
                            : "aktif",
                      })
                    }
                    className={`min-w-[180px] rounded-xl border px-4 py-3 flex items-center justify-center font-semibold transition-all duration-200 ${
                      editForm.status === "aktif"
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
                    }`}
                  >
                    {editForm.status === "aktif"
                      ? "Aktif"
                      : "Draft"}
                  </button>
                </div>

              {/* EDIT SOAL */}
              <div className="space-y-6">

                {editSoalList.map(
                  (soal, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <h2 className="font-bold text-lg">
                          Soal {index + 1}
                        </h2>

                        {editSoalList.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              hapusEditSoal(index)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}

                      </div>

                      <div className="mb-4">

                        <label className="block mb-1 text-sm font-medium">
                          Pertanyaan
                        </label>

                        <textarea
                          value={
                            soal.pertanyaan
                          }
                          onChange={(e) =>
                            handleEditSoalChange(
                              index,
                              "pertanyaan",
                              e.target.value
                            )
                          }
                          rows="3"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                      </div>

                      <div className="grid md:grid-cols-2 gap-4">

                        {[
                          "A",
                          "B",
                          "C",
                          "D",
                        ].map((option) => (
                          <div
                            key={option}
                          >

                            <label className="block mb-1 text-sm font-medium">
                              Pilihan{" "}
                              {option}
                            </label>

                            <input
                              type="text"
                              value={
                                soal
                                  .pilihan[
                                  option
                                ]
                              }
                              onChange={(
                                e
                              ) =>
                                handleEditPilihanChange(
                                  index,
                                  option,
                                  e.target
                                    .value
                                )
                              }
                              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                          </div>
                        ))}

                      </div>

                      <div className="mt-4">

                        <label className="block mb-1 text-sm font-medium">
                          Jawaban Benar
                        </label>

                        <select
                          value={
                            soal.jawaban
                          }
                          onChange={(e) =>
                            handleEditSoalChange(
                              index,
                              "jawaban",
                              e.target.value
                            )
                          }
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >

                          <option value="A">
                            Pilihan A
                          </option>

                          <option value="B">
                            Pilihan B
                          </option>

                          <option value="C">
                            Pilihan C
                          </option>

                          <option value="D">
                            Pilihan D
                          </option>

                        </select>

                      </div>

                    </div>
                  )
                )}

                <button
                type="button"
                onClick={tambahEditSoal}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                <Plus className="h-5 w-5" />
                Tambah Soal
              </button>

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
      {/* =========================
    MODAL DETAIL KUIS
========================= */}
{showDetailModal && detailKuis && (

  <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">

    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white shadow-xl">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b px-6 py-4">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Detail Kuis
          </h2>

          <p className="text-sm text-slate-500">
            Preview soal kuis pembelajaran
          </p>

        </div>

        <button
          onClick={() =>
            setShowDetailModal(false)
          }
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* INFO KUIS */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

          <h3 className="text-xl font-bold text-slate-800">
            {detailKuis.judul}
          </h3>

          <p className="mt-2 text-slate-600">
            {detailKuis.deskripsi}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">

              <BookOpen className="h-4 w-4" />

              {detailKuis.total_soal} Soal

            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                detailKuis.status === "aktif"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >

              {detailKuis.status}

            </div>

          </div>

        </div>
        

        {/* LIST SOAL */}
        <div className="space-y-5">

          {detailKuis.detail_kuis?.map(
            (soal, index) => (

              <div
                key={index}
                className="rounded-2xl border border-slate-200 p-5"
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-lg font-bold text-slate-800">
                    Soal {index + 1}
                  </h3>

                  <div className="text-sm font-semibold text-blue-600">
                    Jawaban: {soal.jawaban}
                  </div>

                </div>

                {/* PERTANYAAN */}
                <div className="mb-5">

                  <p className="text-slate-700 leading-relaxed">
                    {soal.pertanyaan}
                  </p>

                </div>

                {/* PILIHAN */}
                <div className="grid md:grid-cols-2 gap-4">

                  <div className={`rounded-xl border p-4 ${
                    soal.jawaban === "A"
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200"
                  }`}>
                    <span className="font-bold">
                      A.
                    </span>{" "}
                    {soal.pilihan_a}
                  </div>

                  <div className={`rounded-xl border p-4 ${
                    soal.jawaban === "B"
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200"
                  }`}>
                    <span className="font-bold">
                      B.
                    </span>{" "}
                    {soal.pilihan_b}
                  </div>

                  <div className={`rounded-xl border p-4 ${
                    soal.jawaban === "C"
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200"
                  }`}>
                    <span className="font-bold">
                      C.
                    </span>{" "}
                    {soal.pilihan_c}
                  </div>

                  <div className={`rounded-xl border p-4 ${
                    soal.jawaban === "D"
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200"
                  }`}>
                    <span className="font-bold">
                      D.
                    </span>{" "}
                    {soal.pilihan_d}
                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
<button
    className="btn btn-warning"
    onClick={() => setShowModal(true)}
>
    Pengaturan Nilai
</button>
  </div>
)}
{showPengaturan && (
  <PengaturanNilai
    onClose={() =>
      setShowPengaturan(false)
    }
  />
)}
    </div>
    
  );
}







