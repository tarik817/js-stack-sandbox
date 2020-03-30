interface Listings {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
}

export const listings: Listings[] = [
    {
        id: "001",
        title: "Town test app",
        image: "https://fakeimg.pl/250x100/",
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 10000,
        numOfGuests: 3,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5
    },
    {
        id: "002",
        title: "Big city test app",
        image: "https://fakeimg.pl/250x100/",
        address: "100 Hollywood Hills Dr, Los Angeles, California",
        price: 15000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4
    }
];