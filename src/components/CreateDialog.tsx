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
import { Plane } from "lucide-react";
import { Combobox } from "./combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { createTrip } from "@/actions/tripsdb.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

const defaultFormData = {
  location: "",
  category: "",
  startDate: "",
  endDate: "",
  people: 1,
  budget: 0,
  imageUrl: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600",
  userId: "",
};

export default function CreateDialog() {
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.location.trim() || !formData.category || !formData.startDate || !formData.endDate || formData.people < 1) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error("Start date must be before end date.");
      return;
    }
    try {
      console.log("Adding New Trip");
      const newTrip = await createTrip({
        ...formData,
        imageUrl: formData.imageUrl,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      });
      console.log("New Trip added", newTrip);
      toast.success("Trip added successfully!");
    } catch (error) {
      console.log("Error Adding Trip", error);
      toast.error("Failed to add Trip");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='default' className='ml-auto flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Plane className='w-4 h-4' />
            Plan Trip
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
              <Input id='endDate' type='date' value={formData.endDate} onChange={(e) => handleChange("endDate", e.target.value)} />
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
