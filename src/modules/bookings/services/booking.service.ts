import { BookingStatus } from "@prisma/client";

import { BookingRepository } from "../repositories/booking.repository";
import {
  CreateBookingDto,
  CreateBookingData,
  UpdateBookingDto,
} from "../types/booking.types";

export class BookingService {
  private bookingRepository = new BookingRepository();

  async createBooking(userId: string, data: CreateBookingDto) {
    const bookingData: CreateBookingData = {
      ...data,
      userId,
    };

    return this.bookingRepository.create(bookingData);
  }

  async getBooking(id: string) {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  }

  async getUserBookings(userId: string) {
    return this.bookingRepository.findByUserId(userId);
  }

  async getProfessionalBookings(professionalId: string) {
    return this.bookingRepository.findByProfessionalId(professionalId);
  }

  async updateBooking(id: string, data: UpdateBookingDto) {
    await this.getBooking(id);

    return this.bookingRepository.update(id, data);
  }

  async acceptBooking(id: string) {
    await this.getBooking(id);

    return this.bookingRepository.updateStatus(id, BookingStatus.ACCEPTED);
  }

  async rejectBooking(id: string) {
    await this.getBooking(id);

    return this.bookingRepository.updateStatus(id, BookingStatus.CANCELLED);
  }

  async completeBooking(id: string) {
    await this.getBooking(id);

    return this.bookingRepository.updateStatus(id, BookingStatus.COMPLETED);
  }

  async cancelBooking(id: string) {
    await this.getBooking(id);

    return this.bookingRepository.updateStatus(id, BookingStatus.CANCELLED);
  }
}
