import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { XIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

const ImageUpload = ({ endpoint, onChange, value }: ImageUploadProps) => {
  if (value) {
    return (
      <div className='relative size-40'>
        <img src={value} alt='Upload' className='rounded-md w-full h-full object-cover' />
        <button onClick={() => onChange("")} className='absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm'>
          <XIcon className='h-4 w-4 text-white' />
        </button>
      </div>
    );
  }

  return (
    <div className='w-25 flex items-center'>
      <UploadButton<OurFileRouter, "postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success("Image uploaded");
          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUpload;
