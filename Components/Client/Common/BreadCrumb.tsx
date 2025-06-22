import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type BreadCrumbType = {
  title: string;
  url: string;
};
export default function BreadCrumb({ items }: { items: BreadCrumbType[] }) {
  return (
    <section className="bg-breadCrumbBgGray text-black">
      <div className="container">
        <ul className="breadCrumb">
          <li className="breadCrumbItem">
            <Link href={"/"} title="Anasayfa">
              Anasayfa
            </Link>
            <ChevronRight />
          </li>
          {items.map((item, index) => (
            <li key={index} className="breadCrumbItem">
              <Link
                href={item.url}
                title="Anasayfa"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></Link>
              <ChevronRight />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
