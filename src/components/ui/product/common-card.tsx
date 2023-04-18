import { Assets, Tags, User, assets } from "@/services/bucket";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Tag from "./tag";
import { ButtonUnstyled } from "@mui/base";
import { Box } from "@mui/system";
import { Backdrop, Modal } from "../modal/modal";

type CardProps = {
  showTag?: boolean;
  type: string;
  asset: Assets;
  tags?: Tags[];
};

function Card(props: CardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    assets.remove(props.asset._id!).then((_) => router.push("my-assets"));
  };

  return (
    <>
      <div className="rounded-lg max-h-[130px] shadow-card overflow-hidden bg-white px-4 py-6 relative group cursor-pointer">
        {props.type === "integrate" ? (
          <div className="cursor-pointer absolute right-0 text-primary top-0 transition ease-in-out duration-300 translate-x-[85%] group-hover:translate-x-0">
            <span className="rounded-integrate-btn px-5 py-0.5 items-center text-sm flex transition duration-300 text-primary bg-primary-color">
              <ArrowDownTrayIcon className="cursor-pointer h-4 w-4" /> &nbsp;
              integrate
            </span>
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-20">
            <button
              onClick={() => setOpen(true)}
              className="bg-red-500 w-full text-center flex justify-center p-1 rounded-bl-lg"
            >
              <TrashIcon className="text-primary h-6 w-6" />
            </button>
          </div>
        )}
        <div
          onClick={() => router.push(`/item/${props.asset._id}`)}
          className="flex"
        >
          <Image
            className="rounded-lg w-[80px] h-[80px]"
            src={
              props.asset.images! && props.asset.images!?.length! > 0
                ? props.asset.images![0]!
                : (null as unknown as string)
            }
            width={80}
            height={80}
            alt=""
          />
          <div className="w-full pl-4">
            <div className=" text-sm hidden-nowrap	text-ellipsis">
              {props.asset.name}
            </div>
            <div className="mb-4 text-sm font-extralight">
              by &nbsp;
              <a className="text-primary-color">
                {(props.asset.user as unknown as User).author.developer_name!}
              </a>
            </div>
            <div className="flex-center justify-between text-sm">
              <span>${props.asset.price}</span>

              <span className="flex-center text-sm">
                {props.asset.integrated_count}
                <ArrowDownTrayIcon className="cursor-pointer h-4 w-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
        {props.showTag ? (
          <div className="flex justify-end pt-2.5">
            {props.tags?.map((tag) => (
              <Tag key={tag._id!} name={tag.tag} />
            ))}
          </div>
        ) : null}
      </div>
      <Modal
        open={open}
        slots={{ backdrop: Backdrop }}
        onClose={() => setOpen(false)}
      >
        <Box className="bg-white p-16 rounded-md">
          <p className="text-primary-color text-xl">
            Are you sure that you want to delete this Asset?
          </p>
          <div className="flex justify-evenly items-center mt-10">
            <ButtonUnstyled
              className="bg-primary-color  text-white px-4 py-2 rounded-md"
              onClick={() => setOpen(false)}
            >
              Cancel
            </ButtonUnstyled>
            <ButtonUnstyled
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </ButtonUnstyled>
          </div>
        </Box>
      </Modal>
    </>
  );
}
export default Card;
