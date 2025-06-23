export type CategoryTitleType = {
  title: string;
};
export default function CategoryTitle({ item }: { item: CategoryTitleType }) {
  return (
    <section className="container my-6 flex w-full items-center justify-center">
      <h1 className="font-bold text-black uppercase lg:text-3xl">
        {item.title} Haberleri
      </h1>
    </section>
  );
}
