import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Header2 from "@/components/Header2";
import Header3 from "@/components/Header3";
import Loading from "@/components/Loading";
import LogSignPage from "@/components/links/login-signup/LogSignPage";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  return (
    <div className="">
      <LogSignPage link='/signup' topRightLabel="Register">
        <div className="text-darkText mb-4 ">
          <div className="flex justify-center">
            <Header2 title='Log In'/>
          </div>
          <p className="text-[14px] text-darkText60 font-medium text-center mt-5">Already registered with us? Welcome back! And FYI, we now have NSFW fill out content available.</p>
        </div>
        <form className="text-darkText w-full">
          {/* EMAIL INPUT */}
          <input name='email' className="w-full outline-none border-none rounded-xl py-2 px-5 mb-3 tracking-tight" type='email' placeholder="name@example.com"/>
          {/* PASSWORD INPUT */}
          <input name='password' className="w-full outline-none border-none rounded-xl py-2 px-5 tracking-tight" type='password' placeholder="••••••••"/>
          <div className="mt-[2rem]">
            {}
            <SubmitButton
            formAction={signIn}
            >
              Sign In
            </SubmitButton>
          </div>
          {searchParams?.message && (
            <p className="mt-4 p-4 md:bg-myBackground text-myForeground bg-green-600 text-center rounded">
              {searchParams.message}
            </p>
          )}
          
        </form>
      </LogSignPage>
      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form> */}
    </div>
  );
}
