"use client";
import { createContext, use, useState } from "react";

type MobileMenuContextType = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileContext = createContext<MobileMenuContextType | undefined>(
  undefined,
);

export default function MobileMenuContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <MobileContext.Provider
      value={{
        isOpened,
        setIsOpened,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
}

export const useMobileMenuContext = () => {
  const context = use(MobileContext);
  if (!context) {
    throw new Error("Mobile Menu Context not provided!");
  }
  return context;
};
