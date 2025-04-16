import { ColumnDef } from "@tanstack/react-table";

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
  // deleteApi: (val: ApiActionType) => void;
  // getByIdApi: (id: number) => Promise<ResponseResult<T>>;
  // addItem?: React.ReactNode;
};

export type ResponseResult<T> = {
  data?: T | T[] | null;
  success?: boolean;
  error?: string | null;
  statusCode?: number;
  totalCount?: number;
};
