"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, initialized, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {

    if (initialized && !loading && !user) {
      router.push("/login");
    }
  }, [initialized, loading, user, router]);


  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <Loader2 className="animate-spin w-8 h-8 mr-2 text-orange-500" />
        <span>Loading Dashboard...</span>
      </div>
    );
  }

  

 
  const sidebarMenus: Record<string, { name: string; path: string }[]> = {
    superAdmin: [
      { name: "Overview", path: "/dashboard" },
      { name: "Manage Admins", path: "/dashboard/admin" },
      { name: "User Management", path: "/dashboard/userManagement" },
      { name: "Create A User", path: "/createAUser" },
      { name: "Reset Password", path: "/dashboard/superAdmin/resetPassword" },
    ],
    admin: [
      { name: "Overview", path: "/dashboard" },
      { name: "Products", path: "/dashboard/products" },
      { name: "User Management", path: "/dashboard/userManagement" },
      { name: "Orders", path: "/dashboard/orders" },
      { name: "Create A User", path: "/createAUser" },
      { name: "Reports", path: "/dashboard/reports" },
    ],
    seller: [
      { name: "Overview", path: "/dashboard" },
      { name: "My Products", path: "/dashboard/seller/myProducts" },
      { name: "My Deleted Product", path: "/dashboard/seller/my-deleted-product" },
      { name: "Create Product", path: "/dashboard/seller/create-product" },
      { name: "Sales", path: "/dashboard/seller/sales" },
    ],
    customer: [
      { name: "My Dashboard", path: "/dashboard/customer" },
      { name: "My Orders", path: "/dashboard/customer/orders" },
      { name: "My Reviews", path: "/dashboard/reviews" },
    ],
  };

 
  const roleKey = (user?.role as string) ?? "customer";
  const menus = sidebarMenus[roleKey] ?? sidebarMenus["customer"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed Position */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r p-5 overflow-y-auto hidden md:block z-40">
        <div className="mb-6">
          <Link href={'/'} className="text-lg font-bold">
            <span className="text-orange-400">o</span>Choice
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            Role: <span className="font-medium capitalize">{roleKey}</span>
          </p>
          <p className="text-sm text-gray-400">Hi, {user?.username || "User"}</p>
        </div>

        <nav className="space-y-1">
          {menus.map((menu) => {
            const active = pathname === menu.path;
            return (
              <Link
                key={menu.path}
                href={menu.path}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
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
            href="/dashboard/settings/updateProfile"
            className="block text-sm text-gray-600 hover:underline py-2"
          >
            Update Profile
          </Link>
          <Link
            href="/dashboard/settings/changePassword"
            className="block text-sm text-gray-600 hover:underline pb-2"
          >
            Change Password
          </Link>
          <Link href="/logout" className="block text-sm text-red-500 mt-2 hover:font-bold">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area - Left Margin to avoid overlap with fixed sidebar */}
      <div className="md:ml-64 w-full min-h-screen">
         <main className="p-6">{children}</main>
      </div>
    </div>
  );
}