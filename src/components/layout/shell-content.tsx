"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

const SearchModal = dynamic(async () => {
  const mod = await import("./search-modal");
  return mod.SearchModal;
}, {
  ssr: false,
  loading: () => null,
});
const CartDrawer = dynamic(async () => {
  const mod = await import("./cart-drawer");
  return mod.CartDrawer;
}, {
  ssr: false,
  loading: () => null,
});
const AIChatbot = dynamic(async () => {
  const mod = await import("../smart/ai-chatbot");
  return mod.AIChatbot;
}, {
  ssr: false,
  loading: () => null,
});

export function ShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const hideUI = pathname.startsWith("/auth/") || pathname.includes("/learn");
  const isHomePage = pathname === "/";

  return (
    <>
      {!hideUI && <Navbar />}
      {!hideUI && <SearchModal />}
      {!hideUI && <CartDrawer />}
      <main className="min-h-screen">{children}</main>
      {!hideUI && !isHomePage && <AIChatbot />}
      {!hideUI && <Footer />}
    </>
  );
}
