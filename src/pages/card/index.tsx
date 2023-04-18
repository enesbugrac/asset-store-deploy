import LoadingSpinner from "@/components/shared/loadingSpinner";
import Checkout from "@/components/ui/checkout/checkout";
import ItemBasket from "@/components/ui/product/card-basket";
import { useGlobalContext } from "@/contexts";
import authService from "@/services/auth.service";
import { Market, market } from "@/services/bucket";
import { useEffect } from "react";

export default function Card() {
  const { loading, cart, setCart } = useGlobalContext();

  useEffect(() => {
    if (!loading) {
      market
        .getAll({
          queryParams: {
            relation: "true",
            filter: JSON.stringify({
              "user._id": authService.getUserId(),
              status: "onCart",
            }),
          },
        })
        .then((res) => setCart(res as unknown as Market[]));
    }
  }, [loading]);

  return (
    <div className="container mx-auto grid md:grid-cols-3 py-7 px-5 gap-5 lg:max-w-7xl">
      {loading ? (
        <div className="w-full h-500 col-span-3">
          <LoadingSpinner loading />
        </div>
      ) : cart?.length ? (
        <>
          <div className="grid gap-5 md:grid-cols-1 md:col-span-2">
            {cart?.map((marketItem, index) => (
              <ItemBasket key={marketItem._id} item={marketItem} />
            ))}
          </div>
          <div className="md:col-span-1">
            <Checkout markets={cart} />
          </div>
        </>
      ) : (
        <div className="flex justify-center w-full col-span-3 py-64">
          <h2 className="text-primary-color text-center text-2xl">
            You don`t have any asset in your cart.
          </h2>
        </div>
      )}
    </div>
  );
}
