"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams(); // URL থেকে token পাবে
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return setMessage("Please enter your new password");

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${token}`,
        { newPassword }
      );
      setMessage(res.data.message);
      router.push("/login"); // সফল হলে login page এ redirect
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // axios error: try to read the message from response data if present
        setMessage(
          (err.response?.data as { message?: string })?.message ||
            "Something went wrong"
        );
      } else if (err instanceof Error) {
        // generic Error object
        setMessage(err.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Reset Your Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-3 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
