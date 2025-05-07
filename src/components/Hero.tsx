import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Hero = async ({
  badge,
  heading,
  description,
  buttons = {
    primary: {
      text: "Get Started",
      url: "/plans",
    },
    secondary: {
      text: "Learn More",
      url: "/plans",
    },
  },
}: HeroProps) => {
  return (
    <div className='lg:w-[80%] lg:flex lg:items-center lg:justify-center min-h-screen mx-auto -mt-20'>
      <div className='ml-10 mr-10'>
        <div className='container '>
          <div className='grid items-center gap-3 lg:grid-cols-2'>
            <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
              {badge && (
                <Link href='/plans'>
                  <Badge variant='outline'>
                    {badge}
                    <ArrowUpRight className='ml-2 size-4' />
                  </Badge>
                </Link>
              )}
              <h1 className='my-6 text-4xl font-bold text-pretty lg:text-6xl'>{heading}</h1>
              <p className='mb-8 max-w-xl text-muted-foreground lg:text-xl'>{description}</p>
              <div className='flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start'>
                {buttons.primary && (
                  <Button asChild className='w-full sm:w-auto'>
                    <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                  </Button>
                )}
                {buttons.secondary && (
                  <Button asChild variant='outline' className='w-full sm:w-auto'>
                    <Link href={buttons.secondary.url}>
                      {buttons.secondary.text}
                      <ArrowRight className='size-4' />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <img
              src='https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='image bg'
              className='max-h-96 w-full rounded-md object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero };
