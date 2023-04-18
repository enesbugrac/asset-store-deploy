import { Assets } from "@/services/bucket";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Rating from "./rating";

function CardFeatured({ asset }: { asset: Assets }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/item/${asset._id}`)}
      className="shadow-card-featured flex relative group cursor-pointer overflow-hidden"
    >
      <div className="relative w-full">
        <Image
          className="duration-0.25s w-full h-[250px] object-contain blur-bl-1 group-hover:blur-0 group-hover:scale-105"
          src={asset?.images! && asset?.images[0]!}
          alt=""
          width={250}
          height={250}
        />

        <div className="w-full h-full absolute duration-0.25s top-auto bottom-0 rounded-lg opacity-50 bg-[linear-gradient(#bfbbdd,#6c6c6c)] group-hover:opacity-0"></div>
      </div>

      <div className="absolute text-sm w-full duration-0.25s bg-card-featured-metadata bottom-0 left-0 p-5 group-hover:hidden text-primary">
        <div className="font-semibold text-ellipsis hidden-nowrap">
          {asset.name}
        </div>
        <div className="text-ellipsis hidden-nowrap">
          by <span> {asset.name}</span>
        </div>
        <div className="font-bold text-md mt-5 mb-2">${asset.price}</div>
        <Rating asset={asset} className="mt-1 mb-3" />
        <div className="sales">{asset.sales} Sales</div>
      </div>
    </div>
  );
}
export default CardFeatured;
