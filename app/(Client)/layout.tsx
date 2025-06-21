import Footer from "@/Components/Client/Footer";
import Header from "@/Components/Client/Header";
import HeaderBottomSection from "@/Components/Client/Header/HeaderBottom";
import HeaderMiddleSection from "@/Components/Client/Header/HeaderMiddle";

import HeaderTop from "@/Components/Client/Header/HeaderTop";
import MobileMenu from "@/Components/Client/MobileMenu";

import MobileMenuContext from "@/Contexts/MobileMenuContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MobileMenuContext>
      <Header>
        <HeaderTop />
        <HeaderMiddleSection />
        <HeaderBottomSection />
      </Header>
      <MobileMenu />
      <main>{children}</main>
      <Footer />
    </MobileMenuContext>
  );
}
