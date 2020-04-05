import React from 'react';
import { useMutation, useQuery } from '../../lib/api'
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

const DELETE_LISTING = `
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
    const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

    const handleDeleteListing = async (id: string) => {
        await deleteListing({id});
        refetch();
    };

    const listings = data ? data.listings : null;

    const listingsList = listings ? listings.map(listing => {
        return (
            <li key={listing.id}>
                {listing.title}
                <button onClick={() => handleDeleteListing(listing.id)}> Delete</button>
            </li>
        );
    }) : null;

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>Something went wrong - please try again later</h3>
    }

    const deleteListingLoadingMessage = deleteListingLoading ? (
        <h3>Deletion in progress</h3>
    ) : null;

    const deleteListingErrorMessage = deleteListingError ? (
        <h3>oops, something went wrong with deletion - please try again later</h3>
    ) : null;

    return (
        <div>
            <h2>{props.title}</h2>
            <ul>
                {listingsList}
                {deleteListingLoadingMessage}
                {deleteListingErrorMessage}
            </ul>
        </div>
    );
};
