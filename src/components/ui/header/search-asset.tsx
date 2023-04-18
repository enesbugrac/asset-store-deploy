import Input, { InputAdornment } from "@/components/shared/input";
import React, { useEffect } from "react";
import { useState } from "react";
import { Assets, assets } from "@/services/bucket";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchAsset() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<Assets[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchAssets = setTimeout(() => {
      setLoading(true);
      assets
        .getAll({
          queryParams: {
            relation: true,
            limit: 3,
            filter: {
              approved: true,
              name: { $regex: `${searchInput}`, $options: "si" },
            },
          },
        })
        .then((res) => setResults(res as unknown as Assets[]))
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(searchAssets);
  }, [searchInput]);
  const handleRoute = (itemId: string) => {
    router.push(`/item/${itemId}`);
  };
  return (
    <div className="relative pl-3 w-[300px]">
      {" "}
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onBlur={(e) => {
          setTimeout(() => {
            setFocus(false);
          }, 200);
        }}
        onFocus={() => setFocus(true)}
        placeholder="Search for Assets"
        endAdornment={
          <InputAdornment>
            {!loading ? (
              <MagnifyingGlassIcon className="h-6 w-6" />
            ) : (
              <LoadingSpinner loading={loading} />
            )}
          </InputAdornment>
        }
        className="transition-colors border-r-transparent rounded w-42 md:w-[300px] -mx-3 text-xs px-3 py-3 focus:outline-none"
      />
      {focus && searchInput && (
        <div className="z-10 absolute rounded-lg md:w-[300px] top-[62px] -mx-3 -mt-3 bg-white w-full flex flex-col  rounded-t-none">
          {results.length > 0 &&
            results.map((asset) => (
              <span
                onClick={(e) => {
                  handleRoute(asset._id!);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                key={asset._id}
              >
                {asset.name}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchAsset;
