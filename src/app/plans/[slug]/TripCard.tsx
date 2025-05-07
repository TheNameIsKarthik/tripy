import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { getTripById } from "@/actions/tripsdb.action";
import { differenceInDays, format } from "date-fns";

type Trip = Awaited<ReturnType<typeof getTripById>>;

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  if (!trip) {
    return <div>Location data is not available.</div>;
  }

  return (
    <Card className='max-w'>
      <div className='flex flex-row'>
        <div className='basis-2/4'>
          <CardHeader>
            {trip.imageUrl && (
              <div className='rounded-lg overflow-hidden'>
                <img src={trip.imageUrl} alt='Post content' className='w-full h-auto object-cover' />
              </div>
            )}
          </CardHeader>
        </div>
        <div className='basis-2/4 flex flex-col justify-between'>
          <CardContent className='mt-8 space-y-5'>
            <CardTitle className='text-5xl font-bold mt-5'>
              {trip.location} {" Trip"}
            </CardTitle>
            <CardTitle className='text-3xl font-bold'>${trip.budget}</CardTitle>
            <CardTitle className='text-3xl font-bold'>
              {differenceInDays(trip.endDate, trip.startDate)} {differenceInDays(trip.endDate, trip.startDate) === 1 ? " day" : " days"}
            </CardTitle>
            <Badge>{trip.category}</Badge>
            <CardDescription>Start Date: {format(new Date(trip.startDate), "MMM d, yyyy")}</CardDescription>
            <CardDescription>End Date: {format(new Date(trip.endDate), "MMM d, yyyy")}</CardDescription>
            <CardDescription className='text-white'>
              {trip.people} {trip.people === 1 ? "passenger" : "passengers"}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
