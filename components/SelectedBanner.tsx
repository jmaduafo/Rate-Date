import React from "react";

type SelectProp = {
  title: string;
  name: string;
  setSelect?: React.Dispatch<React.SetStateAction<string | undefined>>;
  select?: string | undefined; 
};

function SelectedBanner({ title, name, setSelect, select }: SelectProp) {
  return (
    <div
      className={`{${select && select === name ? ' bg-darkText' : 'bg-transparent'} w-fit cursor-pointer border-darkText border-[1.5px] px-4 py-[2px] rounded-full duration-500 group hover:bg-darkText`}
      onClick={() => setSelect && setSelect(name)}
    >
      <p className={`${select && select === name ? 'text-myForeground' : 'text-darkText'} w-fit text-[14px] font-normal group-hover:text-myForeground`}>{title}</p>
    </div>
  );
}

export default SelectedBanner;
