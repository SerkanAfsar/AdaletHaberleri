import AdminContent from "./AdminContent";
import AdminTopSection from "../AdminTopSection";
import AdminTopSearch from "../AdminTopSection/AdminTopSearch";
import AdminTopRight from "../AdminTopSection/AdminTopRight";

export default function AdminContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-auto flex-col overflow-auto overscroll-contain">
      <AdminTopSection className="bor z-10 flex items-center justify-between border-b border-gray-200 px-3 dark:border-gray-800">
        <AdminTopSearch />
        <AdminTopRight />
      </AdminTopSection>
      <AdminContent>{children}</AdminContent>
    </div>
  );
}
