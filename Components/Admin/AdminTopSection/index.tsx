import { cn } from "@/Utils";

export default function AdminTopSection({
  children,
  className,
}: {
  className?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "dark:bg-dark-mode sticky inset-0 z-10 h-[76px] w-full shrink-0 grow-0 bg-white p-3",
        className && className,
      )}
    >
      {children}
    </div>
  );
}
