import { MongoClient } from 'mongodb';
import { Database, User, Listing, Booking } from '../lib/types';

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_URI}/main?authSource=admin`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = client.db(process.env.DB_CLUSTER);

    return {
        listings: db.collection<Listing>('listings'),
        users: db.collection<User>('users'),
        bookings: db.collection<Booking>('bookings')
    }
};
