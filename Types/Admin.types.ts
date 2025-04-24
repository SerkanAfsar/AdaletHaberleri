import { CellContext, ColumnDef, TableMeta } from "@tanstack/react-table";
import { ComponentType } from "react";

export type AdminMenuType = {
  title: string;
  icon?: React.ReactNode;
  href: AdminMenuLinkType;
  isFunc?: boolean;
};

export type AdminMenuLinkType = `/Admin/${string}`;

export type DataTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  fetchUrl: string;
  AddModalComponent: ComponentType<ModalComponentType<T>>;
  title: string;

  metaData?: TableMeta<T>;
};

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

export type EditCellType<T, V> = {
  cellContext: CellContext<T, V>;
  fetchUrl: string;
  ModalComponent: React.ComponentType<ModalComponentType<T>>;
};

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
