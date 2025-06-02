import Footer from "@/Components/Client/Footer";
import Header from "@/Components/Client/Header";
import HeaderBottomSection from "@/Components/Client/Header/HeaderBottomSection";
import HeaderMiddleSection from "@/Components/Client/Header/HeaderMiddleSection";
import HeaderTop from "@/Components/Client/Header/HeaderTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <HeaderTop />
        <HeaderMiddleSection />
        <HeaderBottomSection />
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
