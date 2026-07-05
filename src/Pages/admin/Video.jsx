import { useState } from "react";
import { useRef } from "react";
import {
  Plus,
  Search,
  Pencil,
  Upload,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

import PageHeader from "../../Components/admin/PageHeader.jsx";
import Button from "../../Components/admin/Button.jsx";
import Modal from "../../Components/admin/Modal.jsx";


export default function VideoPage() {
  const [items, setItems] = useState([]);

  const videoRefs = useRef({});

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [currentTimes, setCurrentTimes] =
    useState({});

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("semua");

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
useEffect(() => {
  Object.entries(videoRefs.current).forEach(([id, video]) => {
    if (!video) return;

    const savedTime = currentTimes[id];

    if (!savedTime) return;

    const [m, s] = savedTime.split(":").map(Number);
    const timeInSec = m * 60 + s;

    // tunggu metadata video siap
    if (video.readyState >= 1) {
      if (Math.abs(video.currentTime - timeInSec) > 1) {
        video.currentTime = timeInSec;
      }
    }
  });
}, [currentTimes]);
    

    const fetchVideo = async () => {

    try {

        const response = await axios.get(
            "http://127.0.0.1:8000/api/video"
        );

        console.log(response.data);

        setItems(response.data);

    } catch (error) {

        console.error(error);

    }
};



  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    file: null,
    durasi_video: "",
  });

  useEffect(() => {
    fetchVideo();
}, []);

  // filter
  const filtered = items.filter(
    (v) =>
      v.judul
        .toLowerCase()
        .includes(q.toLowerCase()) &&
      (filter === "semua" ||
        v.status_video === filter)
  );

  const handleVideoChange = (e) => {

    const file = e.target.files?.[0];
    console.log(file.size);

    if (!file) return;

    // langsung simpan file
    setForm(prev => ({
        ...prev,
        file: file
    }));

    const url = URL.createObjectURL(file);

    const video = document.createElement("video");

    video.preload = "metadata";

    video.src = url;

    video.onloadedmetadata = () => {

        const total = Math.floor(video.duration);

        const menit = Math.floor(total / 60);

        const detik = total % 60;

        setForm(prev => ({
            ...prev,
            durasi_video:
                `${menit}:${String(detik).padStart(2,"0")}`
        }));

        URL.revokeObjectURL(url);
    };

};

  // tambah video
  const submit = async (e) => {

    e.preventDefault();

    if (!form.judul) {
        return toast.error("Judul wajib diisi");
    }

    if (!form.file) {
        return toast.error("Video belum dipilih");
    }

    try {

        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();

        formData.append("id_guru", 1);
        formData.append("judul", form.judul);
        formData.append("deskripsi", form.deskripsi);
        formData.append("durasi_video", form.durasi_video);
        formData.append("file_video", form.file);

        const response = await axios.post(

            "http://127.0.0.1:8000/api/video",

            formData,

            {

                timeout: 0,

                onUploadProgress: (progressEvent) => {

                    const percent = Math.round(

                        (progressEvent.loaded * 100) /

                        progressEvent.total

                    );

                    setUploadProgress(percent);

                }

            }

        );

        toast.success("Video berhasil diupload");

        fetchVideo();

        setOpen(false);

        setForm({

            judul: "",

            deskripsi: "",

            file: null,

            durasi_video: "",

        });

    } catch (error) {

        console.log(error);

        if (error.response) {

            console.log(error.response.status);

            console.log(error.response.data);

            toast.error(error.response.data.message ?? "Upload gagal");

        } else {

            toast.error("Gagal menghubungi server");

        }

    } finally {

        setUploading(false);

    }

};

  // buka edit
  const openEdit = (video) => {
    setSelectedVideo(video);
    setEditOpen(true);
  };

  // simpan edit
  const saveEdit = async () => {

  try {

    const response = await axios.put(
      `http://127.0.0.1:8000/api/video/${selectedVideo.id_vidpem}`,
      {
        judul: selectedVideo.judul,
        deskripsi: selectedVideo.deskripsi,
        status_video: selectedVideo.status_video,
      }
    );

    console.log(response.data);

    toast.success("Video berhasil diperbarui");

    fetchVideo();

    setEditOpen(false);

  } catch (error) {

    console.error(error);

    toast.error("Gagal update video");
  }
};

  // toggle status
  const toggleStatus = () => {
    setSelectedVideo({
        ...selectedVideo,
        status_video:
            selectedVideo.status_video === "aktif"
                ? "nonaktif"
                : "aktif",
    });
};

const formatTime = (time) => {

    if (!time) return "00:00";

    const total =
        Math.floor(time);

    const minutes =
        Math.floor(total / 60);

    const seconds =
        total % 60;

    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

};



  return (
    <div>
      <PageHeader
        title="Manajemen Video"
        description="Kelola video animasi pembelajaran."
        actions={
          <Button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Tambah Video
          </Button>
        }
      />

      {/* FILTER */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 p-4 mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          <input
            value={q}
            onChange={(e) =>
              setQ(e.target.value)
            }
            placeholder="Cari video..."
            className="w-full pl-9 pr-3 h-10 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="h-10 px-3 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="semua">
            Semua status
          </option>

          <option value="aktif">
            Aktif
          </option>

          <option value="nonaktif">
            Nonaktif
          </option>
        </select>
      </div>

      {/* CARD VIDEO */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((v) => (
          <div
            key={v.id_vidpem}
            className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden"
          >
              <video
                ref={(el) => {
                  videoRefs.current[v.id_vidpem] = el;
                }}
                controls
                preload="metadata"
                className="w-full h-40 object-cover"
                src={`http://127.0.0.1:8000/api/video/stream/${encodeURIComponent(v.file_video)}`}
                onTimeUpdate={(e) => {
                    const id = v.id_vidpem;

                    const current = Math.floor(e.target.currentTime);

                    // update hanya tiap 2 detik
                    if (current % 2 !== 0) return;

                    const menit = Math.floor(current / 60);
                    const detik = current % 60;

                    setCurrentTimes(prev => ({
                      ...prev,
                      [id]: `${menit}:${String(detik).padStart(2, "0")}`
                    }));
                  }}
              />

            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold truncate">
                  {v.judul}
                </h3>

                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    v.status_video === "aktif"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {v.status_video}
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                {v.deskripsi}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span>
    Durasi {v.durasi_video || "-"}
</span>

                <span>
                  {v.uploaded}
                </span>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  openEdit(v)
                }
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL TAMBAH */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Video Baru"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>

            <Button
                onClick={submit}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >

                <Upload className="h-4 w-4" />

                {uploading ? "Mengupload..." : "Unggah"}

            </Button>
          </>
        }
      >
        <Field label="Judul Video">
          <input
            value={form.judul}
            onChange={(e) =>
              setForm({
                ...form,
                judul: e.target.value,
              })
            }
            className="input"
          />
        </Field>

        <Field label="Deskripsi">
          <textarea
            value={form.deskripsi}
            onChange={(e) =>
              setForm({
                ...form,
                deskripsi: e.target.value,
              })
            }
            rows={3}
            className="input"
          />
        </Field>

        <Field label="File Video (mp4)">
          <input
        type="file"
        accept="video/mp4"
        onChange={handleVideoChange}
        />
        </Field>
      </Modal>

      {/* MODAL EDIT */}
      <Modal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        title="Edit Video"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() =>
                setEditOpen(false)
              }
            >
              Batal
            </Button>

            <Button
              onClick={saveEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Simpan
            </Button>
          </>
        }
      >
        {selectedVideo && (
          <div className="space-y-4">
            <Field label="Judul Video">
              <input
                value={
                  selectedVideo.judul
                }
                onChange={(e) =>
                  setSelectedVideo({
                    ...selectedVideo,
                    judul:
                      e.target.value,
                  })
                }
                className="input"
              />
            </Field>

            <Field label="Deskripsi">
              <textarea
                rows={3}
                value={
                  selectedVideo.deskripsi
                }
                onChange={(e) =>
                  setSelectedVideo({
                    ...selectedVideo,
                    deskripsi:
                      e.target.value,
                  })
                }
                className="input"
              />
            </Field>

            <Field label="Upload Video Baru">
              <input
                type="file"
                className="input !p-2"
              />
            </Field>

            {/* STATUS */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Status Video
              </label>

              <Button
                type="button"
                onClick={toggleStatus}
                className={
                  selectedVideo.status_video ===
                  "aktif"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }
              >
                {selectedVideo.status_video ===
                "aktif"
                  ? "Nonaktifkan Video"
                  : "Aktifkan Video"}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        .input{
          width:100%;
          border:1px solid #e2e8f0;
          border-radius:.75rem;
          padding:.75rem 1rem;
          font-size:.875rem;
          outline:none
        }

        .input:focus{
          box-shadow:0 0 0 2px rgba(59,130,246,.35);
          border-color:#3b82f6
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}
      </label>

      {children}
    </div>
  );
}