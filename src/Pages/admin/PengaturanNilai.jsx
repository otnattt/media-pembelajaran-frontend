import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Settings,
    FileQuestion,
    Trophy,
    Save,
    X,
} from "lucide-react";

const PengaturanNilai = ({ onClose }) => {
    const [jmlSoal, setJmlSoal] = useState("");
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        getJumlahSoal();
    }, []);

    const getJumlahSoal = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/jumlah-soal"
            );

            setJmlSoal(response.data.jml_soal);

        } catch (error) {
            console.error(error);

            setMessage("Gagal mengambil data.");
            setMessageType("error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ===========================
        // VALIDASI
        // ===========================
        if (!jmlSoal || Number(jmlSoal) < 1) {
            setMessage("Jumlah soal minimal 1.");
            setMessageType("error");

            setTimeout(() => {
                setMessage("");
            }, 3000);

            return;
        }

        setLoading(true);

        try {

            await axios.put(
                "http://127.0.0.1:8000/api/jumlah-soal",
                {
                    jml_soal: Number(jmlSoal),
                }
            );

            setMessage("Jumlah soal berhasil diperbarui.");
            setMessageType("success");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (error) {

            console.error(error);

            setMessage("Gagal menyimpan data.");
            setMessageType("error");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="bg-blue-600 p-5 text-white">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="rounded-2xl bg-white/20 p-3">
                                <Settings size={24} />
                            </div>

                            <div>

                                <h2 className="text-xl font-bold">
                                    Pengaturan Jumlah Soal
                                </h2>

                                <p className="text-sm text-blue-100">
                                    Konfigurasi jumlah soal kuis yang akan dikerjakan
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 hover:bg-white/20"
                        >
                            <X size={20} />
                        </button>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                    {message && (
                        <div
                            className={`mb-4 rounded-xl px-4 py-3 ${
                                messageType === "success"
                                    ? "border border-green-200 bg-green-50 text-green-700"
                                    : "border border-red-200 bg-red-50 text-red-700"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* CARD INFO */}
                    <div className="mb-6 grid grid-cols-2 gap-4">

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                            <div className="flex items-center gap-3">

                                <FileQuestion className="text-blue-600" />

                                <div>

                                    <p className="text-xs text-slate-500">
                                        Jumlah Soal
                                    </p>

                                    <h3 className="text-2xl font-bold text-blue-700">
                                        {jmlSoal || 0}
                                    </h3>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

                            <div className="flex items-center gap-3">

                                <Trophy className="text-green-600" />

                                <div>

                                    <p className="text-xs text-slate-500">
                                        Nilai Maksimal
                                    </p>

                                    <h3 className="text-2xl font-bold text-green-700">
                                        100
                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit} noValidate>

                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Jumlah Soal
                            </label>

                            <input
                                type="number"
                                value={jmlSoal}
                                onChange={(e) =>
                                    setJmlSoal(e.target.value)
                                }
                                placeholder="Masukkan jumlah soal"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* PREVIEW */}
                        <div className="mb-6 rounded-2xl border bg-slate-50 p-4">

                            <p className="text-sm text-slate-600">
                                Sistem akan menggunakan
                                <span className="font-bold text-blue-600">
                                    {" "}{jmlSoal || 0} soal
                                </span>
                                {" "}sebagai perhitungan nilai siswa.
                            </p>

                        </div>

                        <div className="flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-100"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save size={18} />

                                {loading
                                    ? "Menyimpan..."
                                    : "Simpan"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default PengaturanNilai;