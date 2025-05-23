import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global `prisma` to be reused across hot reloads in dev
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export { prisma };
