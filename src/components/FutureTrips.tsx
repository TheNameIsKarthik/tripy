"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./combo-box";
import { useState, useEffect } from "react";
import { getTrips } from "@/actions/tripsdb.action";
import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Trip = Awaited<ReturnType<typeof getTrips>>;

interface TripTableProps {
  trips: Trip;
}

export default function FutureTrips({ trips }: TripTableProps) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trips) {
      setLoading(true);
      getTrips().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [trips]);

  const filteredTrips = trips?.userTrips?.filter(
    (trip) => trip.location.toLowerCase().includes(searchTerm.toLowerCase()) && (category === "" || trip.category === category)
  );

  if (loading) {
    return (
      <div className='w-full space-y-4'>
        <div className='flex items-center gap-2 py-4'>
          <Skeleton className='h-10 w-full max-w-sm' />
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead className='text-right'>
                <Skeleton className='w-full h-4' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 9 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='w-full h-4' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 py-4'>
        <div className='relative max-w-sm w-full'>
          <Input placeholder='Filter Trips...' className='pl-10' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Search className='absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2' />
        </div>
        <div>
          <Combobox value={category} onChange={(val) => setCategory(val)} />
        </div>
        <CreateDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-left'>Location</TableHead>
            <TableHead className='text-center'>Category</TableHead>
            <TableHead className='text-center'>Start Date</TableHead>
            <TableHead className='text-center'>End Date</TableHead>
            <TableHead className='text-center'>Duration</TableHead>
            <TableHead className='text-center'>Head Count</TableHead>
            <TableHead className='text-center'>Budget</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTrips?.map((trip) => {
            const slugName = trip.location.toLowerCase().replace(/\s+/g, "-");
            const slug = `${trip.id}--${slugName}`;

            const tripUrl = `/plans/${slug}`;

            return (
              <TableRow key={trip.id} className='text-center cursor-pointer' onClick={() => router.push(tripUrl)}>
                <TableCell className='text-left'>{trip.location}</TableCell>
                <TableCell>{trip.category}</TableCell>
                <TableCell>{format(new Date(trip.startDate), "MMM d, yyyy")}</TableCell>
                <TableCell>{format(new Date(trip.endDate), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  {differenceInDays(new Date(trip.endDate), new Date(trip.startDate))}{" "}
                  {differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) === 1 ? "day" : "days"}
                </TableCell>
                <TableCell className='font-bold'>{trip.people}</TableCell>
                <TableCell>${trip.budget}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end space-x-4' onClick={(e) => e.stopPropagation()}>
                    <EditDialog trip={trip} />
                    <DeleteDialog trip={trip} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
