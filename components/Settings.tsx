"use client";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";
import Loading from "./Loading";

function Settings() {
  const [email, setEmail] = useState<string | undefined>();
  const [id, setID] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  const setting = [
    {
      title: "Change email",
      additionalInfo: email,
      action: null,
    },
    {
      title: "Change password",
      additionalInfo: null,
      action: null,
    },
    {
      title: "Delete account",
      additionalInfo: null,
      action: null,
    },
  ];

  async function getUserEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      router.push("/login");
      router.refresh();
    } else {
      setEmail(data?.user?.email);
      setID(data?.user?.id);
    }

    setLoading(false);
  }

  useEffect(() => {
    getUserEmail();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="md:flex items-center gap-6 hidden md:py-3 md:px-8 mt-3 cursor-pointer">
          <Cog6ToothIcon className="w-[20px] text-darkText" />
          <p className="text-[15px]">Settings</p>
        </div>
      </SheetTrigger>
      <SheetContent className="scrollbar border-l-[1px] border-mutedBorder overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="">
          <ChangeEmail email={email} setEmail={setEmail} />
          <ChangePassword />
          <DeleteAccount />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Settings;

function ChangeEmail({
  email,
  setEmail,
}: {
  email: string | undefined;
  setEmail: React.Dispatch<SetStateAction<string | undefined>>;
}) {
  const [newEmail, setNewEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();
  const { toast } = useToast();
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();

    if (!newEmail.length) {
        toast({
            title: 'Entry must not be left empty',
            description: 'Please enter an email in the appropriate email format'
        })
    } else if (!newEmail.match(regex)) {
        toast({
            title: 'Email does not match the proper format'
        })
    } else {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        toast({
          title: "Something went wrong",
          description: error.message,
        });
      } else {
        toast({
          title: "Email was update successfully!",
        });

        setEmail(data?.user?.email);
      }

      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-2 py-2 hover:bg-[#ffffff30] duration-500 rounded-md mb-1 cursor-pointer">
          <p className="">Change email</p>
          <p className="text-[14px] text-[#ffffff60]">{email}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change email</DialogTitle>
          <DialogDescription>
            Make changes to your email here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEmail} className="mt-4">
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="new_email">New email</label>
            <input
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              id="new_email"
              type="email"
              placeholder="example@email.com"
              className="text-[14px] text-myForeground w-full py-1 px-3 rounded-lg outline-none bg-transparent border-[1px] border-[#ffffff30]"
            />
          </div>
          <DialogFooter className="mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-green-800 rounded-lg hover:opacity-70 duration-500"
            >
              {loading ? (
                <Loading
                  classNameSize="w-4 h-4"
                  classNameColor="border-t-myForeground"
                />
              ) : (
                "Save"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ChangePassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();
  const { toast } = useToast();

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!newPassword.length) {
        toast({
            title: 'Entry must not be left empty',
            description: 'Please enter a password in 6 characters or more'
        })
    } else if (newPassword.length < 6) {
        toast({
            title: 'Password must be 6 characters or more'
        })
    } else {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast({
          title: "Something went wrong",
          description: error.message,
        });
      } else {
        toast({
          title: "Email was update successfully!",
        });

        // setEmail(data?.user?.email);
      }

      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-2 py-2 hover:bg-[#ffffff30] duration-500 rounded-md mb-1 cursor-pointer">
          <p className="">Change password</p>
          <p className="text-[14px] text-[#ffffff60]">
            &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePassword} className="mt-4">
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="new_password">New password</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              id="new_password"
              type="password"
              className="text-myForeground w-full py-1 px-3 rounded-lg outline-none bg-transparent border-[1px] border-[#ffffff30]"
            />
          </div>
          <DialogFooter className="mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-green-800 rounded-lg hover:opacity-70 duration-500"
            >
              {loading ? (
                <Loading
                  classNameSize="w-4 h-4"
                  classNameColor="border-t-myForeground"
                />
              ) : (
                "Save"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAccount() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="px-2 py-2 hover:bg-[#ffffff30] duration-500 rounded-md mb-1 cursor-pointer">
          <p className="text-red-800">Delete account</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Was this an accident?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
