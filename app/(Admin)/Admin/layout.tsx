import AdminAside from "@/Components/Admin/AdminAside";
import AdminContentWrapper from "@/Components/Admin/AdminContent/AdminContentWrapper";
import AdminContextProvider from "@/Contexts/AdminContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminContextProvider>
      <div className="font-outfit flex h-screen w-full items-stretch">
        <AdminAside />
        <AdminContentWrapper>{children}</AdminContentWrapper>
      </div>
    </AdminContextProvider>
  );
}
