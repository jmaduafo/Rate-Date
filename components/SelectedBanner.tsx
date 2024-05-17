import React from "react";

type SelectProp = {
  title: string;
  setSelect?: React.Dispatch<React.SetStateAction<string | undefined>>;
  select?: string | undefined; 
};

function SelectedBanner({ title, setSelect, select }: SelectProp) {
    console.log(select, title)
  return (
    <div
      className={`{${select && select === title ? ' bg-darkText' : 'bg-transparent'} cursor-pointer border-darkText border-[1.5px] px-4 py-[2px] rounded-full duration-500 group hover:bg-darkText`}
      onClick={() => setSelect && setSelect(title)}
    >
      <p className={`${select && select === title ? 'text-myForeground' : 'text-darkText'} text-[14px] font-normal group-hover:text-myForeground`}>{title}</p>
    </div>
  );
}

export default SelectedBanner;
