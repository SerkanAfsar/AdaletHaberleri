"use client";
import ReactPaginate from "react-paginate";
import { useParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { useRouter } from "nextjs-toploader/app";
import { envVariables } from "@/Utils";

export type PaginationType = {
  itemCount: number;
};

export default function CategoryPagination({ itemCount }: PaginationType) {
  const router = useRouter();
  const { slug } = useParams();

  const { matched } = useMediaQuery("(max-width:768px)");

  const pageNumber = slug ? Number(slug[2]) || 1 : 1;

  const pathName = usePathname();
  const pageCount = Math.ceil(
    itemCount / envVariables.NEXT_PUBLIC_PAGINATION_ITEM_COUNT,
  );

  const handlePageClick = (event: any) => {
    const routeRoute = pathName.split("/").slice(0, 4).join("/");
    return router.push(`${routeRoute}/${Number(event.selected) + 1}`);
  };

  return (
    <ReactPaginate
      className="container mx-auto mb-10 flex items-center justify-center gap-2"
      breakLabel="..."
      nextLabel={<ChevronRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={matched ? 1 : 5}
      marginPagesDisplayed={matched ? 1 : 5}
      pageCount={pageCount}
      previousLabel={<ChevronLeft />}
      forcePage={pageNumber - 1}
      renderOnZeroPageCount={null}
      pageLinkClassName="size-10 flex justify-center items-center rounded-full cursor-pointer rounded bg-white border border-gray-300 hover:bg-gray-200"
      previousLinkClassName="cursor-pointer"
      nextLinkClassName="cursor-pointer"
      breakLinkClassName="px-4 py-2"
      activeLinkClassName="bg-primary"
    />
  );
}
