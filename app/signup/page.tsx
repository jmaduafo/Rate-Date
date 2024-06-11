import React from 'react'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import LogSignPage from '@/components/links/login-signup/LogSignPage';
import Header2 from '@/components/Header2';
import { SubmitButton } from '../login/submit-button';

function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;

    if (!email.length || !password.length || !name.length || !username.length ) {
      return
    } else if (password.length < 6) {
      return redirect("/login?message=Password must be 6 characters or more"); 
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    await supabase.from('users').insert({
      id: data.user?.id,
      email,
      username,
      name
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check your email to continue sign in process");
  };

  return (
    <div>
      {/* CAN CHANGE HREF LINK AND BUTTON LABEL */}
      <LogSignPage link='/login' topRightLabel="Sign In">
        {/* HEADER TEXT WITH PARAGRAPH */}
        <div className="text-darkText mb-4 ">
          <div className="flex justify-center">
            <Header2 title='Sign Up'/>
          </div>
          <p className="text-[14px] text-darkText60 font-medium text-center mt-5">Not a registered user yet? Enter your credentials below to create your account</p>
        </div>
        <form className="text-darkText w-full">
          {/* NAME INPUT */}
          <input name='name' className="w-full outline-none border-none rounded-xl py-2 px-5 mb-3 tracking-tight" type='text' placeholder="name"/>
          {/* USERNAME INPUT */}
          <input name='username' className="w-full outline-none border-none rounded-xl py-2 px-5 mb-3 tracking-tight" type='text' placeholder="username"/>
          {/* EMAIL INPUT */}
          <input name='email' className="w-full outline-none border-none rounded-xl py-2 px-5 mb-3 tracking-tight" type='email' placeholder="name@example.com"/>
          {/* PASSWORD INPUT */}
          <input name='password' className="w-full outline-none border-none rounded-xl py-2 px-5 tracking-tight" type='password' placeholder="••••••••"/>
          {/* SUBMIT BUTTON */}
          <div className="mt-[2rem]">
            <SubmitButton
            formAction={signUp}
            >
              Create Your Account
            </SubmitButton>
          </div>
          {/* ERROR OR CONFIRMATION MESSAGE */}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-myBackground text-darkText text-center rounded-xl">
              {searchParams.message}
            </p>
          )}
          
        </form>
      </LogSignPage>
    </div>
  )
}

export default Signup