export type AdminMenuType = {
  title: string;
  icon?: React.ReactNode;
  href: AdminMenuLinkType;
  isFunc?: boolean;
};

export type AdminMenuLinkType = `/Admin/${string}`;
