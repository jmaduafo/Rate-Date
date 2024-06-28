import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ViewDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-homeText50 duration-500 hover:opacity-80 border-none text-darkText rounded-xl py-2 px-5 outline-none">
          View Demo
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Demo</DialogTitle>
          {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
        </DialogHeader>
        <div className="mt-3">
          <iframe
            // className="w-full"
            width="100%"
            src="https://www.youtube.com/embed/8alEA65SNbQ?si=MYtbQ8ku_hE7BceA"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDemo;
