import Image from "next/image";
import Divider from "@/components/shared/divider";
import { ButtonUnstyled, FormControlUnstyled } from "@mui/base";
import Label from "@/components/shared/label";
import Input from "@/components/shared/input";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/contexts";
import placeholderImg from "../../assets/imgs/item-placeholder.gif";
import { Author } from "@/interfaces/data";
import storageService from "@/services/storage.service";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Item from "@/components/ui/product/common-card";
import { assets, Assets, User, user } from "@/services/bucket";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import authService from "@/services/auth.service";

export default function Home() {
  const { loading } = useGlobalContext();
  const imageInput = useRef<HTMLInputElement>(null);
  const [author, setAuthor] = useState<Author>();
  const [ownAssets, setOwnAssets] = useState<Assets[]>();

  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    if (!loading) {
      user
        .getAll({
          queryParams: {
            filter: JSON.stringify({
              _id: authService.getUserId(),
            }),
          },
        })
        .then((res) => {
          setAuthor((res as unknown as User)?.author);
        });
      assets
        .getAll({
          queryParams: {
            relation: "true",
            filter: {
              "user._id": authService.getUserId()!,
            },
          },
        })
        .then((res) => setOwnAssets(res as unknown as Assets[]));
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
        storageService.insert(file).then((data: any) => {
          setAuthor({ ...author, thumbnail: data.url });
        });
      }
    }
  }
  function handleSave(e: any) {
    e.preventDefault();
    user.patch({ _id: authService.getUserId()!, author: author }!);
  }
  function onChangeAuthor(e: any) {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  }
  return (
    <div className="container px-4 justify-between mx-auto py-5 lg:max-w-7xl">
      {loading ? (
        <div className="w-full h-500">
          <LoadingSpinner loading />
        </div>
      ) : (
        <>
          <h1 className="page-title">Author Page</h1>
          <Divider />
          <div className="grid md:grid-cols-3 md:gap-5 py-5 grid-cols-1 gap-5">
            <FormControlUnstyled
              onChange={onChangeAuthor}
              className="w-full"
              value={author?.developer_name || ""}
              required
            >
              <Label>Developer Name</Label>
              <Input
                name="developer_name"
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
              onChange={onChangeAuthor}
              className="w-full"
              value={author?.email || ""}
              required
            >
              <Label>Email</Label>
              <Input
                name="email"
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
              onChange={onChangeAuthor}
              className="w-full"
              value={author?.website || ""}
              required
            >
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
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
          </div>
          <div className="grid md:grid-cols-3  md:gap-5 py-5 grid-cols-1 gap-5">
            <div className="h-full flex-center justify-center">
              {author?.thumbnail ? (
                <Image
                  src={author?.thumbnail || ""}
                  height={160}
                  width={160}
                  className="h-40 w-40 rounded-full"
                  alt="thumbnail"
                />
              ) : (
                <Image
                  src={placeholderImg}
                  height={160}
                  width={160}
                  className="h-40 w-40 rounded-full"
                  alt="thumbnail"
                />
              )}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => imageInput.current?.click()}
            >
              <input
                ref={imageInput}
                className="hidden"
                type="file"
                value={imageFile}
                onChange={(e) => {
                  onFileChanged(e);
                }}
              />
              <div className="border rounded-lg border-border--primary-color flex-center flex-col h-full justify-center">
                Upload new thumbnail Image
                <br />
                <CloudArrowUpIcon className="h-6 w-6" />
              </div>
            </div>
            <FormControlUnstyled
              className="h-full flex flex-col align-baseline"
              value={author?.address || ""}
              onChange={onChangeAuthor}
            >
              <Label>Address</Label>
              <Input
                multiline
                name="address"
                className="w-full h-full"
                slotProps={{
                  input: {
                    className:
                      "w-full h-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                  },
                }}
                required
              />
            </FormControlUnstyled>
          </div>
          <div className="grid md:grid-cols-1 h-[300px] md:gap-5 py-5 grid-cols-1 gap-5">
            <FormControlUnstyled
              className="h-full flex flex-col align-baseline "
              value={author?.description || ""}
              onChange={onChangeAuthor}
            >
              <Label>Description</Label>
              <Input
                name="description"
                multiline
                className="w-full h-full"
                slotProps={{
                  input: {
                    className:
                      "w-full h-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                  },
                }}
                required
              />
            </FormControlUnstyled>
          </div>
          <div className="flex justify-center">
            <ButtonUnstyled
              onClick={(e) => handleSave(e)}
              className="hover:bg-primary-color hover:text-secondary-color bg-secondary-color text-primary-color p-2 rounded-md w-20 transition-all "
            >
              Save
            </ButtonUnstyled>
          </div>
          <h1 className="page-title">Uploaded Assets</h1>
          <Divider />
          {ownAssets?.length ? (
            <div className="grid md:grid-cols-3 md:gap-5 py-9 grid-cols-1 gap-5">
              {ownAssets.map((asset) => (
                <Item
                  asset={asset}
                  showTag={false}
                  type="delete"
                  key={asset._id}
                />
              ))}
            </div>
          ) : (
            <div className="p-32">
              <h2 className="text-primary-color text-center text-2xl">
                You don`t have any uploaded asset.
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
