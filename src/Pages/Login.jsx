import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../pages/admin/Dashboard";

import InputField from "../Components/login/InputField";
import PrimaryButton from "../Components/login/PrimaryButton";

import {
    User,
    Lock,
    Eye,
    EyeOff,
    GraduationCap,
    AlertCircle,
    CircleAlert,
} from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        login: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

            const submit = async (e) => {
    e.preventDefault();

    setProcessing(true);
    setErrors({});

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/login",
            {
                login: form.login,
                password: form.password,
            }
        );

        const data = response.data;

        console.log(data);

        if (data.success) {

    // simpan token login
    localStorage.setItem("token", "login-success");

    // simpan data user
    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    console.log("redirect admin");

    // redirect
    navigate("/admin", { replace: true });
}

    } catch (error) {
    console.error(error);

    if (error.response?.status === 422) {
        setErrors({
            login: error.response.data.errors?.login?.[0],
            password: error.response.data.errors?.password?.[0],
        });
    } else if (error.response) {
        setErrors({
            general: [
                error.response.data.message || "Login gagal"
            ]
        });
    } else {
        setErrors({
            general: [
                "Backend Laravel tidak berjalan"
            ]
        });
    }
} finally {
    setProcessing(false);
}
};
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-blue-300">
        <GraduationCap className="w-10 h-10 text-white" />
    </div>

    <h1 className="mt-5 text-2xl font-bold text-slate-800 leading-snug">
        Media Pembelajaran
    </h1>

    <p className="mt-1 text-blue-600 font-medium">
        SDN Tambahrejo 02
    </p>

    <p className="mt-3 text-sm text-slate-500">
        Silakan login untuk melanjutkan
    </p>
</div>

                {errors.general && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errors.general}</span>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <InputField
                        id="login"
                        value={form.login}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                login: e.target.value,
                            });

                            setErrors((prev) => ({
                                ...prev,
                                login: "",
                            }));
                        }}
                        label="Username"
                        type="text"
                        placeholder="Masukkan username Anda"
                        error={errors.login}
                        icon={<User className="w-4 h-4" />}
                    />

                    <InputField
                        id="password"
                        value={form.password}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                password: e.target.value,
                            });

                            setErrors((prev) => ({
                                ...prev,
                                password: "",
                            }));
                        }}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        error={errors.password}
                        icon={<Lock className="w-4 h-4" />}
                        suffix={
                            <button
                                type="button"
                                className="text-slate-400 hover:text-blue-600 transition"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        }
                    />

                    
                    <PrimaryButton
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? "Memproses..." : "Masuk"}
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
}