import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    Typography,
} from 'antd';
import { CheckIcon, CrossIcon, PlusIcon, SearchIcon } from 'assets';
import { useDistrictsPaging } from 'hooks/administrative-units';
import { useCustomersPaging } from 'hooks/customer-lookup';
import { values } from 'lodash';
import { customerLookupMessages } from 'messages/customer-lookup.message';
import { useState } from 'react';
import { FindAllCustomersDto } from 'types/dto/customer-lookup/find-all-customers.dto';
type SizeType = Parameters<typeof Form>[0]['size'];

const CustomerLookupForm = ({ onSearch} : { onSearch: (criteria: any) => void}) => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    
    const states = [
        { index: 0, label: 'Default', color: 'text-[#181818]', icon: null, isDisabled: false },
        { index: 1, label: 'Selected', color: 'text-[#06A77D]', icon: <CheckIcon className='ml-[5px] text-sm' />, isDisabled: false },
        { index: 2, label: 'Unselected', color: 'text-[#868D97]', icon: <CrossIcon className='ml-[5px] text-sm' />, isDisabled: true },
    ];
    const otherSelectOptions = [
        { value: 'customerCode', label: customerLookupMessages.customerCode }
    ]
    const {districts} = useDistrictsPaging({...onSearch})
    const wardOptions = [
        { value: 'sampleValue', label: 'Linh Tây' }
    ]
    // const [currentStateIndex, setCurrentStateIndex] = useState(0);

    // const currentState = states[currentStateIndex];


    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
 

    const [formFields, setFormFields] = useState([
        {
            name: 'customerName',
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Form.Item
                    name={'customerName'}
                    key={index}
                    label={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => cycleState(index)}>
                            <Typography.Text className={`${currentState.color} text-sm font-semibold`}>
                                {customerLookupMessages.customerName}
                            </Typography.Text>
                            {currentState.icon}
                        </div>
                    }
                >
                    <Input
                        onBlur={() => handleOutOfFocus(index)}
                        onFocus={() => handleFocus(index)}
                        value={value}
                        onChange={(e) => (e.target.value)}
                        disabled={currentState.isDisabled}
                    />
                </Form.Item>
            ),
        },
        {
            name: 'customerAddress',
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Form.Item className='mt-4' name={'customerAddress'} key={index} label={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => cycleState(index)}>
                        <Typography.Text className={`${currentState.color} text-sm font-semibold`}>
                            {customerLookupMessages.customerAddress}
                        </Typography.Text>
                        {currentState.icon}
                    </div>}>
                    <Input
                        onBlur={() => handleOutOfFocus(index)}
                        onFocus={() => handleFocus(index)}
                        value={value}
                        onChange={(e) => (e.target.value)}
                        disabled={currentState.isDisabled}
                    />
                </Form.Item>
            ),
        },
        {
            name: 'customerDistrictAndWard',
            value: [null, null],
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Row className='mt-4'  key={index} gutter={8}>
                    <Col span={12}>
                        <Form.Item   name={'customerDistrict'} label={
                            <div className='flex' onClick={() => cycleState(index)}>
                                <Typography.Text className={`${currentState.color} text-sm font-semibold text-nowrap`}>
                                    {customerLookupMessages.district}, {customerLookupMessages.ward}
                                </Typography.Text>
                                {currentState.icon}
                            </div>
                        } labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Select
                                onChange={(value) => handleChange(value, 0)}
                                onBlur={() => handleOutOfFocus(index)}
                                onFocus={() => handleFocus(index)}
                                disabled={currentState.isDisabled}
                                placeholder="Chọn Quận/Huyện"
                                options={[
                                    ...(districts?.map((itm) => ({
                                        label: itm.administrativeUnitName,
                                        value: itm.administrativeUnitId
                                    })) || [])
                                ]}
                                allowClear
                            >
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item  name={'customerWard'} label=" " colon={false} labelCol={{ span: 2 }} wrapperCol={{ span: 24 }}>
                            <Select
                                onChange={(value) => handleChange(value, 1)}
                                onBlur={() => handleOutOfFocus(index)}
                                onFocus={() => handleFocus(index)}
                                disabled={currentState.isDisabled}
                                placeholder="Chọn Phường/Xã"
                                options={wardOptions}
                                allowClear
                            >
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            ),
        },
        {
            name: 'customerPhone',
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Form.Item className='mt-1' name={'customerPhone'} key={index} label={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => cycleState(index)}>
                        <Typography.Text className={`${currentState.color} text-sm font-semibold`}>
                            {customerLookupMessages.customerPhone}
                        </Typography.Text>
                        {currentState.icon}
                    </div>}>
                    <Input
                        onBlur={() => handleOutOfFocus(index)}
                        onFocus={() => handleFocus(index)}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={currentState.isDisabled}
                    />
                </Form.Item>
            ),
        },
        {
            name: 'customerRequestCode',
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Form.Item className='mt-4' name={'customerRequestCode'} key={index} label={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => cycleState(index)}>
                        <Typography.Text className={`${currentState.color} text-sm font-semibold`}>
                            {customerLookupMessages.requestCode}
                        </Typography.Text>
                        {currentState.icon}
                    </div>}>
                    <Input
                        onBlur={() => handleOutOfFocus(index)}
                        onFocus={() => handleFocus(index)}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={currentState.isDisabled}
                    />
                </Form.Item>
            ),
        },
        {
            name: 'other',
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Row className='mt-4' key={index} gutter={16}>
                    <Col className='pr-1' span={12}>
                        <Form.Item label={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => cycleState(index)}>
                            <Typography.Text className={`${currentState.color} text-sm font-semibold`}>
                                {customerLookupMessages.other}
                            </Typography.Text>
                            {currentState.icon}
                        </div>} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Input
                                placeholder='PE'
                                onBlur={() => handleOutOfFocus(index)}
                                onFocus={() => handleFocus(index)}
                                value={value}
                                onChange={(e) => (e.target.value)}
                                disabled={currentState.isDisabled}
                            />
                        </Form.Item>
                    </Col>
                    <Col className='pl-1' span={12}>
                        <Form.Item className='' name={'other'} label=" " labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
                            <Select
                                defaultValue={['customerCode']}
                                onBlur={() => handleOutOfFocus(index)}
                                onFocus={() => handleFocus(index)}
                                placeholder="Mã khách hàng"
                                disabled={currentState.isDisabled}
                                options={otherSelectOptions}
                            >
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            ),
        },
        {
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Form.Item className='mt-5' key={index}>
                    <Button htmlType='submit'  icon={<SearchIcon />} className='w-[380px] bg-[#1564E8] text-[#FFFFFF] font-semibold'>{customerLookupMessages.lookup}</Button>
                </Form.Item>
            ),
        },
        {
            value: null,
            currentStateIndex: 0,
            components: (currentState: any, value: any, handleChange: any, cycleState: any, index: any) => (
                <Form.Item key={index}>
                    <Button icon={<PlusIcon />} className='w-[380px] bg-[#06A77D] text-[#FFFFFF] font-semibold'>{customerLookupMessages.newRegister}</Button>
                </Form.Item>
            ),
        },
    ]);

    const cycleState = (index: any) => {
        const newFields = [...formFields];
        if (newFields[index].value) {
            newFields[index].currentStateIndex = newFields[index].currentStateIndex === 1 ? 2 : 1;
        }
        else if (!newFields[index].value) {
            newFields[index].currentStateIndex = 0
        }
        setFormFields(newFields);
    };

    const handleFocus = (index: any) => {
        const newFields = [...formFields];
        newFields[index].currentStateIndex = 1
        setFormFields(newFields);
    };

    const handleOutOfFocus = (index: any) => {
        const newFields = [...formFields];
        if (!newFields[index].value) {
            newFields[index].currentStateIndex = 0
        }
        else if (newFields[index].value && newFields[index]?.value?.length) {
            const nullElements = newFields[index]?.value?.filter(element => element !== null);
            if (nullElements && nullElements.length === 0) {
                newFields[index].currentStateIndex = 0
            }
        }
        setFormFields(newFields);
    };



    const handleChange = (index: any, newValue: any, fieldValueIndex?: number) => {
        
        const newFields = [...formFields];
        newFields[index].value = newValue;
        
        const inputValue = newFields[index].value

        

        // Check if the field and its value are properly defined
        if (newFields[index] && Array.isArray(inputValue) && fieldValueIndex !== undefined) {
            // Update the appropriate value in the array (e.g., district or ward)

            if (inputValue) {
                inputValue[fieldValueIndex] = newValue;
            }
        } else {
            // For non-array values (e.g., single input fields)
            newFields[index].value = newValue;
        }

        // Update the form field states
        setFormFields(newFields);

        // Reset the state index if no value is provided
        if (inputValue) {
            if (!newFields[index].value || (Array.isArray(newFields[index].value) && !inputValue.some(val => val))) {
                newFields[index].currentStateIndex = 0; // Reset to default state if no value is present
            }
        }
    };
    const onFinish = (value: any) => {

        const allValues = form.getFieldsValue();

        const filteredValues: { [key: string]: any } = {}; // Define an object to hold filtered values

        form.validateFields().then((values) => {
            console.log("Form values:", values);  // Logs form values upon submit
        }).catch((error) => {
            console.error("Validation error:", error);
        });

        // Iterate through formFields to filter out disabled fields
        formFields.forEach(field => {
            // Check if the field is not disabled (currentStateIndex !== 2)
            if (field.currentStateIndex !== 2 && field.name) {
                // Handle cases where the field is a group of values (e.g., customerDistrictAndWard)
                if (Array.isArray(field.value)) {
                    field.value.forEach((subValue: any, index: number) => {
                        // Extract values for each sub-field (e.g., customerDistrict, customerWard)
                        const fieldName = field.name === 'customerDistrictAndWard' ?
                            (index === 0 ? 'customerDistrict' : 'customerWard') : field.name;

                        filteredValues[fieldName] = value[fieldName];
                    });
                } else {
                    // For single field components, directly assign the value
                    filteredValues[field.name] = value[field.name];
                }
            }
        });

        // Now, filteredValues contains only the values of enabled fields
        console.log('Filtered Values:', filteredValues); // You can log or use filteredValues as needed
        console.log('Search Triggered');
        onSearch(filteredValues);
    }
    const [form] = Form.useForm();
    
    return (
        
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            className='text-sm-label text-sm-select-placeholder'
        >
            {formFields.map((field, index) => {
                const currentState = states[field.currentStateIndex];
                return field.components(
                    currentState,
                    field.value,
                    (newValue: any, fieldIndex: any) => handleChange(index, newValue, fieldIndex),
                    cycleState,  // Pass the cycleState function
                    index        // Pass the index
                );
            })}
            
        </Form >
    );
    
}


export default CustomerLookupForm;
