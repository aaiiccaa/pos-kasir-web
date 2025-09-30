import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noSidebarRoutes = ["/login", "/register"];
  const showSidebar = !noSidebarRoutes.includes(router.pathname);

  return (
    <div className="flex">
      {showSidebar && (
        <aside className="fixed top-0 left-0 h-full z-50">
          <Sidebar />
        </aside>
      )}
      <main
        className={`flex-1 min-h-screen bg-white p-2 ${
          showSidebar ? "lg:ml-[240px] ml-[60px]" : ""
        }`}
      >
        <Component {...pageProps} />
      </main>
    </div>
  );
}
