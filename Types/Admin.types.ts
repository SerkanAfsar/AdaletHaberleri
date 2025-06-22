import { AdminUrlList } from "@/Data/Admin.data";
import { CellContext, ColumnDef, TableMeta } from "@tanstack/react-table";
import { ComponentType } from "react";

export type AdminMenuType = {
  title: string;
  icon?: React.ReactNode;
  href: AdminMenuLinkType;
  isFunc?: boolean;
  func?: any;
};

export type AdminMenuLinkType = `/Admin/${string}`;

export type DataTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  fetchUrl: string;
  title: string;
  metaData?: TableMeta<T>;
} & (
  | {
      AddModalComponent?: ComponentType<ModalComponentType<T>>;
      addUrl?: never;
    }
  | {
      AddModalComponent?: never;
      addUrl?: string;
    }
);

export type ResponseResult<T> = {
  data?: T | T[] | null;
  success?: boolean;
  error?: string | null;
  statusCode?: number;
  totalCount?: number;
  message?: string;
};

export type ModalComponentType<T> = {
  item?: T;
  setItem?: React.Dispatch<React.SetStateAction<T | undefined>>;
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdated:
    | (() => React.Dispatch<React.SetStateAction<boolean>>)
    | React.Dispatch<React.SetStateAction<boolean>>;
  metaData: TableMeta<T>;
};

export type EditCellType<T, V> = {} & (
  | {
      cellContext: CellContext<T, V>;
      fetchUrl: string;
      ModalComponent?: React.ComponentType<ModalComponentType<T>>;
      forceId?: never;
      forceIdUrl?: never;
      action?: (prevData: any, data: any) => Promise<ResponseResult<any>>;
    }
  | {
      cellContext: CellContext<T, V>;
      fetchUrl: string;
      ModalComponent?: never;
      forceId?: boolean;
      forceIdUrl?: string;
      action?: (prevData: any, data: any) => Promise<ResponseResult<any>>;
    }
);

export type CustomOptionType = {
  title: string;
  value: string;
};

export type SiteSelectors = {
  name: string;
  newsListSelector: string;
  titleSelector: string;
  subDescriptionSelector: string;
  contentSelector: string;
  advertisementSelector: string;
  baseUrl: string;
  source: string;
  imageSelector: string;
};

export type CloudFlareResponseType = {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  };
  success: boolean;
  errors: any[];
  messages: any[];
};

export type ImageUrlType = {
  small: `https://imagedelivery.net/${string}/${string}/Small`;
  medium: `https://imagedelivery.net/${string}/${string}/Medium`;
  large: `https://imagedelivery.net/${string}/${string}/Big`;
  ExtraLarge: `https://imagedelivery.net/${string}/${string}/ExtraLarge`;
};

export type DeleteImageUrlType =
  `https://api.cloudflare.com/client/v4/accounts/${string}/images/v1/${string}`;

export type LoginType = {
  email: string;
  password: string;
};

export type ModuleType = "Kategori" | "KategoriUrl" | "Haberler";
export type ClaimType = "read" | "add" | "update" | "delete";

export type ModuleClaimsTypes = Record<ModuleType, ClaimType[]>;

export type AdminType = "Admin" | "User";

export type AdminClaimsType = Record<
  AdminType,
  (keyof typeof AdminUrlList)[number][]
>;

export type UserType = LoginType & {
  role: AdminType;
};

export type NullableType<T> = {
  [K in keyof T]?: T[K];
};
