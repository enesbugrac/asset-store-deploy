import { useRouter } from "next/router";
import Image from "next/image";
import Item from "@/components/ui/product/common-card";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { assets, Assets, Market, market, User } from "@/services/bucket";
import { useGlobalContext } from "@/contexts";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { ButtonUnstyled } from "@mui/base";
import authService from "@/services/auth.service";

export default function ItemId({ asset }: { asset: Assets }) {
  const { loading, user } = useGlobalContext();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [advItems, setAdvItems] = useState<Assets[]>();
  const [isBougth, setIsBougth] = useState<boolean>(false);
  const [onCart, setOnCart] = useState<boolean>(false);
  useEffect(() => {
    if (asset?.images) setSelectedImage(asset.images[0]);
  }, [asset]);
  useEffect(() => {
    if (!loading) {
      assets
        .getAll({
          queryParams: {
            relation: "true",
            limit: 2,
          },
        })
        .then((res) => setAdvItems(res as unknown as Assets[]))
        .catch(console.error);
      if (authService.getUserId()) {
        market
          .getAll({
            queryParams: {
              relation: "true",
              filter: JSON.stringify({
                "user._id": authService.getUserId(),
                "asset._id": asset?._id,
              }),
            },
          })
          .then((res) => {
            if ((res as any as Market[]).length > 0) {
              setOnCart(true);
              if ((res as any as Market[])[0].status == "sold") {
                setIsBougth(true);
              }
            }
          });
      }
    }
  }, [loading, asset?._id]);

  const selectImage = (image: string) => {
    setSelectedImage(image);
  };
  const handleAddToCart = () => {
    market.insert({
      user: authService.getUserId()!,
      asset: asset?._id,
      project_id: "undefined",
    });
    router.push("/card");
  };
  return (
    <div className="container mx-auto grid md:grid-cols-3 py-7 px-5 lg:max-w-7xl">
      {loading ? (
        <div className="w-full h-500 col-span-3">
          <LoadingSpinner loading />
        </div>
      ) : (
        <>
          <div className="md:col-span-2">
            <div className="py-3 px-6 gap-3">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt=""
                  height={500}
                  width={500}
                  className="w-full h-500 object-contain rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-row py-3 gap-3">
              {asset.images?.map((image) => (
                <Image
                  alt=""
                  className="w-100 h-100 object-cover rounded-lg cursor-pointer"
                  onClick={() => selectImage(image)}
                  src={image}
                  key={image}
                  width={100}
                  height={100}
                />
              ))}
            </div>
            <div className="mt-10">
              <h3 className="font-medium text-xl">Description</h3>
              <p className="p-3 break-all">{asset.description}</p>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="grid items-center grid-flow-row auto-rows-max gap-1">
              <div className="col-span-1 mb-0 text-xl">
                {asset.name}
                <span>
                  {" "}
                  by{" "}
                  <span className="text-primary-color">
                    {(asset.user as User)?.author?.developer_name}
                  </span>
                </span>
              </div>

              <div className="col-span-12">
                <div className="text-2xl text-primary-color">
                  {asset.price}$
                </div>
                <span>Taxes/VAT calculated at checkout</span>
              </div>
              <div className="col-span-12 flex-center my-5 gap-1">
                <ArrowPathRoundedSquareIcon className="h-6 w-6 text-primary-color" />
                Refunds - We&apos;ve got you covered
              </div>
              {!user ? (
                <div className="col-span-12">
                  <ButtonUnstyled className="col-span-12 bg-primary-color w-full rounded-md text-primary text-sm leading-9">
                    Login to add cart
                  </ButtonUnstyled>
                </div>
              ) : (
                <div className="col-span-12">
                  {onCart ? (
                    <span className="text-lg">
                      {!isBougth
                        ? "You added to cart. "
                        : "You bought this asset. "}
                      {!isBougth ? (
                        <span>
                          <Link className="text-primary-color" href="/card">
                            Go to your cart.
                          </Link>
                        </span>
                      ) : (
                        <span>
                          <Link
                            className="text-primary-color"
                            href="/my-assets"
                          >
                            Go to your assets.
                          </Link>
                        </span>
                      )}
                    </span>
                  ) : (
                    <ButtonUnstyled
                      className="col-span-12 bg-primary-color w-full rounded-md text-primary text-sm leading-9"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </ButtonUnstyled>
                  )}
                  <p className="col-span-12 text-center my-2 font-light">OR</p>
                  <ButtonUnstyled className="col-span-12 bg-primary-color w-full rounded-md text-primary text-sm leading-9">
                    Integrate
                  </ButtonUnstyled>
                </div>
              )}

              <div className="col-span-12 my-9 mx-0">
                <div className="flex-between-mx10-w-full">
                  <span>License</span>
                  <span className="font-thin">{asset.licence}</span>
                </div>
                <div className="flex-between-mx10-w-full">
                  <span>Latest Version</span>
                  <span className="font-thin">{asset.latest_version}</span>
                </div>
                <div className="flex-between-mx10-w-full">
                  <span>Latest release date</span>
                  <span className="font-thin">
                    {asset.latest_release_date?.toLocaleString()}
                  </span>
                </div>
                <div className="flex-between-mx10-w-full">
                  <span>Support</span>
                  <span className="font-thin">{asset.support}</span>
                </div>
              </div>
              <div className="col-span-12 more-assets">
                <div className="flex-between-mx10-w-full">
                  <span>You might also like</span>
                  <Link href={"/item-list"} className="text-primary-color">
                    see more
                  </Link>
                </div>

                <div className="grid grid-flow-row auto-rows-max gap-9 more-assets-item">
                  {advItems?.map((item) => (
                    <Item
                      key={item?._id}
                      type="integrate"
                      asset={item}
                      showTag={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export async function getStaticPaths() {
  let allAssets = (await assets.getAll({
    queryParams: {
      relation: "true",
    },
  })) as any as Assets[];

  const assetIds = allAssets.map((asset) => ({
    params: { item_id: asset?._id },
  }));
  return {
    paths: assetIds,
    fallback: true,
  };
}
export async function getStaticProps({ params }: { params: any }) {
  let asset: Assets = await assets.get(params.item_id, {
    queryParams: {
      relation: "true",
    },
  });

  return {
    props: { asset: asset },
    revalidate: 10,
  };
}
