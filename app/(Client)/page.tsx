import { envVariables } from "@/Utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const LastNewsSection = dynamic(
  () => import("../../Components/Client/Sections/LastNewsSection"),
);
const NewsCategorySection = dynamic(
  () => import("../../Components/Client/Sections/NewsCategorySection"),
);
const HeroSlider = dynamic(
  () => import("../../Components/Client/Sections/HeroSliderSection"),
);

const MostReaded = dynamic(
  () => import("../../Components/Client/Sections/MostReadedSection"),
);

export const metadata: Metadata = {
  title: "Güncel Hukuk Haberleri | Adalet Haberleri",
  description: "Güncel Hukuk Haberleri | Adalet Haberleri",
  robots: "index,follow",
  publisher: "Adalet Haberleri",
  authors: [
    {
      name: "Adalet Haberleri",
      url: envVariables.NEXT_PUBLIC_BASE_URL,
    },
  ],

  openGraph: {
    title: "Güncel Hukuk Haberleri | Adalet Haberleri",
    description: "Güncel Hukuk Haberleri | Adalet Haberleri",
    url: envVariables.NEXT_PUBLIC_BASE_URL,
    locale: "tr_TR",
    siteName: "Adalet Haberleri",
    authors: ["Adalet Haberleri"],
    emails: ["info@adalethaberleri.com"],
  },

  twitter: {
    card: "summary",
    description: "Güncel Hukuk Haberleri | Adalet Haberleri",
    title: "Güncel Hukuk Haberleri | Adalet Haberleri",
    creator: "@adalethaberleri",
  },

  alternates: {
    canonical: envVariables.NEXT_PUBLIC_BASE_URL,
  },
};

export default async function Page() {
  return (
    <>
      <h1 className="hidden">Güncel Adalet ve Hukuk Haberleri</h1>
      <h2 className="hidden">Güncel Hukuk Haberleri</h2>
      <HeroSlider />
      <NewsCategorySection />
      <MostReaded />
      <LastNewsSection />
    </>
  );
}

export const revalidate = 10;
