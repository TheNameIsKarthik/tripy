import React from "react";
import TripCard from "./TripCard";
import { getTripById } from "@/actions/tripsdb.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const [id] = params.slug.split("--");
  const trip = await getTripById(id);

  return {
    title: trip ? `${trip.location} Trip` : "Journey Planning",
    description: trip ? `Planning for trip to ${trip.location}` : "The planning of the journey",
  };
};

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const trip = await getTripById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className='mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-full'>
        <TripCard trip={trip} />
      </div>
    </div>
  );
};

export default page;
