import { Market } from "@/interfaces/data";
import { ButtonUnstyled } from "@mui/base";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Rating from "./rating";

function CardBought({ item, className }: { item: Market; className: string }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/item/${item.asset._id}`)}
      className={`${className} rounded-lg max-h-[130px] shadow-card overflow-hidden bg-white px-4 py-6 relative group cursor-pointer`}
    >
      <div className="flex">
        <Image
          className="rounded-lg w-[80px] h-[80px]"
          width={80}
          height={80}
          src={item.asset?.images[0]}
          alt=""
        />
        <div className="w-full pl-4">
          <div className="text-sm hidden-nowrap font-medium text-ellipsis">
            {item.asset.name}
          </div>
          <div className="text-sm hidden-nowrap text-ellipsis">
            Purchased on: {item.date}
          </div>
          <div className=" text-sm hidden-nowrap text-ellipsis font-light">
            Version: {item.asset.latest_version}
          </div>
          <div className=" text-sm hidden-nowrap text-ellipsis font-extralight whitespace-nowrap overflow-hidden max-w-lg">
            {item.asset.description}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <Rating asset={item.asset} score={item.asset.rating_average} />
          <ButtonUnstyled className="col-span-12 bg-primary-color w-full rounded-md text-primary text-sm leading-9">
            Select Project
          </ButtonUnstyled>
        </div>
      </div>
    </div>
  );
}
export default CardBought;
