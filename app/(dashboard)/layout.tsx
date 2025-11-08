"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAppSelector((s) => s.auth);
  const user = auth.user;
  const loading = auth.loading;

  // ✅ Redirect inside useEffect (NOT during render)
useEffect(() => {
  const timer = setTimeout(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, 300); // 0.3s delay to allow state rehydration

  return () => clearTimeout(timer);
}, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  const sidebarMenus: Record<string, { name: string; path: string }[]> = {
    superAdmin: [
      { name: "Overview", path: "/dashboard" },
      { name: "Manage Admins", path: "/dashboard/admin" },
      { name: "All Users", path: "/dashboard/users" },
      { name: "Create A User", path: "/createAUser" },

      // { name: "System Settings", path: "/dashboard/settings" },
    ],
    admin: [
      { name: "Overview", path: "/dashboard" },
      { name: "Products", path: "/dashboard/products" },
      { name: "Orders", path: "/dashboard/orders" },
      { name: "Create A User", path: "/createAUser" },
      { name: "Reports", path: "/dashboard/reports" },
    ],
    seller: [
      { name: "Overview", path: "/dashboard" },
      { name: "My Products", path: "/dashboard/products" },
      { name: "Sales", path: "/dashboard/sales" },
    ],
    customer: [
      { name: "My Dashboard", path: "/dashboard" },
      { name: "My Orders", path: "/dashboard/orders" },
      { name: "My Reviews", path: "/dashboard/reviews" },
    ],
  };

  const roleKey = (user.role as string) ?? "customer";
  const menus = sidebarMenus[roleKey] ?? sidebarMenus["customer"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-5">
        <div className="mb-6">
          <Link href={'/'} className="text-lg font-bold"> <span  className="text-orange-400">o</span>Choice</Link>
          <p className="text-sm text-gray-500">
            Role: <span className="font-medium">{roleKey}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">Hi, {user.username}</p>
        </div>

        <nav className="space-y-1">
          {menus.map((menu) => {
            const active = pathname === menu.path;
            return (
              <Link
                key={menu.path}
                href={menu.path}
                className={`block px-3 py-2 rounded-md text-sm ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-6 border-t">
          <Link
            href="/dashboard/settings/changePassword"
            className="block text-sm text-gray-600 hover:underline"
          >
            Settings
          </Link>
          <Link
            href="/logout"
            className="block text-sm text-red-500 mt-2"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
