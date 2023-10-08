import prisma from "@/app/libs/prismadb";

interface IParams {
  listingid?: string; // Using lowercase to fix prisma error
}

export default async function getListingById(
  params: IParams
) {
  try {
    const { listingid } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingid,
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}