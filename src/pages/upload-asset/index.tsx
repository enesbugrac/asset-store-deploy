import Divider from "@/components/shared/divider";
import Input from "@/components/shared/input";
import Label from "@/components/shared/label";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import { CustomSelect, StyledOption } from "@/components/ui/select/select";
import { useGlobalContext } from "@/contexts";
import { ButtonUnstyled, FormControlUnstyled } from "@mui/base";
import { useEffect, useRef, useState } from "react";
import { Assets, assets, Tags, tags } from "@/services/bucket";
import authService from "@/services/auth.service";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import storageService from "@/services/storage.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function UploadAsset() {
  const { loading, user } = useGlobalContext();
  const router = useRouter();
  const [processSelected, setProcessSelected] = useState<boolean | undefined>(
    undefined
  );
  const [update, setUpdate] = useState<boolean | undefined>(undefined);
  const [assetSelected, setAssetSelected] = useState<boolean | undefined>(
    undefined
  );

  const [imageUpload, setImageUpload] = useState<boolean | undefined>(
    undefined
  );
  const selectedAsset = useFormik<Assets>({
    initialValues: {
      name: "",
      price: 0,
      git_url: "",
      compatible_with: "",
      description: "",
      images: [],
      tags: [],
      licence: "",
      latest_version: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      git_url: Yup.string().required("Required"),
      compatible_with: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      images: Yup.array()
        .min(1, "Upload at least 1 image.")
        .required("Required"),
      tags: Yup.array().min(1, "Select at least 1 tag.").required("Required"),
      licence: Yup.string().required("Required"),
      latest_version: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (update) {
        assets
          .patch({ ...values!, _id: values._id! })
          .catch(console.error)
          .then((_) => router.push("author"));
        return;
      }

      assets
        .insert({ ...values!, user: user._id })
        .catch(console.error)
        .then((_) => router.push("author"));
    },
  });
  const [allAssets, setAllAssets] = useState<Assets[]>([]);
  const [allTags, setAllTags] = useState<Tags[]>([]);
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) {
      assets
        .getAll({
          queryParams: {
            relation: "true",
            filter: {
              "user._id": authService.getUserId()!,
              approved: true,
            },
          },
        })
        .then((res) => setAllAssets(res as unknown as Assets[]));
      tags.getAll().then((res) => setAllTags(res as unknown as Tags[]));
    }
  }, [loading]);

  function onFileChanged(e: any) {
    let is_image = true;
    let file;
    const files = e.target.files;

    if (files.length > 0 && files) {
      Array.prototype.forEach.call(files, (file) => {
        if (file.type.match(/image\/*/) == null) {
          is_image = false;
          return;
        }
      });

      if (is_image == true) {
        file = files[0];
        setImageUpload(true);
        let images = selectedAsset.values.images || [];
        storageService.insert(file).then((data: any) => {
          images.push(data.url);
          selectedAsset.setFieldValue("images", images);
          setImageUpload(false);
        });
      }
    }
  }

  return (
    <div className="container px-4 justify-between mx-auto py-5 lg:max-w-7xl">
      {loading ? (
        <div className="w-full h-500">
          <LoadingSpinner loading />
        </div>
      ) : (
        <>
          <h1 className="page-title">Upload/Update An Asset</h1>
          <Divider />
          {!processSelected ? (
            allAssets.length > 0 ? (
              <div className="container mx-auto grid md:grid-cols-2 3xl:py-24 py-10 px-5 gap-5 lg:max-w-7xl">
                <div
                  className="upload-card"
                  onClick={(e) => {
                    setUpdate(true);
                    setProcessSelected(true);
                  }}
                >
                  <span className="upload-card-title">
                    Update an existing asset
                  </span>
                </div>
                <div
                  className="upload-card"
                  onClick={(e) => {
                    setUpdate(false);
                    setProcessSelected(true);
                  }}
                >
                  <span className="upload-card-title">Upload a new asset</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center 3xl:py-24 py-10 px-5">
                <div
                  className="upload-card w-1/2"
                  onClick={(e) => {
                    setUpdate(false);
                    setProcessSelected(true);
                  }}
                >
                  <span className="upload-card-title">Upload a new asset</span>
                </div>
              </div>
            )
          ) : (
            <div className="py-10">
              {typeof update !== "undefined" &&
                (allAssets ? (
                  <>
                    {update && (
                      <CustomSelect
                        label="Choose an Asset"
                        className="w-full"
                        onChange={(e: any, newValue: any) => {
                          setAssetSelected(true);
                          selectedAsset.setValues(newValue);
                        }}
                      >
                        {allAssets.map((asset) => (
                          <StyledOption
                            className="w-full"
                            key={asset._id}
                            value={asset}
                          >
                            {asset.name}
                          </StyledOption>
                        ))}
                      </CustomSelect>
                    )}
                    {((update && assetSelected) || !update) && (
                      <form onSubmit={selectedAsset.handleSubmit}>
                        <div className=" grid md:grid-cols-2 px-3 py-6 gap-5">
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.name || ""}
                            required
                          >
                            <Label>Asset Name</Label>
                            <Input
                              name="name"
                              id="name"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.latest_version || ""}
                            required
                          >
                            <Label>Asset Version</Label>
                            <Input
                              id="latest_version"
                              name="latest_version"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                              required
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.git_url || ""}
                            required
                          >
                            <Label>Git URL of Asset</Label>
                            <Input
                              name="git_url"
                              id="git_url"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.compatible_with || ""}
                            required
                          >
                            <Label>Compatible with</Label>
                            <Input
                              name="compatible_with"
                              id="compatible_with"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.support || ""}
                            required
                          >
                            <Label>Support</Label>
                            <Input
                              name="support"
                              id="support"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.licence || ""}
                          >
                            <Label>Licence</Label>
                            <Input
                              name="licence"
                              id="licence"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.price || 0}
                            required
                          >
                            <Label>Price</Label>
                            <Input
                              name="price"
                              id="price"
                              type="number"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                          <FormControlUnstyled
                            onChange={selectedAsset.handleChange}
                            className="w-full"
                            value={selectedAsset.values.description || ""}
                            required
                          >
                            <Label>Description</Label>
                            <Input
                              name="description"
                              id="description"
                              type="text"
                              className="w-full"
                              slotProps={{
                                input: {
                                  className:
                                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                                },
                              }}
                            />
                          </FormControlUnstyled>
                        </div>
                        <CustomSelect
                          multiple
                          defaultValue={selectedAsset.values.tags as Tags[]}
                          label="Select related tags"
                          onChange={(e: any, newValue: any) => {
                            selectedAsset.setFieldValue("tags", newValue);
                          }}
                          className="w-full"
                        >
                          {allTags.map((tag) => (
                            <StyledOption key={tag._id} value={tag._id}>
                              {tag.tag}
                            </StyledOption>
                          ))}
                        </CustomSelect>
                        <div
                          className={`${
                            selectedAsset.values.images?.length === 6
                              ? "bg-red-400"
                              : "bg-slate-300 hover:bg-secondary-color"
                          } ${
                            imageUpload ? "cursor-none" : "cursor-pointer"
                          }   rounded-lg  py-8 my-8 transition-all flex-center flex-col`}
                          onClick={() => {
                            if (
                              selectedAsset.values.images?.length !== 6 &&
                              !imageUpload
                            ) {
                              imageInput.current?.click();
                            }
                          }}
                        >
                          <input
                            ref={imageInput}
                            className="hidden"
                            type="file"
                            onChange={(e) => {
                              onFileChanged(e);
                            }}
                          />
                          <span className="text-md text-center">
                            Upload images here.
                            <span className="block text-sm">
                              (Minimum 1, maximum 6 images accepted)
                            </span>
                            {imageUpload ? (
                              <div className="text-md text-center">
                                <LoadingSpinner loading={imageUpload} />
                              </div>
                            ) : (
                              <>
                                <span>
                                  {selectedAsset.values.images?.length || "0"} /
                                  6
                                </span>
                              </>
                            )}
                          </span>
                        </div>
                        <div className="text-center flex flex-wrap justify-center mb-6">
                          {selectedAsset.values.images?.map((image: string) => (
                            <div
                              key={image}
                              className="relative float-left w-[280px] h-[280px] object-cover m-1 group text-center"
                            >
                              <Image
                                src={image}
                                alt={image}
                                className="rounded mb-3 float-left block object-cover w-[280px] h-[280px] group-hover:opacity-50"
                                width={280}
                                height={280}
                              />
                              <button
                                className="absolute transition-all duration-300 p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-red-500 border-none text-center inline-block opacity-0 group-hover:opacity-100"
                                onClick={() => {
                                  let images =
                                    selectedAsset.values.images?.filter(
                                      (imageUrl: string) => image !== imageUrl
                                    );
                                  selectedAsset.setFieldValue("images", images);
                                }}
                              >
                                <XMarkIcon className="h-8 w-8" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center">
                          <ButtonUnstyled
                            type="submit"
                            disabled={
                              !selectedAsset.dirty || !selectedAsset.isValid
                            }
                            className={`${
                              !(!selectedAsset.dirty || !selectedAsset.isValid)
                                ? "cursor-pointer hover:bg-primary-color hover:text-secondary-color bg-secondary-color text-primary-color p-2 rounded-md w-30 transition-all"
                                : null
                            }`}
                          >
                            {update ? "Update Asset" : "Upload Asset"}
                          </ButtonUnstyled>
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center w-full col-span-3 py-64">
                    <h2 className="text-primary-color text-center text-2xl">
                      You don`t have any uploaded asset.
                    </h2>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
