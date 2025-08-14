import Footer from "@/Components/Client/Footer";
import Header from "@/Components/Client/Header";
import HeaderBottomSection from "@/Components/Client/Header/HeaderBottom";
import HeaderMiddleSection from "@/Components/Client/Header/HeaderMiddle";
import HeaderTop from "@/Components/Client/Header/HeaderTop";
import HeaderTopWrapper from "@/Components/Client/Header/HeaderTop/HeaderTopWrapper";
import MobileMenu from "@/Components/Client/MobileMenu";
import MobileMenuContext from "@/Contexts/MobileMenuContext";

export default function NotFound() {
  return (
    <MobileMenuContext>
      <Header>
        <HeaderTop>
          <HeaderTopWrapper />
        </HeaderTop>
        <HeaderMiddleSection />
        <HeaderBottomSection />
      </Header>
      <MobileMenu />
      <main className="flex h-full w-full items-center justify-center">
        <section className="flex min-h-60 flex-col items-center justify-center gap-3 font-bold">
          <h1 className="text-3xl">ARADIĞINIZ SAYFA BULUNAMADI</h1>
          <h2 className="text-primary text-2xl">404 NOT FOUND</h2>
        </section>
      </main>
      <Footer />
    </MobileMenuContext>
  );
}
