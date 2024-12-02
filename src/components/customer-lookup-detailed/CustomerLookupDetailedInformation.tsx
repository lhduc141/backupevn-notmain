import React from 'react'
import CustomerLookupDetailedCard from './CustomerLookupDetailedCard'
type CustomerLookupDetailedInformationProps = {
    customerId: number;
};
export const CustomerLookupDetailedInformation = ({ customerId }: CustomerLookupDetailedInformationProps) => {
    return (
        <div><CustomerLookupDetailedCard customerId={customerId} /></div>
    )
}