import CustomerLookupCalendar from "components/customer-lookup-detailed/CustomerLookupCalendar"
import CustomerLookupClock from "components/customer-lookup-detailed/CustomerLookupClock"
import CustomerLookupCreateTicket from "components/customer-lookup-detailed/CustomerLookupCreateTicket"
import { CustomerLookupDetailedInformation } from "components/customer-lookup-detailed/CustomerLookupDetailedInformation"
import CustomerLookupElectricityConsumptionAndPaymentCard from "components/customer-lookup-detailed/CustomerLookupElectricityConsumptionAndPaymentCard"
import CustomerLookupReferenceInformationCard from "components/customer-lookup-detailed/CustomerLookupReferenceInformationCard"
import CustomerLookupRequestHistoryCard from "components/customer-lookup-detailed/CustomerLookupRequestHistoryCard"
import { useParams } from "react-router-dom"

const CustomerLookupDetailedPage = () => {
    const {customerId } = useParams<{ customerId: string}>();
    return (
        <div className="flex">
            {/* <div className="flex item items-center">
                <ArrowLeftIcon width={12} height={15} />
                <Breadcrumb separator='\' >
                    <Breadcrumb.Item className="underline text-xs text-[#181818] font-semibold">Tra cứu khách hàng</Breadcrumb.Item>
                    <Breadcrumb.Item className="text-xs">
                        <a className="text-[#181818] font-semibold" href="">PE00000000000</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className="mr-5">
                <CustomerLookupDetailedInformation customerId={Number(customerId)} />
            </div>
            <div className="flex flex-col">
                <CustomerLookupRequestHistoryCard />
                <CustomerLookupReferenceInformationCard />
                <CustomerLookupElectricityConsumptionAndPaymentCard />
            </div>
            <div className="flex flex-col ml-5">
                <CustomerLookupCreateTicket />
                <CustomerLookupClock />
                <CustomerLookupCalendar />
            </div>
        </div>
    )
}
export default CustomerLookupDetailedPage