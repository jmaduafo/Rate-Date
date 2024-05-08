import React from "react";
import Loading from "./Loading";

function SubmitButton({
  title,
  loading,
  type,
}: {
  title: string;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}) {
  return (
    <button
      type={type}
      className="hover:opacity-80 duration-500 w-full text-myForeground bg-green-700 rounded border-none outline-none px-3 py-2 text-[15px]"
    >
      {loading ? (
        <Loading
          classNameColor="border-t-myForeground"
          classNameSize="w-[25px] h-[25px]"
        />
      ) : (
        title
      )}
    </button>
  );
}

export default SubmitButton;
