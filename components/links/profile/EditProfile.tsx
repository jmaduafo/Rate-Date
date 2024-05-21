import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import Loading from "@/components/Loading";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Header4 from "@/components/Header4";
import {
  pronouns,
  sexualOrientation,
  relationshipStatus,
} from "@/utils/general/userFormData";
import { UserDataProps, ImageProps } from "@/types/type";
import Image from "next/image";

type EditProps = {
  userData: UserDataProps[] | undefined;
  loading: boolean;
  setImage?: React.Dispatch<React.SetStateAction<ImageProps | undefined>>;
  image?: ImageProps | undefined;
  updateProfile: React.FormEventHandler<HTMLFormElement>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setBio: React.Dispatch<React.SetStateAction<string | undefined>>;
  bio: string | undefined;
  setPronounsText: React.Dispatch<React.SetStateAction<string | undefined>>;
  pronounsText: string | undefined;
  setOrientation: React.Dispatch<React.SetStateAction<string | undefined>>;
  orientation: string | undefined;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivate: boolean;
  setBirthday: React.Dispatch<React.SetStateAction<string | undefined>>;
  birthday: string | undefined;
  setRelationStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  relationStatus: string | undefined;
};

function EditProfile({
  userData,
  loading,
  updateProfile,
  setImage,
  image,
  setName,
  name,
  setUsername,
  username,
  setBio,
  bio,
  setPronounsText,
  pronounsText,
  setOrientation,
  orientation,
  setIsPrivate,
  isPrivate,
  setBirthday,
  birthday,
  setRelationStatus,
  relationStatus,
}: EditProps) {

  const onImageChange = (e: React.ChangeEvent) => {
    if (
      (e.target as HTMLInputElement).files &&
      (e.target as HTMLInputElement).files?.length
    ) {
      let reader = new FileReader();
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];

      reader.onloadend = (e: any) => {
        setImage && setImage({ imagePreview: e.target.result, file: file });
      };
      reader.readAsDataURL(file as Blob);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="duration-500 hover:opacity-80 border-none text-lightText rounded-xl py-2 px-5 bg-darkText outline-none">
          Edit Profile
        </button>
      </SheetTrigger>
      <SheetContent className="scrollbar border-l-[1px] border-mutedBorder overflow-y-auto">
        <SheetHeader>
          <Header4 title="Edit Profile" />
        </SheetHeader>
        {/* EDIT PROFILE FORM */}
        <div className="flex justify-center items-center">
          <div className="w-[100px] h-[100px]  object-cover mt-4">
            <Image src={image?.imagePreview} alt="" width={500} height={500} className="w-full h-full rounded-full" />
          </div>
        </div>
        <div className="mt-8">
          {userData ? (
            <form className="" onSubmit={updateProfile}>
              <div className="flex items-center gap-3 bg-darkText60 mb-3">
                <label
                  htmlFor="fileUpload"
                  className="shadow-md hover:opacity-75 duration-500 cursor-pointer w-full px-3 py-2 bg-darkText60 text-myForeground rounded-xl border-[1px] border-[#ffffff20]"
                >
                  Upload an Image
                </label>
                {/* <ArrowDownTrayIcon className="w-6 text-myForeground" strokeWidth={1}/> */}
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  onChange={onImageChange}
                />
              </div>
              {/* NAME INPUT */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="name"
                  type="text"
                  className="text-darkText w-full py-1 px-3 rounded-lg outline-none border-none"
                />
              </div>
              {/* USERNAME INPUT */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="username">Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  id="username"
                  type="text"
                  className="text-darkText w-full py-1 px-3 rounded-lg outline-none border-none"
                />
              </div>
              {/* PRONOUNS INPUT */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="pronouns">Pronouns</label>
                <select
                  onChange={(e) => setPronounsText(e.target.value)}
                  value={pronounsText}
                  name="pronouns"
                  id="pronouns"
                  className="text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                >
                  {pronouns.map((noun) => {
                    return (
                      <option key={noun.value} value={noun.value}>
                        {noun.innerText}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* BIO INPUT */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="bio">Bio</label>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  placeholder="Tell us about yourself"
                  id="bio"
                  rows={6}
                  maxLength={250}
                  className="text-darkText tracking-tight py-2 px-3 rounded-lg outline-none border-none"
                ></textarea>
                <div className="flex justify-end">
                  <p className="text-[12px]">
                    {typeof bio === "string" ? bio.length : 0}/250
                  </p>
                </div>
              </div>
              {/* RELATIONSHIP STATUS SELECTOR */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="name">Relationship Status</label>
                <select
                  onChange={(e) => setRelationStatus(e.target.value)}
                  value={relationStatus}
                  name="relationStatus"
                  id="relationStatus"
                  className="text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                >
                  {relationshipStatus.map((noun) => {
                    return (
                      <option key={noun.value} value={noun.value} className="">
                        {noun.innerText}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* SEXUAL ORIENTATION SELECTOR */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="name">Sexual Orientation</label>
                <select
                  onChange={(e) => setOrientation(e.target.value)}
                  value={orientation}
                  name="relationStatus"
                  id="relationStatus"
                  className="text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                >
                  {sexualOrientation.map((noun) => {
                    return (
                      <option key={noun.value} value={noun.value} className="">
                        {noun.innerText}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* BIRTHDAY INPUT */}
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="birthday">Birthday</label>
                <input
                  onChange={(e) => setBirthday(e.target.value)}
                  value={birthday}
                  id="birthday"
                  type="date"
                  className="w-full text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                />
              </div>
              <div className="mt-8">
                <SheetDescription>
                  If private is checked, your wishlists will be hidden from
                  other viewers. Your birthday will also not be shown whether
                  checked or not.
                </SheetDescription>
                <div className="flex justify-end gap-3 items-center mt-4">
                  <Switch
                    checked={isPrivate}
                    onCheckedChange={setIsPrivate}
                    id="private"
                  />
                  <label>Private</label>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-green-700 hover:opacity-70 duration-500 rounded py-2"
                >
                  {loading ? (
                    <Loading
                      classNameColor="border-t-myForeground"
                      classNameSize="w-[30px] h-[30px]"
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div></div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EditProfile;
