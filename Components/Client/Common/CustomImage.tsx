import { ImageUrlType } from "@/Types";
import { GetImageUrlCdn } from "@/Utils";
import Image from "next/image";

export type CustomImageProps = {
  title: string;
  width?: number;
  height?: number;
  keyField: keyof ImageUrlType;
  imageId: string | null;
} & Omit<React.ComponentPropsWithoutRef<typeof Image>, "src" | "alt" | "">;

export default function CustomImage({
  height,
  imageId,
  keyField,
  title,
  width,
  ...rest
}: CustomImageProps) {
  const newsImageSrc = GetImageUrlCdn(imageId);

  const imgSource =
    newsImageSrc[keyField as keyof typeof newsImageSrc] ?? newsImageSrc;
  if (rest.fill) {
    return (
      <Image alt={title || "Adalet Haberleri"} src={imgSource} {...rest} />
    );
  }
  return (
    <Image
      alt={title || "Adalet Haberleri"}
      src={imgSource}
      width={width}
      height={height}
      {...rest}
    />
  );
}
