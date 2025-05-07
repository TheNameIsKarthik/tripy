"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { log } from "console";

export const getTrips = async (searchTerm?: String) => {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.location = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userTrips = await prisma.trips.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userTrips };
  } catch (error) {
    console.log("Error in fetching Trips", error);
    throw new Error("Failed to fetch Trips");
  }
};
export const getTripById = async (id: string) => {
  return await prisma.trips.findUnique({
    where: { id },
  });
};

export const createTrip = async (data: Prisma.TripsCreateInput) => {
  console.log("Creating a New Trip");
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newTrip = await prisma.trips.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plans");
    return newTrip;
  } catch (error) {
    console.log("Error Creating new Trip", error);
  }
};

export const updateTrip = async (id: string, data: Prisma.TripsUpdateInput) => {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const updateTrip = await prisma.trips.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plans");
    return updateTrip;
  } catch (error) {
    console.log("Error Updating Trip");
    throw error;
  }
};

export const deleteTrip = async (id: string) => {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    await prisma.trips.delete({
      where: { id },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("Error deleting Trip");
    throw error;
  }
};
