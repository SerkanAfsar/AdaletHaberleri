"use client";
import React, { createContext, use, useEffect, useState } from "react";

export type AdminContextType = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  registeredOpened: boolean;
  setRegisteredOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [registeredOpened, setRegisteredOpened] = useState<boolean>(true);

  const context: AdminContextType = {
    isOpened,
    setIsOpened,
    registeredOpened,
    setRegisteredOpened,
  };

  useEffect(() => {
    setIsOpened(registeredOpened);
  }, [registeredOpened]);

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}

export const useAdminContext = () => {
  const context = use(AdminContext);
  if (!context) {
    throw new Error("AdminContext Not Defined");
  }
  return context;
};
