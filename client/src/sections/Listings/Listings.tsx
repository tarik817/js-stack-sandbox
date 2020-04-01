import React from 'react';
import { server } from '../../lib/api'
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
    const fetchListing = async () => {
        const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
        console.log(data);

    };

    const deleteListing = async () => {
        const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
            query: DELETE_LISTINGS,
            variables: {
                // TODO: Start from here.
                id: "5e823e651a68915ec41d0eb9"
            }
        })
        console.log(data);
    };

    return (
        <div>
            <h2>{props.title}</h2>
            <button onClick={fetchListing}> Query API for listings</button>
            <button onClick={deleteListing}> Delete API for listings</button>
        </div>
    );
};
