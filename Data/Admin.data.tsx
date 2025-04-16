import { AdminMenuLinkType, AdminMenuType } from "@/Types/Admin.types";
import {
  ChartColumnStacked,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Newspaper,
  SquarePlus,
} from "lucide-react";

export const AdminUrlList: Record<string, AdminMenuLinkType> = {
  Dashboard: "/Admin/Dashboard",
  Kategoriler: "/Admin/Categories",
  KategoriUrlList: "/Admin/CategoryUrlList",
  Haberler: "/Admin/News",
  HaberEkle: `/Admin/AddNews`,
  Cikis: `/Admin/Exit`,
};

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
  },
];
