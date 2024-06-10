import React, { Fragment, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SecondaryButton from "@/components/SecondaryButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

function FilterSort({ setSort, sort }: { setSort: React.Dispatch<SetStateAction<string | undefined>>; sort  : string | undefined;}) {
  const sorts = [
    {
      title: "Sort By Name (A - Z)",
      action: null,
    },
    {
      title: "Sort By Name (Z - A)",
      action: null,
    },
    {
      title: "Sort By Rating (0 - 10)",
      action: null,
    },
    {
      title: "Sort By Rating (10 - 0)",
      action: null,
    },
    {
      title: "Sort By Status (A - Z)",
      action: null,
    },
    {
      title: "Sort By Status (Z - A)",
      action: null,
    },
    {
      title: "Reset",
      action: null,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <SecondaryButton className="flex justify-center items-center px-2">
            <AdjustmentsHorizontalIcon strokeWidth={1} className="w-6" />
          </SecondaryButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sorts.map((sor) => {
          return (
            <Fragment key={sor.title}>
              <DropdownMenuItem className={`${sort === sor.title ? 'bg-[#ffffff30]' : 'bg-transparent'} cursor-pointer`} onClick={() => setSort && setSort(sor.title)}>{sor.title}</DropdownMenuItem>
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterSort;
