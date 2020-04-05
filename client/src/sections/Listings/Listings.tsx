import React from 'react';
import { server, useQuery } from '../../lib/api'
import { DeleteListingData, DeleteListingVariables, ListingsData } from './types';

const LISTINGS = `
    query Listings {
        listings {
            id,
            title,
            image,
            address,
            price,
            numOfGuests,
            numOfBeds,
            numOfBaths,
            rating
        }
    }
`;

const DELETE_LISTINGS = `
    mutation DeleteListings($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

interface Props {
    title: string
}

export const Listings = (props: Props) => {
    const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

    const deleteListing = async (id: string) => {
        await server.fetch<DeleteListingData, DeleteListingVariables>({
            query: DELETE_LISTINGS,
            variables: {
                id: id
            }
        });
        refetch();
    };

    const listings = data ? data.listings : null;

    const listingsList = listings ? listings.map(listing => {
        return (
            <li key={listing.id}>
                {listing.title}
                <button onClick={() => deleteListing(listing.id)}> Delete</button>
            </li>
        );
    }) : null;

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>Something went wrong - please try again later</h3>
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <ul>
                {listingsList}
            </ul>
        </div>
    );
};
