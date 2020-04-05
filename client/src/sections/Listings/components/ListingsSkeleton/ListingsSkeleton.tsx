import { Alert, Divider, Skeleton } from 'antd';
import React from 'react';
import './styles/ListingsSkeleton.css'

interface Props {
    title: string;
    error?: boolean;
}

export const ListingsSkeleton = ({ title, error = false }: Props) => {
    const errorAlert = error ?
        <Alert className={'listings-skeleton__alert'}
               type={'error'}
               message={'oops, something went wrong with deletion - please try again later'}
        />
        : null;

    return (
        <div className={'listings-skeleton'}>
            {errorAlert}
            <h2>{title}</h2>
            <Skeleton active={true} paragraph={{ rows: 1 }}/>
            <Divider/>
            <Skeleton active={true} paragraph={{ rows: 1 }}/>
            <Divider/>
            <Skeleton active={true} paragraph={{ rows: 1 }}/>
        </div>
    );
};
