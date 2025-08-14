import {
  AdminClaimsType,
  AdminMenuLinkType,
  AdminMenuType,
  CustomOptionType,
  SiteSelectors,
  UserType,
} from "@/Types/Admin.types";
import {
  ChartColumnStacked,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Newspaper,
  SquarePlus,
} from "lucide-react";

export const AdminUrlList: Record<
  | "Dashboard"
  | "Kategoriler"
  | "KategoriUrlList"
  | "Haberler"
  | "HaberEkle"
  | "Cikis",
  AdminMenuLinkType
> = {
  Dashboard: "/Admin/Dashboard",
  Kategoriler: "/Admin/Categories",
  KategoriUrlList: "/Admin/CategoryUrlList",
  Haberler: "/Admin/News",
  HaberEkle: `/Admin/AddNews`,
  Cikis: `/Admin/Exit`,
} as const;

export const AdmiMenuList: AdminMenuType[] = [
  {
    href: AdminUrlList.Dashboard,
    title: "Dashboard",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    href: AdminUrlList.Kategoriler,
    title: "Kategoriler",
    icon: <ChartColumnStacked className="size-5" />,
  },
  {
    href: AdminUrlList.KategoriUrlList,
    title: "Kategori Url List",
    icon: <LayoutList className="size-5" />,
  },
  {
    href: AdminUrlList.Haberler,
    title: "Haberler",
    icon: <Newspaper className="size-5" />,
  },
  {
    href: AdminUrlList.HaberEkle,
    title: "Haber Ekle",
    icon: <SquarePlus className="size-5" />,
  },

  {
    href: AdminUrlList.Cikis,
    title: "Güvenli Çıkış",
    icon: <LogOut className="size-5" />,
    isFunc: true,
    func: async () => {
      alert("deneme");
    },
  },
];

export const SourceList: Record<string, SiteSelectors> = {
  HUKUKIHABER: {
    name: "HUKUKI HABER",
    newsListSelector: ".card.border-0.h-100 a",
    titleSelector: `h1[itemprop="headline"]`,
    advertisementSelector: `div[data-pagespeed='true']`,
    contentSelector: `div[property='articleBody']`,
    subDescriptionSelector: `h2[itemprop="description"]`,
    baseUrl: "https://www.hukukihaber.net",
    source: "HUKUKIHABER",
    imageSelector: ".card.border-0.mb-3.rounded-0 img",
  },
  ADALETBIZ: {
    name: "ADALET BİZ",
    newsListSelector: ".col-6.col-lg-4 a",
    advertisementSelector: `div[data-pagespeed='true']`,
    contentSelector: `div[property='articleBody']`,
    subDescriptionSelector: `h2[itemprop="description"]`,
    titleSelector: `h1[itemprop="headline"]`,
    baseUrl: "https://www.adaletbiz.com",
    source: "ADALETBIZ",
    imageSelector: ".col-lg-8 .inner img",
  },
} as const;

export const SourceListOptionValues: CustomOptionType[] = Object.keys(
  SourceList,
).map((item) => ({
  title: item,
  value: SourceList[item].name,
}));

export const Users: UserType[] = [
  {
    email: "serkanafsar84@gmail.com",
    password: "1Q2w3E4r!",
    role: "Admin",
  },
  {
    email: "selin@deneme.com",
    password: "123",
    role: "User",
  },
];

export const TestData: AdminClaimsType = {
  Admin: [AdminUrlList.Dashboard, AdminUrlList.Haberler],
  User: [AdminUrlList.Kategoriler],
};
