

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 return (
    <div > {/* Sudhu ekta div (ba fragment) diye wrap koro */}
      {children}
    </div>
  );
}
