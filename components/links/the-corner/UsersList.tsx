import React from "react";
import Image from "next/image";
import { UserDataProps } from "@/types/type";
import { getInitials } from "@/utils/general/initials";

type User = {
  user: UserDataProps;
};

function UsersList({ user }: User) {
  return (
    <div className="cursor-pointer hover:bg-dark10 duration-500 flex items-center gap-4 py-3 px-2 rounded-xl">
      {user.image && user.name ? (
        <div className="w-[40px] h-[40px] rounded-full bg-gray-300 object-cover">
          <Image
            src={user.image}
            alt={user?.name}
            width={500}
            height={500}
            className="w-full h-full rounded-full"
          />
        </div>
      ) : (
        user?.name && (
          <div className="w-[40px] h-[40px] rounded-full bg-gray-300 flex justify-center items-center">
            <p className="uppercase text-[14px] font-semibold">
              {getInitials(user?.name)}
            </p>
          </div>
        )
      )}
      <div>
        <p className="font-medium">{user?.name}</p>
        <p className="text-[13px] mt-[-5px] tracking-tight text-darkText60">
          @{user?.username}
        </p>
      </div>
    </div>
  );
}

export default UsersList;
