
import { Card } from 'antd';
import CustomerLookupForm from 'components/customer-lookup/CustomerLookupForm';
import CustomerLookupInput from 'components/customer-lookup/CustomerLookupInput';
import CustomerLookupTab from 'components/customer-lookup/CustomerLookupTab';
import React, { useState } from 'react';
const CustomerLookupPage: React.FC = () => {
    const [searchCriteria, setSearchCriteria] = useState({});

    const handleSearch = (criteria: any) => {
        setSearchCriteria(criteria);
    }
    return (
        <div className='flex items-center justify-center '>
            <Card className='mr-5 bg-[#EBEBED] h-[980px] w-[420px] card-body-px5-override'>
                <CustomerLookupForm onSearch={handleSearch}/>
            </Card>
            <div>
                <CustomerLookupInput />
                <CustomerLookupTab searchCriteria={searchCriteria} />
            </div>

        </div>
    );
};

export default CustomerLookupPage;
