"use client";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type TagsProps = {
  array: string[];
  setArray: React.Dispatch<React.SetStateAction<string[]>>;
};

function TagsList({ array, setArray }: TagsProps) {
  const [tag, setTag] = useState("");

  function handleAdd() {
    if (tag.length && array.length < 6) {
      setArray((prev) => [
        ...new Set([...prev, tag.split(" ").join("").toLowerCase()]),
      ]);
      setTag("");
    }
  }

  function handleDelete(i: number) {
    const filter = array.filter((arr) => arr !== array[i]);
    setArray(filter);
  }

  return (
    <div>
      {array && array.length ? (
        <div className="flex items-center gap-2 mb-6">
          {array.map((arr, i) => {
            return (
              <div
                className="flex items-center gap-2 px-2 py-[2px] rounded-full bg-myAccent text-myForeground"
                key={arr}
              >
                <p className="text-[13px]">{arr}</p>
                <div className="cursor-pointer" onClick={() => handleDelete(i)}>
                  <XMarkIcon className="w-4" strokeWidth={1} />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <div>
        <input
          onChange={(e) => setTag(e.target.value)}
          value={tag}
          type="text"
          className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
        />
        {array.length >= 6 ? (
          <div>
            <p className="text-myWarning text-[12px]">
              You have reached the maximum number of tags
            </p>
          </div>
        ) : null}
        <div>
          <button
            disabled={array.length < 6 ? false : true}
            onClick={handleAdd}
            type="button"
            className={`${
              array.length < 6
                ? "cursor-pointer bg-darkText"
                : "cursor-not-allowed bg-darkText60"
            } py-1 px-4 rounded-lg text-myForeground text-[14px] mt-2`}
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagsList;
