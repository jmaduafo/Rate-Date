import React from "react";

type CategoryProps = {
  children: React.ReactNode;
  title: string;
  bgColor: string;
};

function CategoriesSelect({ children, title, bgColor }: CategoryProps) {
  return (
    <div
      className={`text-darkText shadow-md w-[50px] h-[40px] flex justify-center items-center rounded-xl ${bgColor}`}
    >
      <div>
        <div className="flex justify-center">
            {children}
        </div>
        <p className="text-center">{title}</p>
      </div>
    </div>
  );
}

export default CategoriesSelect;
