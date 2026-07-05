import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import PageHeader from "../../Components/admin/PageHeader.jsx";
import Button from "../../Components/admin/Button.jsx";

export default function Pengaturan() {
  const [form, setForm] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
  });

  // Menyimpan data awal untuk mendeteksi perubahan profil
  const [initialForm, setInitialForm] = useState({
    nama: "",
    username: "",
    email: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadGuru();
  }, []);

  const loadGuru = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/guru/${user.id_guru}`
      );

      const data = {
        nama: res.data.data.nama,
        username: res.data.data.username,
        email: res.data.data.email || "",
      };

      setForm({
        ...data,
        password: "",
      });

      setInitialForm(data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data guru");
    }
  };

  const save = async (e) => {
    e.preventDefault();

    const profileChanged =
      form.nama !== initialForm.nama ||
      form.username !== initialForm.username ||
      form.email !== initialForm.email;

    const passwordChanged = form.password.trim() !== "";

    // Jika tidak ada perubahan sama sekali
    if (!profileChanged && !passwordChanged) {
      toast.info("Tidak ada perubahan data");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/guru/${user.id_guru}`,
        form
      );

      if (profileChanged && passwordChanged) {
        toast.success("Profil dan password berhasil diperbarui");
      } else if (profileChanged) {
        toast.success("Profil berhasil diperbarui");
      } else if (passwordChanged) {
        toast.success("Password berhasil diperbarui");
      }

      // Update data awal setelah berhasil disimpan
      setInitialForm({
        nama: form.nama,
        username: form.username,
        email: form.email,
      });

      // Kosongkan password
      setForm((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data");
    }
  };

  return (
    <div>
      <PageHeader
        title="Pengaturan"
        description="Atur informasi akun guru."
      />

      <form
        onSubmit={save}
        className="bg-white rounded-xl shadow-card border border-slate-100 p-6 max-w-2xl space-y-4"
      >
        <Field label="Nama Guru">
          <input
            value={form.nama}
            onChange={(e) =>
              setForm({ ...form, nama: e.target.value })
            }
            className="input"
          />
        </Field>

        <Field label="Username">
          <input
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="input"
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="input"
          />
        </Field>

        <Field label="Nama Sekolah">
          <input
            value="SDN Tambahrejo 02"
            readOnly
            className="input bg-slate-100 cursor-not-allowed"
          />
        </Field>

        <Field label="Password Baru">
          <input
            type="password"
            placeholder="Kosongkan jika tidak ingin mengganti password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="input"
          />
        </Field>

        <div className="pt-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            type="submit"
          >
            Simpan Perubahan
          </Button>
        </div>
      </form>

      <style>{`
        .input{
          width:100%;
          border:1px solid #e2e8f0;
          border-radius:.5rem;
          padding:.6rem .75rem;
          font-size:.875rem;
          outline:none;
          transition:all .2s ease;
        }

        .input:focus{
          box-shadow:0 0 0 2px rgba(59,130,246,.35);
          border-color:#3b82f6;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}