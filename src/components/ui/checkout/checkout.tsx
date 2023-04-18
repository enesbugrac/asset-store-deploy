import Divider from "@/components/shared/divider";
import { Assets, Market, market } from "@/services/bucket";
import { ButtonUnstyled } from "@mui/base";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type CheckoutProps = {
  markets: Market[];
};
function Checkout(props: CheckoutProps) {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const filterRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (scrollY > 100) {
        filterRef.current?.classList.remove("translate-y-0");
        filterRef.current?.classList.add("translate-y-16");
        filterRef.current?.classList.add("3xl:translate-y-20");
      } else {
        filterRef.current?.classList.remove("3xl:translate-y-20");
        filterRef.current?.classList.remove("translate-y-16");
        filterRef.current?.classList.add("translate-y-0");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    calculateTotal();
  }, [props.markets]);

  const calculateTotal = () => {
    let total = 0;
    props.markets.map((market) => {
      total = total + (market?.asset as Assets).price!;
    });
    setTotalPrice(total);
  };

  const handlePurchase = async () => {
    const promises = await props.markets.map(async (marketItem) => {
      const newMarketItems = await market.patch({
        _id: marketItem._id!,
        status: "sold",
      });
      return newMarketItems;
    });
    await Promise.all(promises);
    router.push("/my-assets");
  };
  return (
    <div
      ref={filterRef}
      className="block top-0 sticky transition-all duration-500 shadow-card"
    >
      <div className="flex justify-between px-4 pt-4">
        <span>Total Amount</span>
        <span>{totalPrice} USD</span>
      </div>
      <div className="my-3 px-4">
        {props.markets.map((market) => (
          <div
            key={(market?.asset as Assets)._id}
            className="pl-3 flex justify-between font-light"
          >
            <span>{(market?.asset as Assets).name!}</span>
            <span>{(market?.asset as Assets).price!} USD</span>
          </div>
        ))}
      </div>
      <Divider />
      <div className="p-4">
        <ButtonUnstyled
          onClick={handlePurchase}
          className="col-span-12 bg-primary-color w-full rounded-md text-primary text-sm leading-9"
        >
          Checkout
        </ButtonUnstyled>
      </div>
    </div>
  );
}

export default Checkout;
