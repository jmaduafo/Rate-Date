import React from "react";

type CategoryProps = {
  children: React.ReactNode;
  title: string;
  bgColor: string;
};

function CategoriesSelect({ children, title, bgColor }: CategoryProps) {
  return (
    <div
      className={`flex items-center gap-5 flex-wrap cursor-pointer text-darkText shadow-3xl md:px-6 px-3 my-2 py-4 hover:scale-[.98] duration-500 rounded-xl bg-myBackground ${bgColor}`}
    >
      <div className="p-2 border-dark10 border-[1px] rounded-full">
            {children}
        </div>
        <p className="text-center whitespace-nowrap text-[15px] sm:text-[16px] md:text-[16px]">{title}</p>
    </div>
  );
}

export default CategoriesSelect;
