"use client";

import React, { useState, useEffect } from "react";
import Tiptap from "@/components/TipTap";
import CreateEditCard from "@/components/CreateEditCard";
import { ideasCategory, costList } from "@/utils/general/createEditData";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Header2 from "@/components/Header2";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import TagsList from "./TagsList";
import { useRouter } from "next/navigation";
import { ImageProps } from "@/types/type";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Loading";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

function EditDateIdea({ idea_id }: { idea_id: string | string[] }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [imageIdea, setImageIdea] = useState<ImageProps | undefined>();
  const [postedImage, setPostedImage] = useState<string | undefined>();
  const [NSFWSwitch, setNSFWSwitch] = useState(false);

  const [isNext, setIsNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  function goBack() {
    router.back();
  }

  const onImageChange = (e: React.ChangeEvent) => {
    if (
      (e.target as HTMLInputElement).files &&
      (e.target as HTMLInputElement).files?.length
    ) {
      let reader = new FileReader();
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];

      reader.onloadend = (e: any) => {
        setImageIdea &&
          setImageIdea({ imagePreview: e.target.result, file: file });
      };
      reader.readAsDataURL(file as Blob);
    }
  };

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!title.length || !content.length || !cost.length || !category.length) {
      toast({
        title: "Whoops!",
        description: "All entries must not be left empty",
      });
    } else {
      setLoading(true);
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) {
        router.push("/login");
        router.refresh();
      } else {
        if (imageIdea) {
          const { data: storageData, error: storageError } =
            await supabase.storage
              .from("corner")
              .upload(
                authData?.user?.id + "/" + uuidv4(),
                imageIdea?.file as File
              );

          if (storageError) {
            console.log(storageError.message);
          } else {
              const { error } = await supabase.from("corner").update({
                title,
                content,
                date_type: "Date Idea",
                is_mature: NSFWSwitch ?? false,
                cost,
                category,
                location,
                tags: tagArray,
                image: imageIdea
                  ? `https://oevsvjkpdlznvfenlttz.supabase.co/storage/v1/object/public/corner/${storageData?.path}`
                  : null,
              }).eq('id', idea_id)

              if (error) {
                toast({
                  title: "Oh no! Something went wrong",
                  description: error.message,
                });
              } else {
                toast({
                  title: "Success!",
                  description: "Your story was posted successfully!",
                });

                setTitle("");
                setContent("");
                setNSFWSwitch(false);
                setTagArray([]);
                setImageIdea(undefined);

                goBack();
              }
            } 
        } else {
            const { error } = await supabase.from("corner").update({
              title,
              content,
              date_type: "Date Idea",
              is_mature: NSFWSwitch ?? false,
              cost,
              location,
              tags: tagArray,
              image: postedImage ?? null,
            }).eq('id', idea_id)

            if (error) {
              toast({
                title: "Oh no! Something went wrong",
                description: error.message,
              });
            } else {
              toast({
                title: "Success!",
                description: "Your story was posted successfully!",
              });

              setTitle("");
              setContent("");
              setNSFWSwitch(false);
              setTagArray([]);
              setImageIdea(undefined);

              goBack();
            }
        }
      }

      setLoading(false);
    }
  }

  async function setIdeas() {
    const { data, error } = await supabase
      .from("corner")
      .select()
      .eq("id", idea_id);

    if (error) {
      console.log(error);
    } else {
      setTitle(data[0]?.title);
      setContent(data[0]?.content);
      setLocation(data[0]?.location);
      setCategory(data[0]?.category);
      setCost(data[0]?.cost);
      setTagArray(data[0]?.tags);
      setPostedImage(data[0]?.image);
      setNSFWSwitch(data[0]?.is_mature);
    }
  }

  useEffect(() => {
    setIdeas();
  }, []);

  return (
    <div className="mb-6">
      <div className="text-darkText mt-6">
        <Header2 title="Edit Date Idea" />
      </div>
      <form onSubmit={handleUpdate} className="mt-8">
        {isNext ? (
          <>
            <div className="">
              <Tiptap
                placeholder="Write your date idea..."
                title={title}
                description={content}
                setDescription={setContent}
              />
            </div>
            <div className="flex justify-end gap-3 items-center mt-10 px-6">
              <PrimaryButton type="submit">
                {loading ? (
                  <Loading
                    classNameColor="border-t-myForeground"
                    classNameSize="w-5 h-5 rounded-full"
                  />
                ) : (
                  "Update"
                )}
              </PrimaryButton>
              <SecondaryButton actionFunction={goBack} type="button">
                Back
              </SecondaryButton>
            </div>
          </>
        ) : (
          <>
            <CreateEditCard
              title="Title *"
              description="Give a title for this date idea"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                placeholder="Sky Diving in the Alps"
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
              />
            </CreateEditCard>
            <CreateEditCard
              title="Category *"
              description="Select the appropriate ambience for this date"
            >
              <select
                name=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
              >
                {ideasCategory.map((stat) => {
                  return (
                    <option value={stat.value} key={stat.value}>
                      {stat.innerText}
                    </option>
                  );
                })}
              </select>
            </CreateEditCard>
            <CreateEditCard
              title="Location"
              description="Where is the date located? (ex: Paris, France, Madisson Square in New York, etc.)"
            >
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name="location"
                placeholder="New Orleans"
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
              />
            </CreateEditCard>
            <CreateEditCard title="Cost *">
              <select
                name=""
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
              >
                {costList.map((stat) => {
                  return (
                    <option value={stat.value} key={stat.value}>
                      {stat.innerText}
                    </option>
                  );
                })}
              </select>
            </CreateEditCard>
            <CreateEditCard
              title="Add an Image"
              description="Select an image that best encapsulates the date. This field is optional."
            >
              <div className="">
                <div className={`${imageIdea ? "mb-6" : "mb-0"}`}>
                  <label
                    htmlFor="image"
                    className="cursor-pointer text-[14px] px-3 py-1 border-dark10 border-[1px] rounded-lg"
                  >
                    Upload an Image
                  </label>
                  <input
                    type="file"
                    onChange={onImageChange}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    name="image"
                    id="image"
                    className="hidden"
                  />
                </div>
                {imageIdea ? (
                  <div className="w-[70%] object-cover flex-[1]">
                    <Image
                      src={imageIdea?.imagePreview}
                      alt="idea preview"
                      className="w-full h-full rounded-lg"
                      width={1200}
                      height={900}
                    />
                  </div>
                ) : null}
                {postedImage && !imageIdea ? (
                  <div className="w-[70%] object-cover flex-[1]">
                    <Image
                      src={postedImage}
                      alt="posted idea"
                      className="w-full h-full rounded-lg"
                      width={1200}
                      height={900}
                    />
                  </div>
                ) : null}
              </div>
            </CreateEditCard>
            <CreateEditCard
              title="Tags"
              description="Adding tags would improve the visibility of your post."
            >
              <TagsList setArray={setTagArray} array={tagArray} />
            </CreateEditCard>
            {/* NSFW ON OR OFF */}
            <CreateEditCard
              title="Mature?"
              description="Does this date idea require an age range of 21 and above?"
            >
              <div className={`flex items-center gap-3`}>
                <Switch checked={NSFWSwitch} onCheckedChange={setNSFWSwitch} />
                <p className="text-[14px]">{NSFWSwitch ? "Yes" : "No"}</p>
              </div>
            </CreateEditCard>
          </>
        )}
      </form>
      <div className="flex justify-end gap-4 px-8 mt-10">
        <button
          onClick={() => setIsNext(false)}
          disabled={isNext ? false : true}
          className={`${
            isNext
              ? "bg-darkText cursor-pointer"
              : "bg-dark30 cursor-not-allowed"
          } p-2 border-none outline-none rounded-full`}
        >
          <ChevronLeftIcon className="text-myForeground w-7" />
        </button>
        <button
          onClick={() => setIsNext(true)}
          disabled={isNext ? true : false}
          className={`${
            isNext
              ? "bg-dark30 cursor-not-allowed"
              : "bg-darkText cursor-pointer"
          } p-2 border-none outline-none rounded-full`}
        >
          <ChevronRightIcon className="text-myForeground w-7" />
        </button>
      </div>
    </div>
  );
}

export default EditDateIdea;
