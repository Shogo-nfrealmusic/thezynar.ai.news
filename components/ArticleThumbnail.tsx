"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  fallback: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function ArticleThumbnail({ src, alt, fallback, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
