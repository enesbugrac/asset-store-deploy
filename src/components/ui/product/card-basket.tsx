import IconButton from "@/components/shared/iconButton";
import { useGlobalContext } from "@/contexts";
import { Market, market, Assets } from "@/services/bucket";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

function CardBasket({ item }: { item: Market }) {
  const { setCart, cart, setLoading } = useGlobalContext();
  const handleDeleteItem = () => {
    setLoading(true);
    market.remove(item._id!).then((res) => {
      let newCart = cart.filter((cartItem) => cartItem._id !== item._id);
      setCart(newCart);
      setLoading(false);
    });
  };
  return (
    <div className="rounded-lg max-h-[130px] shadow-card overflow-hidden bg-white px-4 py-6 relative group">
      <div className="flex">
        <Image
          className="rounded-lg w-[80px] h-[80px]"
          width={80}
          height={80}
          src={(item.asset as any).images[0]}
          alt=""
        />
        <div className="w-full pl-4 flex justify-center flex-col">
          <div className="text-sm hidden-nowrap font-medium text-ellipsis">
            {(item.asset as Assets).name}
          </div>
          <div className=" text-sm hidden-nowrap text-ellipsis font-extralight whitespace-nowrap overflow-hidden max-w-lg">
            {(item.asset as Assets).description}
          </div>
        </div>
        <div className="flex-center flex-col justify-center text-primary-color text-xl">
          <p>{(item.asset as Assets).price}$</p>
        </div>
        <div className="flex-center flex-col justify-center">
          <IconButton onClick={handleDeleteItem} className="hover:bg-slate-200">
            <TrashIcon className="h-6 w-6 text-red-500" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
export default CardBasket;
