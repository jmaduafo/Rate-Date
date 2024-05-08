import React, { MouseEventHandler } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import Header4 from "@/components/Header4";
import SubmitButton from "@/components/SubmitButton";
import Picker, { EmojiClickData } from "emoji-picker-react";
import Loading from "@/components/Loading";
import { ReactionDataProps } from "@/types/type";

type EmojiProps = {
  handleSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
//   updateSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
//   handleDelete?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void;
  selectedEmoji?: string | undefined;
  setSelectedEmoji?: React.Dispatch<React.SetStateAction<string | undefined>>;
  emojiLoading?: boolean;
  emojiData?: ReactionDataProps | undefined;
};
// {handleSubmit, handleEmojiClick}: {handleSubmit?: React.FormEventHandler<HTMLFormElement> | undefined, handleEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void}
function Emoji({
  handleSubmit,
//   updateSubmit,
//   handleDelete,
  setSelectedEmoji,
  selectedEmoji,
  emojiLoading,
  emojiData,
}: EmojiProps) {
  function handleEmojiClick(emojiData: EmojiClickData, event: MouseEvent) {
    if (setSelectedEmoji) {
      setSelectedEmoji(emojiData?.emoji);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {/* THE EMOJI TEXT RENDERING IN DASHBOARD */}
          <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full shadow-md hover:bg-myBackgroundMuted duration-500 cursor-pointer">
            {emojiData && emojiData?.reaction ? (
              <p className="text-[1.5vw]">{emojiData?.reaction}</p>
            ) : (
              <PlusIcon className="w-5 text-darkText" />
            )}
          </div>
        </DialogTrigger>
        {/* DIALOG POP UP */}
        <DialogContent>
          <DialogHeader>
            <Header4 title="Pick Your Reaction" />
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {selectedEmoji ? (
              <div className="flex justify-center items-center">
                <p className="text-[3vw]">{selectedEmoji}</p>
              </div>
            ) : null}
            <div className="w-full mt-5 flex justify-center items-center">
              <Picker
                reactionsDefaultOpen={true}
                onEmojiClick={handleEmojiClick}
                width={"100%"}
              />
            </div>
            <DialogFooter className="mt-7">
              <SubmitButton type="submit" title="Save" loading={emojiLoading} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Emoji;
