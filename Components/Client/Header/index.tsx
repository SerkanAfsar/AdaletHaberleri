export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky inset-0 z-10 flex w-full flex-col shadow">
      {children}
    </header>
  );
}
