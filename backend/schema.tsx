// TypeScript ORM (TypeORM) schema for a hotel manager tool
// Extended Features: Loyalty programs, shift scheduling, event hosting, and inventory tracking

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    hotelId: number;

    @Column({ length: 255 })
    name: string;

    @Column("text")
    address: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100, nullable: true })
    state: string;

    @Column({ length: 100 })
    country: string;

    @Column({ length: 20, nullable: true })
    postalCode: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ length: 100, nullable: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];

    @OneToMany(() => Staff, (staff) => staff.hotel)
    staff: Staff[];

    @OneToMany(() => Event, (event) => event.hotel)
    events: Event[];
}

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    roomId: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel;

    @Column({ length: 10 })
    roomNumber: string;

    @Column({ length: 50 })
    roomType: string;

    @Column()
    capacity: number;

    @Column("decimal", { precision: 10, scale: 2 })
    pricePerNight: number;

    @Column("text", { nullable: true })
    description: string;

    @Column({ default: true })
    isAvailable: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Amenity, (amenity) => amenity.rooms)
    @JoinTable()
    amenities: Amenity[];

    @OneToMany(() => MaintenanceRequest, (request) => request.room)
    maintenanceRequests: MaintenanceRequest[];
}

@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    guestId: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 100, unique: true, nullable: true })
    email: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column("text", { nullable: true })
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Reservation, (reservation) => reservation.guest)
    reservations: Reservation[];
}

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    reservationId: number;

    @ManyToOne(() => Guest, (guest) => guest.reservations, { onDelete: "CASCADE" })
    @JoinColumn()
    guest: Guest;

    @ManyToOne(() => Room, (room) => room.maintenanceRequests, { onDelete: "CASCADE" })
    @JoinColumn()
    room: Room;

    @Column("date")
    checkInDate: string;

    @Column("date")
    checkOutDate: string;

    @Column("decimal", { precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ length: 50, default: "Pending" })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    staffId: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.staff, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 100, unique: true, nullable: true })
    email: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ length: 50 })
    role: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    salary: number;

    @Column("date", { nullable: true })
    hiredDate: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Shift, (shift) => shift.staff)
    shifts: Shift[];
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    paymentId: number;

    @ManyToOne(() => Reservation, (reservation) => reservation.reservationId, { onDelete: "CASCADE" })
    @JoinColumn()
    reservation: Reservation;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 50 })
    paymentMethod: string;

    @CreateDateColumn()
    paymentDate: Date;

    @Column({ length: 50, default: "Completed" })
    status: string;
}

@Entity()
export class Amenity {
    @PrimaryGeneratedColumn()
    amenityId: number;

    @Column({ length: 100 })
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Room, (room) => room.amenities)
    rooms: Room[];
}

@Entity()
export class MaintenanceRequest {
    @PrimaryGeneratedColumn()
    requestId: number;

    @ManyToOne(() => Room, (room) => room.maintenanceRequests, { onDelete: "CASCADE" })
    @JoinColumn()
    room: Room;

    @ManyToOne(() => Staff, (staff) => staff.staffId)
    @JoinColumn()
    staff: Staff;

    @Column("text")
    description: string;

    @CreateDateColumn()
    requestDate: Date;

    @Column("timestamp", { nullable: true })
    completionDate: Date;

    @Column({ length: 50, default: "Pending" })
    status: string;
}

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @ManyToOne(() => Guest, (guest) => guest.guestId, { onDelete: "CASCADE" })
    @JoinColumn()
    guest: Guest;

    @ManyToOne(() => Hotel, (hotel) => hotel.hotelId, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel;

    @Column({ type: "int", width: 1, default: 5 })
    rating: number;

    @Column("text", { nullable: true })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity()
export class Shift {
    @PrimaryGeneratedColumn()
    shiftId: number;

    @ManyToOne(() => Staff, (staff) => staff.shifts, { onDelete: "CASCADE" })
    @JoinColumn()
    staff: Staff;

    @Column("timestamp")
    startTime: Date;

    @Column("timestamp")
    endTime: Date;

    @Column("text", { nullable: true })
    notes: string;
}

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    eventId: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.events, { onDelete: "CASCADE" })
    @JoinColumn()
    hotel: Hotel;

    @Column({ length: 255 })
    name: string;

    @Column("timestamp")
    date: Date;

    @Column("text", { nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
}
