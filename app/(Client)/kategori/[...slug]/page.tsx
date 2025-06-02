export default async function Page({
  params,
}: {
  params: { slug: Promise<string[]> };
}) {
  const { slug } = await params;

  return <div>Kategori</div>;
}
