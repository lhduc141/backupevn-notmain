import CustomerLookupDetailedCard from 'components/customer-lookup-detailed/CustomerLookupDetailedCard'

type CustomerLookupDetailedInformationProps = {
    customerId: number;
}

export const CustomerLookupDetailedInformation = ({ customerId  }: CustomerLookupDetailedInformationProps) => {
    return (
        <div><CustomerLookupDetailedCard customerId={customerId} /></div>
    )
}
