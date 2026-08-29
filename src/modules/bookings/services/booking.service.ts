import { BookingRepository } from "../repositories/booking.repository";
import { UpdateBookingDto } from "../types/booking.types";
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  BadRequestError,
} from "@/utils/api-response";
import { CreateBookingDto } from "../validations/booking.validation";
import {
  getProfessionalIdByUserId,
  getUserIdByServiceRequestId,
} from "@/utils/booking-helper";

export class BookingService {
  private bookingRepository = new BookingRepository();

  // --------------------------------------------------
  // CREATE BOOKING (Professional submits an offer)
  // --------------------------------------------------
  async createBooking(currentUserId: string, input: CreateBookingDto) {
    const professionalId = await getProfessionalIdByUserId(currentUserId);
    const customerUserId = await getUserIdByServiceRequestId(
      input.serviceRequestId,
    );

    const existing = await this.bookingRepository.findExistingBooking(
      input.serviceRequestId,
      professionalId,
    );

    if (existing) {
      throw new BadRequestError(
        "Booking already exists for this service request",
      );
    }

    return this.bookingRepository.create({
      serviceRequestId: input.serviceRequestId,
      userId: customerUserId,
      professionalId,
      amount: input.amount,
      scheduledAt: input.scheduledAt,
    });
  }

  // --------------------------------------------------
  // GET SINGLE BOOKING
  // --------------------------------------------------
  async getBooking(id: string) {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    return booking;
  }

  // --------------------------------------------------
  // GET OFFERS FOR A SERVICE REQUEST (Customer View)
  // --------------------------------------------------
  async getOffersByServiceRequestId(serviceRequestId: string, UserId: string) {
    // Verify current user owns the service request
    const serviceUserId = await getUserIdByServiceRequestId(serviceRequestId);
    if (serviceUserId !== UserId) {
      throw new UnauthorizedError(
        "You are not authorized to view offers for this request",
      );
    }

    return this.bookingRepository.findByServiceRequestId(serviceRequestId);
  }

  // --------------------------------------------------
  // USER BOOKINGS (Customer View)
  // --------------------------------------------------
  async getUserBookings(userId: string) {
    return this.bookingRepository.findByUserId(userId);
  }

  // --------------------------------------------------
  // PROFESSIONAL BOOKINGS (Professional View)
  // --------------------------------------------------
  async getProfessionalBookings(professionalId: string) {
    return this.bookingRepository.findByProfessionalId(professionalId);
  }

  // --------------------------------------------------
  // UPDATE BOOKING (Edit PENDING Offer)
  // --------------------------------------------------
  async updateBooking(id: string, data: UpdateBookingDto) {
    const booking = await this.getBooking(id);

    if (booking.status !== "PENDING") {
      throw new ConflictError("Only pending bookings can be updated");
    }

    return this.bookingRepository.update(id, data);
  }

  // --------------------------------------------------
  // START BOOKING (Professional starts job)
  // --------------------------------------------------
  async startBooking(bookingId: string, professionalId: string) {
    const booking = await this.bookingRepository.startAtomic(
      bookingId,
      professionalId,
    );

    if (!booking) {
      const existing = await this.bookingRepository.findById(bookingId);

      if (!existing) {
        throw new NotFoundError("Booking not found");
      }

      if (existing.professionalId !== professionalId) {
        throw new UnauthorizedError(
          "You are not authorized to start this booking",
        );
      }

      throw new ConflictError("Booking cannot be started");
    }

    return booking;
  }

  // --------------------------------------------------
  // COMPLETE BOOKING (Professional completes job)
  // --------------------------------------------------
  async completeBooking(bookingId: string, professionalId: string) {
    const booking = await this.bookingRepository.completeAtomic(
      bookingId,
      professionalId,
    );

    if (!booking) {
      const existing = await this.bookingRepository.findById(bookingId);

      if (!existing) {
        throw new NotFoundError("Booking not found");
      }

      if (existing.professionalId !== professionalId) {
        throw new UnauthorizedError(
          "You are not authorized to complete this booking",
        );
      }

      throw new ConflictError("Booking cannot be completed");
    }

    return booking;
  }

  // --------------------------------------------------
  // CANCEL OPEN REQUEST & PENDING OFFERS (Customer)
  // --------------------------------------------------
  async cancelOpenRequest(
    bookingId: string,
    professionalId: string,
    cancelReason: string,
  ) {
    const result = await this.bookingRepository.cancelOpenRequestAtomic(
      bookingId,
      professionalId,
      cancelReason,
    );

    if (!result) {
      throw new BadRequestError(
        "Request cannot be cancelled. Ensure you are the owner and the status is OPEN.Really you are the professional you are trying to cancel? ",
      );
    }

    return result;
  }
  // --------------------------------------------------
  // GET OPEN REQUESTS FOR PROFESSIONAL
  // --------------------------------------------------

  async getOpenRequestsForProfessional(userId: string) {
    return this.bookingRepository.findOpenRequests(userId);
  }
}
