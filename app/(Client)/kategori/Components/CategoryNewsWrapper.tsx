import { PropsWithChildren } from "react";

export type CategoryNewsWrapper = PropsWithChildren;
export default function CategoryNewsWrapper({ children }: CategoryNewsWrapper) {
  return (
    <section className="my-6 block w-full">
      <div className="container grid grid-cols-none gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {children}
      </div>
    </section>
  );
}
