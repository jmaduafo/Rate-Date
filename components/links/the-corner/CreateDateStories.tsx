"use client";

import React, { useState } from "react";
import Tiptap from "@/components/TipTap";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import CreateEditCard from "@/components/CreateEditCard";
import Header2 from "@/components/Header2";
import { ImageProps } from "@/types/type";
import Image from "next/image";
import TagsList from "./TagsList";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/components/Loading";

function CreateDateStories() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState("");
  const [isNSFW, setIsNSFW] = useState(false);
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [imageIdea, setImageIdea] = useState<ImageProps | undefined>();
  const [isNext, setIsNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.length || !content.length) {
      toast({
        title: "Whoops!",
        description: "All starred entries must not be left empty",
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
                authData?.user?.id + '/' + uuidv4(),
                imageIdea?.file as File
              );

          if (storageError) {
            console.log(storageError.message);
          } else {
            const { data: userData, error: userError } = await supabase
              .from("users")
              .select("id, username, name, image")
              .eq("id", authData?.user?.id);

            if (userError) {
              toast({
                title: "Whoops, something went wrong!",
                description: userError.message,
              });
            } else {
              const { error } = await supabase.from("corner").insert({
                title,
                content,
                date_type: "Date Story",
                is_nsfw: isNSFW ?? false,
                user: userData[0],
                tags: tagArray,
                image: imageIdea
                  ? `https://oevsvjkpdlznvfenlttz.supabase.co/storage/v1/object/public/corner/${storageData?.path}`
                  : null,
              })

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
                setIsNSFW(false);
                setTagArray([])
                setImageIdea(undefined)

                goBack();
              }
            }
          }
        } else {
          const { data: userData, error: userError } = await supabase
              .from("users")
              .select("id, username, name, image")
              .eq("id", authData?.user?.id);

            if (userError) {
              toast({
                title: "Whoops, something went wrong!",
                description: userError.message,
              });
            } else {
              const { error } = await supabase.from("corner").insert({
                title,
                content,
                date_type: "Date Story",
                is_nsfw: isNSFW ?? false,
                user: userData[0],
                tags: tagArray,
                image: null,
              })

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
                setIsNSFW(false);
                setTagArray([])
                setImageIdea(undefined)

                goBack();
              }
            }
          
        }
      }

      setLoading(false);
    }
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="mb-6">
      <div className="text-darkText mb-8">
        <Header2 title="Add Your Date Story" />
      </div>
      <form onSubmit={handleSubmit}>
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
                  "Publish"
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
              description="Give a title for this date story"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                placeholder="I'm a straight man but I accidentally went on a date with a guy"
                className="text-[14px] lg:w-[70%] md:w-[80%] w-full outline-none border-none rounded-lg py-2 px-5"
              />
            </CreateEditCard>
            <CreateEditCard
              title="Add an Image"
              description="Select an image that best encapsulates the story. This field is optional."
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
                    name="image"
                    id="image"
                    className="hidden"
                  />
                </div>
                {imageIdea && (
                  <div className="w-[70%] object-cover flex-[1]">
                    <Image
                      src={imageIdea?.imagePreview}
                      alt="idea preview"
                      className="w-full h-full rounded-lg"
                      width={1200}
                      height={900}
                    />
                  </div>
                )}
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
              title="NSFW?"
              description="Is this story not safe for work?"
            >
              <div className={`flex items-center gap-3`}>
                <Switch checked={isNSFW} onCheckedChange={setIsNSFW} />
                <p className="text-[14px]">{isNSFW ? "Yes" : "No"}</p>
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

export default CreateDateStories;
