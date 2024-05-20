import React, { Fragment } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  LightBulbIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Speech } from "lucide-react";
import CategoriesSelect from "./CategoriesSelect";
import CollectionCard from "@/components/CollectionCard";

function MainLeftBar() {
  const categories = [
    {
      title: "Date Ideas",
      icon: <LightBulbIcon className="text-darkText w-9" />,
      bgColor: "bg-[#E0A85440]",
    },
    {
      title: "Date Stories",
      icon: <BookOpenIcon className="text-darkText w-9" />,
      bgColor: "bg-[#96D6BB40]",
    },
    {
      title: "NSFW",
      icon: <ExclamationTriangleIcon className="text-darkText w-9" />,
      bgColor: "bg-[#C82B3D40]",
    },
    {
      title: "Advice",
      icon: <Speech size={36} className="text-darkText" />,
      bgColor: "bg-[#5C7ED640]",
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-2 text-darkText bg-myForeground rounded-full py-2 px-3 md:w-[45%] w-full">
        <MagnifyingGlassIcon className="w-6 text-darkText" strokeWidth={1} />
        <input
          placeholder="Search"
          className="outline-none border-none bg-transparent w-full text-[14px]"
        />
      </div>
      <section className="w-full mt-4">
        <div className="horizontal md:max-w-[56vw] w-full overflow-x-auto">
          <div className="w-fit flex gap-3 flex-nowrap px-1">
            {categories.map((cat) => {
              return (
                <Fragment key={cat.title}>
                  <CategoriesSelect
                    title={cat.title}
                    bgColor={`${cat.bgColor}`}
                  >
                    {cat.icon}
                  </CategoriesSelect>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mt-4">
        <div className="">
          {[0, 1, 2, 3, 4, 5].map((cat) => {
            return (
              <Fragment key={cat}>
                <CollectionCard/>
              </Fragment>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default MainLeftBar;
