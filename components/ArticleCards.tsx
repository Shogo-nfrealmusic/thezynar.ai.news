import Image from "next/image";
import Link from "next/link";

export function CategoryLabel({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className={`border-t pt-[5px] ${light ? "border-white/20" : "border-[#d2dcd7]"}`}>
      <span className={`text-[11px] font-normal tracking-[0.5px] uppercase leading-[16.9px] ${light ? "text-white" : "text-[#0a8935]"}`}>
        {label}
      </span>
    </div>
  );
}

export function AuthorTime({ author, time, light = false }: { author: string; time: string; light?: boolean }) {
  const cls = light ? "text-[#b5c0bc]" : "text-[#6c7571]";
  return (
    <div className="flex flex-wrap gap-x-1">
      <span className={`text-[13px] leading-[22px] ${cls}`}>{author}</span>
      <span className={`text-[13px] leading-[22px] ${cls}`}>{time}</span>
    </div>
  );
}

export function OverlayCard({
  href, img, category, title, author, time, titleSize = "lg",
}: {
  href: string; img: string; category: string; title: string;
  author: string; time: string; titleSize?: "sm" | "md" | "lg";
}) {
  const titleCls =
    titleSize === "lg" ? "text-[24px] sm:text-[32px] lg:text-[44px]" :
    titleSize === "md" ? "text-[20px] sm:text-[26px] lg:text-[34px]" :
    "text-[16px] sm:text-[20px]";
  return (
    <Link href={href} className="block relative overflow-hidden w-full h-full min-h-[300px] group">
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 gap-3">
        <CategoryLabel label={category} light />
        <h3 className={`text-white font-bold leading-[1.25] tracking-[-0.5px] ${titleCls}`}>{title}</h3>
        <AuthorTime author={author} time={time} light />
      </div>
    </Link>
  );
}

export function ImageCard({
  href, img, category, title, author, time,
}: {
  href: string; img: string; category: string; title: string; author: string; time: string;
}) {
  return (
    <Link href={href} className="group flex flex-col gap-3 border-b border-[#d2dcd7] pb-4">
      <div className="relative overflow-hidden h-[200px] sm:h-[240px] lg:h-[280px]">
        <Image src={img} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col gap-2">
        <CategoryLabel label={category} />
        <h3 className="font-bold text-[#212623] text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.3] tracking-[-0.5px] group-hover:text-[#0a8935] transition-colors">{title}</h3>
        <div className="pt-1"><AuthorTime author={author} time={time} /></div>
      </div>
    </Link>
  );
}

export function TextCard({
  href, category, title, author, time,
}: {
  href: string; category: string; title: string; author: string; time: string;
}) {
  return (
    <Link href={href} className="group flex flex-col gap-2 border-b border-[#d2dcd7] pb-4">
      <CategoryLabel label={category} />
      <h4 className="font-bold text-[#212623] text-[14px] leading-[1.45] tracking-[-0.2px] group-hover:text-[#0a8935] transition-colors">{title}</h4>
      <AuthorTime author={author} time={time} />
    </Link>
  );
}
