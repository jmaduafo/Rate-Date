import React from "react";

type CategoryProps = {
  children: React.ReactNode;
  title: string;
  bgColor: string;
};

function CategoriesSelect({ children, title, bgColor }: CategoryProps) {
  return (
    <div
      className={`cursor-pointer text-darkText shadow-md px-[5rem] my-2 py-7 flex justify-center items-center rounded-xl ${bgColor}`}
    >
      <div>
        <div className="flex justify-center">
            {children}
        </div>
        <p className="text-center whitespace-nowrap">{title}</p>
      </div>
    </div>
  );
}

export default CategoriesSelect;
