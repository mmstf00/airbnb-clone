import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};

    // If we search by listingId, then it will find all reservations for the single listingId
    if (listingId) {
      query.listingId = listingId;
    };

    // If we search by userId, then it will find all the trips that user have
    if (userId) {
      query.userId = userId;
    }

    // If we search by authorId, then it will find all the reservations that other users made for our listings
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Because we are working with dates, making it safer by converting the dates to
    const safeReservations = reservations.map(
      (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}