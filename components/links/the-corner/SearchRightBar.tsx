'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Card from '@/components/Card';
import Header4 from '@/components/Header4';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import UsersList from './UsersList';
import { createClient } from '@/utils/supabase/client';
import { UserDataProps } from '@/types/type';

function SearchRightBar({ searchParams }: { searchParams: { search: string}}) {
    const [ currentUser, setCurrentUser ] = useState<string | undefined>()
    const [ filterUser, setFilterUser ] = useState<UserDataProps[] | undefined>()
    // const [ users, setUsers ] = useState<UserDataProps[] | undefined>()

    const supabase = createClient()

    async function getUsers() {
        const { data: authData, error: authError } = await supabase.auth.getUser()

        if (authError) {
            console.log(authError)
        } else {
            setCurrentUser(authData?.user?.id)

            const { data, error } = await supabase.from('users').select('name, username, id, image, bio')

            if (error) {
                console.log(error)
            } else {
                // setUsers(data)

                const filter = data?.filter(el => el?.bio?.toLowerCase().includes(searchParams.search) || el?.username?.toLowerCase().includes(searchParams.search) || el?.name?.toLowerCase().includes(searchParams.search))
                setFilterUser(filter)
            }
        }
    }

    useEffect(() => {
        getUsers()
    }, [searchParams])

  return (
    <div>
        <section>
        <Card className=''>
          <div className="">
            <Header4 title={`Users under "${searchParams.search}"`} />
          </div>
          <div className="mt-2 max-h-[30vh] overflow-y-auto">
            {filterUser && filterUser?.length
              ? filterUser?.map((user) => {
                  return (
                    <Fragment key={user.id}>
                      <Link
                        href={
                          user?.id === currentUser
                            ? "/profile"
                            : `/profile/${user.username}`
                        }
                      >
                        <UsersList user={user} />
                      </Link>
                    </Fragment>
                  );
                })
              : filterUser && !filterUser?.length ? 
              <div className='my-10 flex justify-center'>
                <p className='text-center w-[80%]'>Sorry, there are currently no users under "{searchParams.search}"</p>
              </div>
              :
              [0, 1, 2, 3].map((el) => {
                  return (
                    <div key={el} className="flex items-center gap-4 py-3 px-2">
                      <Skeleton className="w-[40px] h-[40px] rounded-full animate-skeleton" />
                      <div className="flex-[1]">
                        <Skeleton className="h-5 w-[65%] rounded-lg animate-skeleton" />
                        <Skeleton className="mt-1 h-4 w-[45%] rounded-lg animate-skeleton" />
                      </div>
                    </div>
                  );
                })}
          </div>
        </Card>
        </section>
    </div>
  )
}

export default SearchRightBar