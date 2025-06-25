import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../../Components/Client/Footer"));
const Header = dynamic(() => import("../../Components/Client/Header"));
const HeaderBottomSection = dynamic(
  () => import("../../Components/Client/Header/HeaderBottom"),
);
const HeaderMiddleSection = dynamic(
  () => import("../../Components/Client/Header/HeaderMiddle"),
);
const HeaderTop = dynamic(
  () => import("../../Components/Client/Header/HeaderTop"),
);
const MobileMenu = dynamic(() => import("../../Components/Client/MobileMenu"));

import MobileMenuContext from "@/Contexts/MobileMenuContext";
import HeaderTopWrapper from "@/Components/Client/Header/HeaderTop/HeaderTopWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <main>{children}</main>
      <Footer />
    </MobileMenuContext>
  );
}
