import React from "react";

type CategoryProps = {
  children: React.ReactNode;
  title: string;
  bgColor: string;
};

function CategoriesSelect({ children, title, bgColor }: CategoryProps) {
  return (
    <div
      className={`flex items-center gap-5 cursor-pointer text-darkText shadow-md px-6 my-2 py-4 hover:scale-95 duration-500 rounded-xl bg-myBackground ${bgColor}`}
    >
      <div className="p-2 border-dark10 border-[1px] rounded-full">
            {children}
        </div>
        <p className="text-center whitespace-nowrap">{title}</p>
    </div>
  );
}

export default CategoriesSelect;
