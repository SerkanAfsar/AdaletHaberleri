export default function AdminContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-dark-mode block w-full flex-auto border-l border-gray-200 bg-slate-50 p-5 transition-all dark:border-gray-800 dark:text-white">
      {children}
    </div>
  );
}
