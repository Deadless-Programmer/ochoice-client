"use client";

import React, { useEffect, useState } from "react";
import { privateAxios } from "@/lib/api/privateAxios";
import { toast } from "react-toastify";
import { Pencil, Trash2, RotateCcw } from "lucide-react";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isDeleted?: boolean;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  // 🧭 Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await privateAxios.get("/admin/users");
      setUsers(res.data);
    } catch (error)  {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to Load Users ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🧾 Handle Edit
  const handleEdit = (user: User) => {
    setEditUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  // 💾 Update User
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      const res = await privateAxios.put(`/admin/user/${editUser._id}`, formData);
      toast.success(res.data.message || "User updated ✅");
      setEditUser(null);
      fetchUsers();
    } catch {
      toast.error("Failed to update user ❌");
    }
  };

  // 🗑️ Soft Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await privateAxios.delete(`/admin/user/${id}`);
      toast.success(res.data.message || "User deleted 🗑️");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user ❌");
    }
  };

  // 🔄 Restore
  const handleRestore = async (id: string) => {
    try {
      const res = await privateAxios.put(`/admin/user/${id}/restore`);
      toast.success(res.data.message || "User restored ✅");
      fetchUsers();
    } catch {
      toast.error("Failed to restore user ❌");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading users...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">
        Manage Users : <span>{users.length}</span>
      </h1>

      {/* 🧮 User Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className={`border-b hover:bg-gray-50 ${
                  u.isDeleted ? "opacity-50" : ""
                }`}
              >
                <td className="px-6 py-3">{u.username}</td>
                <td className="px-6 py-3">{u.email}</td>
                <td className="px-6 py-3 capitalize">{u.role}</td>
                <td className="px-6 py-3">
                  {u.isDeleted ? (
                    <span className="text-red-500 font-medium">Deleted</span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </td>
                <td className="px-6 py-3 flex items-center gap-3 justify-center">
                  {!u.isDeleted && (
                    <>
                      <button
                        onClick={() => handleEdit(u)}
                        className="text-blue-500 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                  {u.isDeleted && (
                    <button
                      onClick={() => handleRestore(u._id)}
                      className="text-green-500 hover:text-green-600"
                      title="Restore"
                    >
                      <RotateCcw size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✏️ Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="customer">Customer</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
