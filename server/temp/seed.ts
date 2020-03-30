import { Listing } from '../src/lib/types';

require('./../src/helper').setupOptions();
import { connectDatabase } from '../src/database';
import { ObjectId } from 'mongodb';

const seed = async () => {
    try{
        console.log('[seed] : running...');

        const db = await connectDatabase();
        const listings: Listing[] = [
            {
                _id: new ObjectId(),
                title: "Town test app",
                image: "https://fakeimg.pl/250x100/",
                address: "3210 Scotchmere Dr W, Toronto, ON, CA",
                price: 10000,
                numOfGuests: 3,
                numOfBeds: 1,
                rating: 5
            },
            {
                _id: new ObjectId(),
                title: "Big city test app",
                image: "https://fakeimg.pl/250x100/",
                address: "100 Hollywood Hills Dr, Los Angeles, California",
                price: 15000,
                numOfGuests: 2,
                numOfBeds: 1,
                rating: 4
            }
        ];

        for (const listing of listings) {
            await db.listings.insertOne(listing);
        }

        console.log('[seed] : success');
    } catch {
        throw new Error('failed to seed database');
    }
};

seed();