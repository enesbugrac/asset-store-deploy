import Filter from "@/components/shared/filter/filter";
import Item from "@/components/ui/product/common-card";
import { useGlobalContext } from "@/contexts";
import { assets, Assets } from "@/services/bucket";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { useState } from "react";
import { FilterParams, Options } from "@/interfaces/data";

export default function ItemList({ allAssets }: { allAssets: Assets[] }) {
  const { loading } = useGlobalContext();
  const [search, setSearch] = useState<boolean>(false);

  const getAssets = (options?: Options) => {
    setSearch(true);
    assets
      .getAll({
        queryParams: options?.queryParams || {
          relation: true,
          filter: {
            approved: true,
          },
        },
      })
      .then((res) => {
        setSearch(false);
      });
  };

  const handleFilter = (filterParams: FilterParams) => {
    setSearch(true);
    let filterJson: any = {};
    if (filterParams?.price! > 0 && filterParams.price) {
      filterParams.price = filterParams.price + 0.0000001;
      filterJson.price = { $lt: filterParams.price };
    }

    if (filterParams.date != "" && filterParams.date) {
      filterJson.latest_release_date = { $gte: `Date(${filterParams.date})` };
    }

    if (filterParams.publisher != "" && filterParams.publisher) {
      filterJson["user.author.developer_name"] = {
        $regex: `${filterParams.publisher}`,
        $options: "si",
      };
    }
    getAssets({
      queryParams: {
        relation: true,
        filter: { approved: true, ...filterJson },
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
        allAssets?.length! > 0 && (
          <>
            <div className="grid gap-2 md:grid-cols-2 md:col-span-2">
              {!search ? (
                allAssets?.map((asset, index) => (
                  <Item asset={asset} type="integrate" key={index} />
                ))
              ) : (
                <div className="col-span-2">
                  <LoadingSpinner loading={search} />
                </div>
              )}
            </div>
            <div className="md:col-span-1">
              <Filter
                onDelete={() => getAssets()}
                onClick={(filterParams) => handleFilter(filterParams)}
              />
            </div>
          </>
        )
      )}
    </div>
  );
}
export async function getStaticProps() {
  const allAssets = await assets.getAll({
    queryParams: {
      relation: "true",
      filter: {
        approved: true,
      },
    },
  });

  return {
    props: {
      allAssets: allAssets,
    },
    revalidate: 10,
  };
}
