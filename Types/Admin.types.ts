import { CellContext, ColumnDef } from "@tanstack/react-table";
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
  customList?: CustomOptionType[];
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
  customList?: CustomOptionType[];
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
