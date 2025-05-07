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
import { EditIcon, Plane } from "lucide-react";
import { Combobox } from "./combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { getTripById, updateTrip } from "@/actions/tripsdb.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type Trip = NonNullable<Awaited<ReturnType<typeof getTripById>>>;

interface EditDialogProps {
  trip: Trip;
}

export default function EditDialog({ trip }: EditDialogProps) {
  const [formData, setFormData] = useState({
    location: trip.location.trim(),
    category: trip.category.trim(),
    startDate: trip.startDate.toISOString().split("T")[0],
    endDate: trip.endDate.toISOString().split("T")[0],
    people: trip.people,
    budget: trip.budget,
    imageUrl: trip.imageUrl || "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600",
    userId: trip.userId,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Adding New Trip");
      const newTrip = await updateTrip(trip.id, { ...formData, startDate: new Date(formData.startDate), endDate: new Date(formData.endDate) });
      console.log("New Trip added", newTrip);
      toast.success("Trip updated successfully!");
    } catch (error) {
      console.log("Error updating Trip", error);
      toast.error("Failed to update Trip");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='secondary' className='ml-auto flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <EditIcon className='w-4 h-4' />
            Update
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Plan a Trip</AlertDialogTitle>
          <AlertDialogDescription>Fill out the form below to add a new plan to your travel journey.</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                type='text'
                placeholder='Enter Location'
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='category'>Category</Label>
              <Combobox value={formData.category} onChange={(val) => handleChange("category", val)} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='startDate'>Start Date</Label>
              <Input id='startDate' type='date' value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
            </div>
            <div>
              <Label htmlFor='endDate'>End Date</Label>
              <Input id='endDate' type='date' value={formData.endDate} onChange={(e) => handleChange("startDate", e.target.value)} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='people'>No. of People</Label>
              <Input
                id='people'
                type='number'
                placeholder='Enter number of people'
                value={formData.people}
                onChange={(e) => handleChange("people", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor='budget'>Budget</Label>
              <Input
                id='budget'
                type='number'
                placeholder='Enter budget'
                value={formData.budget}
                onChange={(e) => handleChange("budget", Number(e.target.value))}
              />
            </div>
          </div>

          {/*Image Upload*/}
          <div className='py-5 flex items-center justify-center'>
            <ImageUpload
              endpoint='postImage'
              value={formData.imageUrl}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type='submit'>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
