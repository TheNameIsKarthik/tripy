import { getTrips } from "@/actions/tripsdb.action";
import FutureTrips from "@/components/FutureTrips";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

const page = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  const trips = await getTrips();

  return (
    <>
      {user ? (
        <div className='mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
          <div className='lg:col-span-full'>
            <FutureTrips trips={trips} />
          </div>
        </div>
      ) : (
        <div className='flex justify-center mt-20 items-center'>
          <SignUp />
        </div>
      )}
    </>
  );
};

export default page;
