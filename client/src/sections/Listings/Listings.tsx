import React from 'react';
import { useMutation, useQuery } from 'react-apollo'
import { Listings as ListingsData } from './__generated__/Listings';
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing';
import { gql } from 'apollo-boost';
import { Alert, Avatar, Button, List, Spin } from 'antd';
import './styles/Listings.css'
import { ListingsSkeleton } from './components';

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
    mutation DeleteListing($id: ID!) {
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
        await deleteListing({ variables: { id } });
        refetch();
    };

    const listings = data ? data.listings : null;

    const listingsList = listings ? (
        <List itemLayout={'horizontal'} dataSource={listings} renderItem={listing => (
            <List.Item
                actions={[
                    <Button type={'primary'}
                            onClick={() => { handleDeleteListing(listing.id)}}>
                        Delete
                    </Button>
                ]}
            >
                <List.Item.Meta title={listing.title}
                                description={listing.address}
                                avatar={<Avatar src={listing.image} shape={'square'} size={48}/>}
                />
            </List.Item>
        )}
        />
    ) : null;

    if (loading) {
        return <div className={'listings'}><ListingsSkeleton title={props.title} error={true}/></div>
    }

    const deleteListingErrorMessage = deleteListingError ?
        <Alert className={'listings__alert'}
               type={'error'}
               message={'oops, something went wrong with deletion - please try again later'}
        />
        : null;

    return (
        <div className={'listings'}>
            {deleteListingErrorMessage}
            <Spin spinning={deleteListingLoading}>
                <h2>{props.title}</h2>
                <ul>
                    {listingsList}
                </ul>
            </Spin>
        </div>
    );
};
