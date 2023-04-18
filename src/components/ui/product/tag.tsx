import React from "react";
type TagProps = {
  name: string;
};
function Tag(props: TagProps) {
  return (
    <div className="text-secondary bg-secondary-color p-1 rounded-2xl flex-center transition-colors duration-300 hover:text-secondary-lighter">
      <span className="text-xs">{props.name}</span>
    </div>
  );
}

export default Tag;
