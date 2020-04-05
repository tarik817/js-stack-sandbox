import { Collection, ObjectId } from 'mongodb';

export enum ListingType {
    Apartment = "APARTMENT",
    House = "HOUSE"
}

export interface BookingsIndexMonth {
    [key: string]: boolean;
}

export interface BookingsIndexYear {
    [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
    [key: string]: BookingsIndexYear;
}

export interface Listing {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    host: string;
    type: ListingType;
    address: string;
    country: string;
    district: string;
    city: string;
    bookings: ObjectId[];
    bookingsIndex: BookingsIndex;
    price: number;
    numOfGuests: number;
}

export interface User {
    _id: ObjectId;
    token: string;
    name: string;
    avatar: string;
    contact: string;
    walletId: string | undefined;
    income: number;
    bookings: ObjectId[];
    listings: ObjectId[];
}

export interface Booking {
    _id: string;
    listing: ObjectId;
    tenant: string;
    checkIn: string;
    checkOut: string;
}

export interface Database {
    listings: Collection<Listing>;
    users: Collection<User>;
    bookings: Collection<Booking>;
}
