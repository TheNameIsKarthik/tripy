"use client";

import { deleteTrip } from "@/actions/tripsdb.action";
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
import { Button } from "@/components/ui/button";
import { OctagonAlert, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteDialogProps {
  trip: {
    id: string;
  };
}

export default function DeleteDialog({ trip }: DeleteDialogProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteTrip(trip.id);
      toast.success("Trip Deleted Successfully");
    } catch (error) {
      console.log("Error deleting Trip", error);
      toast.error("Failed to delete Trip");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='ml-auto flex items-center gap-2' asChild>
          <span>
            <Trash2 className='w-4 h-4' />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className='mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10'>
              <OctagonAlert className='h-5 w-5 text-destructive' />
            </div>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-[15px]'>
            This action cannot be undone. This will permanently delete your Trip from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type='submit'>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
