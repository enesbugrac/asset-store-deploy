import Input from "@/components/shared/input";
import { FilterParams } from "@/interfaces/data";
import { ButtonUnstyled, FormControlUnstyled } from "@mui/base";
import React, { useEffect, useState } from "react";
import Helpertext from "../helpertext";
import Label from "../label";
import { Radio } from "./radio";
import Slider from "./slider";

const FilterDates = [
  {
    value: "7",
    label: "Last 7 Days",
  },
  {
    value: "30",
    label: "Last 30 Days",
  },
  {
    value: "90",
    label: "Last 90 Days",
  },
  {
    value: "180",
    label: "Last 6 Months",
  },
  {
    value: "365",
    label: "Last 1 Year",
  },
];

type FilterProps = {
  onClick: (filterParams: FilterParams) => void;
  onDelete: () => void;
};

function Filter(props: FilterProps) {
  const [scrollY, setScrollY] = useState(0);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
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

  const toDate = (filterPublishDate: number) => {
    if (filterPublishDate) {
      let date = new Date(Date.now() - 60 * 60 * 24 * filterPublishDate * 1000);
      return date.toISOString();
    } else {
      return "";
    }
  };
  const handleClearFilter = () => {
    props.onDelete();
    setDate("");
    setPrice(0);
    setPublisher("");
  };
  return (
    <div
      ref={filterRef}
      className="block top-0 sticky transition-all duration-500"
    >
      <div className="px-1.5 py-2.5 flex-center justify-between border-b text-sm border-border--primary-color">
        <span>Refine By</span>
        <ButtonUnstyled
          onClick={() => handleClearFilter()}
          className="text-red-500 cursor-pointer transition-all duration-200 rounded-lg hover:bg-gray-100 p-2"
        >
          Clear filter
        </ButtonUnstyled>
      </div>
      <div className="border-b border-border--primary-color">
        <h3 className="px-0 py-2.5 text-lg mx-4 my-0">Pricing</h3>
        <div className="filter-item">
          <Slider
            value={price}
            onChange={(event, value) => setPrice(value as number)}
          />
        </div>
        <div className="filter-item">
          <FormControlUnstyled
            className="w-full"
            value={price}
            onChange={(event) => {
              if (
                parseInt(event.target.value) >= 0 &&
                parseInt(event.target.value) <= 100
              ) {
                setPrice(parseInt(event.target.value));
              }
            }}
            required
          >
            <Label>Max Amount</Label>
            <Input
              type={"number"}
              className="w-full"
              slotProps={{
                input: {
                  className:
                    "w-full rounded-2xl border-solid border transition-colors md:w-full text-xs px-2 py-3 ",
                },
              }}
              required
            />
            <Helpertext />
          </FormControlUnstyled>
        </div>
      </div>
      <div className="border-b border-border--primary-color">
        <h3 className="px-0 py-2.5 text-lg mx-4 my-0">Publish Date</h3>
        <div className="flex-col flex items-start filter-item gap-3">
          {FilterDates.map(({ value, label }, i) => (
            <Radio
              label={label}
              className="flex gap-4"
              key={value}
              checked={value === date}
              value={value}
              name={value}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          ))}
        </div>
      </div>
      <div className="border-b border-border--primary-color">
        <h3 className="px-0 py-2.5 text-lg mx-4 my-0">Publisher</h3>
        <div className="filter-item">
          <FormControlUnstyled
            className="w-full"
            defaultValue=""
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          >
            <Input
              placeholder="Publisher"
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
      </div>
      <div className="border-b border-border--primary-color">
        <div className="filter-item">
          <ButtonUnstyled
            onClick={(e) =>
              props.onClick({ date: toDate(parseInt(date)), price, publisher })
            }
            className="col-span-12 bg-primary-color w-full rounded-md text-primary text-sm leading-9"
          >
            Filter
          </ButtonUnstyled>
        </div>
      </div>
    </div>
  );
}

export default Filter;
