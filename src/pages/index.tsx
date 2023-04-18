import ItemFeatured from "@/components/ui/product/card-featured";
import Item from "@/components/ui/product/common-card";
import Image from "next/image";
import heroBg from "../assets/imgs/hero-section-bg.avif";
import { useGlobalContext } from "../contexts";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { assets, Assets, Tags } from "@/services/bucket";

export default function Home({
  allAssets,
  featuredAssets,
}: {
  allAssets: Assets[];
  featuredAssets: Assets[];
}) {
  const { loading } = useGlobalContext();

  return (
    <div className="container px-4 justify-between mx-auto py-5 lg:max-w-7xl">
      <div className="flex-center rounded-lg h-[600] justify-center md:mx-auto md:px-32 bg-black">
        <Image alt="" className="object-scale-down h-full" src={heroBg} />
      </div>
      {loading ? (
        <div className="w-full h-48">
          <LoadingSpinner loading />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 md:gap-5 py-5 grid-cols-1 gap-5">
            {featuredAssets?.map((asset) => (
              <div key={asset._id} className="md:col-span-1">
                <ItemFeatured asset={asset} />
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 md:gap-5 py-5 grid-cols-1 gap-5">
            {allAssets?.map((item, index) => (
              <Item
                asset={item}
                tags={item.tags as unknown as Tags[]}
                key={index}
                type="integrate"
                showTag={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const featuredAssets = await assets.getAll({
    queryParams: {
      relation: "true",
      sort: '{"_id":-1}',
      limit: "2",
      filter: {
        approved: true,
      },
    },
  });
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
      featuredAssets: featuredAssets,
      allAssets: allAssets,
    },
    revalidate: 10,
  };
}
