"use client"
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User } from '@supabase/supabase-js';

function checkAuthState() {
    const supabase = createClient();

    const [ user, setUser ] = useState<User | undefined>()

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {

            
        if (session && session.user) {
            setUser(session?.user)
            return redirect('/dashboard')
        }

        return redirect('/login')
        })
        
        // call unsubscribe to remove the callback
        data.subscription.unsubscribe()
    }

  return { user }
}

export default checkAuthState
