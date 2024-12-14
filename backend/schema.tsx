// TypeScript ORM (TypeORM) schema for a hotel manager tool
// Extended Features: Loyalty programs, shift scheduling, event hosting, inventory tracking, and 3D schema storage

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

// Represents the main entity for managing hotels
@Entity()
export class Hotel {
    @PrimaryGeneratedColumn("uuid")
    hotelId: string; // Unique identifier for each hotel

    @Column({ length: 255 })
    name: string; // Hotel name

    @Column("text")
    address: string; // Hotel address

    @Column({ length: 100 })
    city: string; // City where the hotel is located

    @Column({ length: 100, nullable: true })
    state: string; // State/Province

    @Column({ length: 100 })
    country: string; // Country

    @Column({ length: 20, nullable: true })
    postalCode: string; // Postal code/ZIP

    @Column({ length: 20, nullable: true })
    phone: string; // Contact phone number

    @Column({ length: 100, nullable: true })
    email: string; // Contact email

    @CreateDateColumn()
    createdAt: Date; // Timestamp of when the hotel was added to the system

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[]; // List of rooms in the hotel

    @OneToMany(() => Staff, (staff) => staff.hotel)
    staff: Staff[]; // Staff associated with the hotel

    @OneToMany(() => Event, (event) => event.hotel)
    events: Event[]; // Events hosted by the hotel

    @Column("text", { nullable: true })
    threeDSchema: string; // JSON or binary representation of the 3D schema
    // Use formats like glTF or Draco to minimize storage space.
}

// Represents a room in a hotel
@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    roomId: string; // Unique identifier for each room

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel; // Hotel this room belongs to

    @Column({ length: 10 })
    roomNumber: string; // Room number (e.g., 101, A1)

    @Column({ length: 50 })
    roomType: string; // Room type (e.g., Single, Suite)

    @Column()
    capacity: number; // Maximum capacity of the room

    @Column("decimal", { precision: 10, scale: 2 })
    pricePerNight: number; // Cost per night

    @Column("text", { nullable: true })
    description: string; // Additional details about the room

    @Column({ default: true })
    isAvailable: boolean; // Indicates availability

    @CreateDateColumn()
    createdAt: Date; // Timestamp of when the room was added

    @ManyToMany(() => Amenity, (amenity) => amenity.rooms)
    @JoinTable()
    amenities: Amenity[]; // List of amenities for the room

    @OneToMany(() => MaintenanceRequest, (request) => request.room)
    maintenanceRequests: MaintenanceRequest[]; // Maintenance requests associated with this room

    @Column("text", { nullable: true })
    threeDSchema: string; // 3D schema for the room (compressed format)
}

// Represents a guest who books rooms
@Entity()
export class Guest {
    @PrimaryGeneratedColumn("uuid")
    guestId: string; // Unique identifier for each guest

    @Column({ length: 100 })
    firstName: string; // Guests first name

    @Column({ length: 100 })
    lastName: string; // Guests last name

    @Column({ length: 100, unique: true, nullable: true })
    email: string; // Email address

    @Column({ length: 20, nullable: true })
    phone: string; // Contact number

    @Column("text", { nullable: true })
    address: string; // Address of the guest

    @CreateDateColumn()
    createdAt: Date; // Timestamp of when the guest registered

    @OneToMany(() => Reservation, (reservation) => reservation.guest)
    reservations: Reservation[]; // Reservations made by the guest
}

// Represents a reservation made by a guest for a room
@Entity()
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    reservationId: string; // Unique identifier for each reservation

    @ManyToOne(() => Guest, (guest) => guest.reservations, { onDelete: "CASCADE" })
    @JoinColumn()
    guest: Guest; // Guest who made the reservation

    @ManyToOne(() => Room, (room) => room.maintenanceRequests, { onDelete: "CASCADE" })
    @JoinColumn()
    room: Room; // Room being reserved

    @Column("date")
    checkInDate: string; // Check-in date

    @Column("date")
    checkOutDate: string; // Check-out date

    @Column("decimal", { precision: 10, scale: 2 })
    totalPrice: number; // Total cost of the reservation

    @Column({ length: 50, default: "Pending" })
    status: string; // Reservation status (e.g., Pending, Confirmed)

    @CreateDateColumn()
    createdAt: Date; // Timestamp of reservation creation
}

// Represents a staff member working in a hotel
@Entity()
export class Staff {
    @PrimaryGeneratedColumn("uuid")
    staffId: string; // Unique identifier for each staff member

    @ManyToOne(() => Hotel, (hotel) => hotel.staff, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel; // Hotel where the staff member works

    @Column({ length: 100 })
    firstName: string; // Staffs first name

    @Column({ length: 100 })
    lastName: string; // Staff last name

    @Column({ length: 100, unique: true, nullable: true })
    email: string; // Contact email

    @Column({ length: 20, nullable: true })
    phone: string; // Contact phone number

    @Column({ length: 50 })
    role: string; // Role of the staff (e.g., Manager, Cleaner)

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    salary: number; // Salary of the staff

    @Column("date", { nullable: true })
    hiredDate: string; // Date of hiring

    @CreateDateColumn()
    createdAt: Date; // Timestamp of record creation

    @OneToMany(() => Shift, (shift) => shift.staff)
    shifts: Shift[]; // List of shifts for the staff member
}

// Represents payments made for reservations
@Entity()
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    paymentId: string; // Unique identifier for each payment

    @ManyToOne(() => Reservation, (reservation) => reservation.reservationId, { onDelete: "CASCADE" })
    @JoinColumn()
    reservation: Reservation; // Reservation associated with the payment

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number; // Amount paid

    @Column({ length: 50 })
    paymentMethod: string; // Payment method (e.g., Credit Card)

    @CreateDateColumn()
    paymentDate: Date; // Timestamp of the payment

    @Column({ length: 50, default: "Completed" })
    status: string; // Payment status (e.g., Completed, Failed)
}

// Represents amenities available in rooms
@Entity()
export class Amenity {
    @PrimaryGeneratedColumn("uuid")
    amenityId: string; // Unique identifier for each amenity

    @Column({ length: 100 })
    name: string; // Name of the amenity (e.g., Wi-Fi, TV)

    @Column("text", { nullable: true })
    description: string; // Description of the amenity

    @CreateDateColumn()
    createdAt: Date; // Timestamp of record creation

    @ManyToMany(() => Room, (room) => room.amenities)
    rooms: Room[]; // Rooms that have this amenity
}

// Represents maintenance requests for rooms
@Entity()
export class MaintenanceRequest {
    @PrimaryGeneratedColumn("uuid")
    requestId: string; // Unique identifier for each request

    @ManyToOne(() => Room, (room) => room.maintenanceRequests, { onDelete: "CASCADE" })
    @JoinColumn()
    room: Room; // Room requiring maintenance

    @ManyToOne(() => Staff, (staff) => staff.staffId)
    @JoinColumn()
    staff: Staff; // Staff member handling the request

    @Column("text")
    description: string; // Description of the issue

    @CreateDateColumn()
    requestDate: Date; // Timestamp of request creation

    @Column("timestamp", { nullable: true })
    completionDate: Date; // Timestamp of request completion

    @Column({ length: 50, default: "Pending" })
    status: string; // Status of the request (e.g., Pending, Completed)
}

// Represents reviews left by guests for hotels
@Entity()
export class Review {
    @PrimaryGeneratedColumn("uuid")
    reviewId: string; // Unique identifier for each review

    @ManyToOne(() => Guest, (guest) => guest.guestId, { onDelete: "CASCADE" })
    @JoinColumn()
    guest: Guest; // Guest who left the review

    @ManyToOne(() => Hotel, (hotel) => hotel.hotelId, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel; // Hotel being reviewed

    @Column({ type: "int", width: 1, default: 5 })
    rating: number; // Rating given by the guest (1-5)

    @Column("text", { nullable: true })
    comment: string; // Guest comments

    @CreateDateColumn()
    createdAt: Date; // Timestamp of review creation
}

// Represents shift schedules for staff members
@Entity()
export class Shift {
    @PrimaryGeneratedColumn("uuid")
    shiftId: string; // Unique identifier for each shift

    @ManyToOne(() => Staff, (staff) => staff.shifts, { onDelete: "CASCADE" })
    @JoinColumn()
    staff: Staff; // Staff member assigned to the shift

    @Column("timestamp")
    startTime: Date; // Start time of the shift

    @Column("timestamp")
    endTime: Date; // End time of the shift

    @Column("text", { nullable: true })
    notes: string; // Notes for the shift (e.g., tasks to complete)
}

// Represents events hosted at a hotel
@Entity()
export class Event {
    @PrimaryGeneratedColumn("uuid")
    eventId: string; // Unique identifier for each event

    @ManyToOne(() => Hotel, (hotel) => hotel.events, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel; // Hotel hosting the event

    @Column({ length: 255 })
    name: string; // Event name

    @Column("timestamp")
    date: Date; // Date of the event

    @Column("text", { nullable: true })
    description: string; // Description of the event

    @CreateDateColumn()
    createdAt: Date; // Timestamp of event creation
}
