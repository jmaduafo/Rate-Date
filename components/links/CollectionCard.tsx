import React from "react";

function CollectionCard({
  title,
  classNameBgColor,
}: {
  title: string;
  classNameBgColor: string;
}) {
  return (
    <div
      className={`cursor-pointer rounded-xl w-full h-[10vh] ${classNameBgColor} flex justify-center items-center`}
    >
      <p
        className={`${
          classNameBgColor === "bg-white" ||
          classNameBgColor === "bg-[#fff]" ||
          classNameBgColor === "bg-[#ffffff]"
            ? "text-darkText"
            : "text-myForeground"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

export default CollectionCard;
