import dynamic from "next/dynamic";
import { GetLastNewsByCountService } from "@/Services";
import { GetAllCategoriesFooterCacheService } from "@/CachingServices/Category.CacheService";
const FooterMenuSection = dynamic(() => import("./FooterMenuSection"));

export default async function Footer() {
  return (
    <footer className="bg-secondary w-full py-6">
      <div className="container grid gap-6 lg:grid-cols-4">
        <FooterMenuSection
          service={GetLastNewsByCountService({ count: 5 })}
          className="lg:col-span-1 [&>ul]:list-inside [&>ul]:list-disc"
          title="Son Haberler"
          direction="col"
        />
        <FooterMenuSection
          service={GetAllCategoriesFooterCacheService()}
          className="lg:col-span-3"
          title="KATEGORİLER"
          textClass="text-lg"
        />
      </div>
      <div className="container text-sm text-white">
        <div className="my-6 block h-[1px] w-full bg-white/50"></div>
        <div className="flex w-full items-center justify-center lg:justify-between">
          <span>Adalet Haberleri {new Date().getFullYear()}</span>
          <span>
            Powered By <b className="underline">JesterColony</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
