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

type EmojiProps = {
  handleSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  updateSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  handleDelete?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void;
  selectedEmoji?: string | undefined;
  setSelectedEmoji?: React.Dispatch<React.SetStateAction<string | undefined>>;
  emojiLoading?: boolean;
};
// {handleSubmit, handleEmojiClick}: {handleSubmit?: React.FormEventHandler<HTMLFormElement> | undefined, handleEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void}
function Emoji({
  handleSubmit,
  updateSubmit,
  handleDelete,
  setSelectedEmoji,
  selectedEmoji,
  emojiLoading,
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
            {selectedEmoji ? (
              <p className="text-[1.5vw]">{selectedEmoji}</p>
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
          <form
            onSubmit={() => {
              selectedEmoji ? updateSubmit : handleSubmit;
            }}
          >
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
              {selectedEmoji ? (
                <div className="w-full">
                  <SubmitButton type='submit' title="Save" loading={emojiLoading} />
                  <button onClick={handleDelete} className={`${emojiLoading && 'cursor-not-allowed opacity-80'} mt-3 w-full text-darkText bg-myForeground rounded border-none outline-none px-3 py-2 text-[15px]`}>
                    {emojiLoading ? <Loading classNameColor="border-t-darkText" classNameSize="w-[20px] h-[20px]"/> : 'Delete' }
                  </button>
                </div>
              ) : (
                <SubmitButton type='submit' title="Add Reaction" loading={emojiLoading} />
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Emoji;
