import { Assets } from "@/services/bucket";
import { StarIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
type RatingProps = {
  className?: string;
  score?: number;
  asset: Assets;
  showScore?: boolean;
};
function Rating(props: RatingProps) {
  const [rates, setRates] = useState([0, 0, 0, 0, 0]);
  return (
    <div
      className={`-ml-1 flex justify-between items-center ${props.className}`}
    >
      <div className="flex float-left">
        {rates.map((i, index) => (
          <StarIcon
            className="h-5 w-5"
            key={props.asset._id! + index.toString()}
          />
        ))}
      </div>
      {props.showScore && (
        <span className="font-light ml-1">({props?.score})</span>
      )}
    </div>
  );
}

export default Rating;
