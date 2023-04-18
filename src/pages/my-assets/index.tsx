import Filter from "@/components/shared/filter/filter";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import ItemBought from "@/components/ui/product/card-bought";
import { useGlobalContext } from "@/contexts";
import { Asset, FilterParams, Options } from "@/interfaces/data";
import authService from "@/services/auth.service";
import { Market, market } from "@/services/bucket";
import { useEffect, useState } from "react";

export default function MyAssets() {
  const { loading } = useGlobalContext();
  const [allMarkets, setAllMarkets] = useState<Market[]>();
  const [search, setSearch] = useState<boolean>();
  useEffect(() => {
    if (!loading) {
      getMarkets();
    }
  }, [loading]);

  const getMarkets = (options?: Options) => {
    setSearch(true);
    market
      .getAll({
        queryParams: options?.queryParams || {
          relation: true,
          filter: {
            "user._id": authService.getUserId()!,
            status: "sold",
          },
        },
      })
      .then((res) => {
        setAllMarkets(res as unknown as Market[]);
      })
      .finally(() => setSearch(false));
  };

  const handleFilter = (filterParams: FilterParams) => {
    setSearch(true);
    let filterJson: any = {};
    filterJson["user._id"] = authService.getUserId();
    filterJson["status"] = "sold";
    if (filterParams?.price! > 0 && filterParams?.price!) {
      filterParams.price = filterParams?.price! + 0.0000001;
      filterJson["asset.price"] = { $lt: filterParams?.price! };
    }

    if (filterParams.date != "" && filterParams.date) {
      filterJson["asset.latest_release_date"] = {
        $gte: `Date(${filterParams.date})`,
      };
    }

    if (filterParams.publisher != "" && filterParams.publisher) {
      filterJson["user.author.developer_name"] = {
        $regex: `${filterParams.publisher}`,
        $options: "si",
      };
    }
    getMarkets({
      queryParams: {
        relation: true,
        filter: filterJson,
      },
    });
  };

  return (
    <div className="container mx-auto grid md:grid-cols-3 py-7 px-5 gap-5 lg:max-w-7xl">
      {loading ? (
        <div className="w-full h-500 col-span-3">
          <LoadingSpinner loading />
        </div>
      ) : (
        <>
          <div className={`grid gap-5 md:col-span-2 md:grid-rows-5`}>
            {!search ? (
              allMarkets?.length! > 0 ? (
                allMarkets?.map((marketItem, index) => (
                  <ItemBought
                    className="row-span-1"
                    key={(marketItem.asset as Asset)._id}
                    item={marketItem}
                  />
                ))
              ) : (
                <div className="flex justify-center w-full col-span-3 py-64">
                  <h2 className="text-primary-color text-center text-2xl">
                    You don`t have any purchased asset.
                  </h2>
                </div>
              )
            ) : (
              <div className="row-span-5">
                <LoadingSpinner loading={search!} />
              </div>
            )}
          </div>
          <div className="md:col-span-1">
            <Filter
              onDelete={() => getMarkets()}
              onClick={(filterParams) => handleFilter(filterParams)}
            />
          </div>
        </>
      )}
    </div>
  );
}
