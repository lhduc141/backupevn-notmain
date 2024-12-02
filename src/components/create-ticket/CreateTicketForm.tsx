import { createTicketMessages } from 'messages/create-ticket.messages'
import { Button, Checkbox, CheckboxProps, Divider, Form, FormInstance, Input, Radio, RadioChangeEvent, Select, Space, Typography,Upload, UploadFile } from 'antd'
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message'
import { ArrowDownIcon, DashIcon, TrashBinIcon, UploadIcon } from 'assets'
import { DatePicker, FormItem, message} from 'components/common';
import TextArea from 'antd/es/input/TextArea'

import { validateMessages } from 'messages';

import { ServerUploadFile } from 'components/common/upload/ServerUpload';
import { createTicketValidationRules } from 'utils/validation-rules/create-ticket.validation-rules';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateTicketMutation, useGetTicketDetailQuery } from 'services/tickets';
import { CreateTicketDto } from 'types/dto/ticket';
import { useUploadForm } from 'hooks';
import { SelectServiceTypes } from 'components/service-types';
import { SelectChannels } from 'components/channels';

export type CreateTicketFormProps = {
    onChangeLoading?: (value: boolean) => void;
    onSubmitSuccess?: () => void;
    ticketId?: number;
}

export type CreateTicketFormRefProps = {
    form: FormInstance<CreateTicketFormType>;
    isLoading: boolean;
}

export type CreateTicketFormType = Omit<CreateTicketDto, 'upLoad'> & {
    upLoad: ServerUploadFile[];
}



const CreateTicketForm = forwardRef<CreateTicketFormRefProps, CreateTicketFormProps>(({ onChangeLoading, onSubmitSuccess, ticketId}, ref) => {
    useImperativeHandle(ref, () => ({
        form: form,
        isLoading: isLoadingCreate
    }));
    const {handleMultiUpload: handleUpload} = useUploadForm();

    const [onCreate, { isLoading: isLoadingCreate }] = useCreateTicketMutation();

    const [form] = Form.useForm<CreateTicketFormType>();
    const upLoad = Form.useWatch('upLoad', form);
    const { data: createTicket, isLoading: isLoadingDetail } = useGetTicketDetailQuery(
        ticketId!,
        {
            skip: !ticketId,
            refetchOnMountOrArgChange: true
        }
    );

    useEffect(() => {
        if(createTicket && ticketId) {
            form.setFieldsValue({
                ...createTicket.data,
                upLoad: createTicket.data.upLoad
                    ? [
                        {
                            uid: createTicket.data.upLoad,
                            fileId: createTicket.data.upLoad
                        }
                      ]
                    : []
            });
        }
    }, [createTicket, ticketId]);

    useEffect(() => {
        if (onChangeLoading) {
            onChangeLoading(isLoadingCreate);
        }
    }, [onChangeLoading, isLoadingCreate]);

    const handlePersonTypeChange = (e: RadioChangeEvent) => {
        console.log('Person Type:', e.target.value);
    }

    const onCheckbox :CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleSelect = (value: string) => {
        console.log(`select ${value}`);
    }

    const onFinish = async ({...values}: CreateTicketFormType) => {
        const uploadFile = await handleUpload(
            values.upLoad,
            createTicket?.data.upLoad ? [createTicket?.data.upLoad] : []
        );
        const data: CreateTicketDto = {
            ...values,
            upLoad: uploadFile[0] || undefined
        };
        onCreate(data)
            .unwrap()
            .then((rs) => {
                message.systemSuccess(typeof rs.message === 'string'
                                            ? rs.message
                                            : JSON.stringify(rs.message)  || 'Phiếu yêu cầu mới đã được tạo thành công!'
                );
                onSubmitSuccess?.();
            })
            .catch((error) => {
                message.error(typeof error.message === 'string'
                                ? error.message  
                                : JSON.stringify(error.message) || 'Có lỗi xảy ra khi tạo phiếu yêu cầu!'
                );
            });
        
    };
    
    const normFile = ({ fileList }: { fileList: UploadFile[] }) => fileList;
    

    return (
        <div className='w-[668px] h-[1000px] bg-[#F5F5F7] bg-no-repeat bg-clip-padding] rounded-r-none rounded-l-[12px] overflow-y-scroll'>
            <div className='flex flex-row mx-6 mt-8'>
                <div className='flex items-baseline'>
                    <Typography.Text className='font-semibold text-[24px]/[32px] text-left text-nowrap tracking-normal text-[#141414] opacity-100'>{customerLookupDetailedMessages.requestForElectricitySupply}</Typography.Text>
                    <ArrowDownIcon className='w-[16px] h-[16px] ml-2 bg-no-repeat bg-clip-padding opacity-100'/>
                </div>
                <Button shape='circle' className='ml-[324px] hover:bg-[#EBEBED] bg-[#F5F5F7] border-[#F5F5F7] bg-transparent bg-no-repeat bg-clip-padding opacity-100' icon={<DashIcon className='w-4 h-4' />}></Button>
            </div>
            
            <Form
                className='mx-6 mt-8'
                form={form}
                layout='vertical'
                initialValues={{ personType: 'relative'}}
                onFinish={onFinish}
                validateMessages={validateMessages}
                scrollToFirstError={{ behavior: 'smooth' , block: 'start'}}
            >
                <FormItem
                    name="personType"
                    label={
                        <Typography.Text className='font-semibold text-left text-[18px]/[22px] tracking-normal text-[#141414] opacity-100'>{createTicketMessages.requesterInformation}</Typography.Text>
                    }
                >
                    <Radio.Group className='mt-3 flex flex-wrap justify-items-stretch' onChange={handlePersonTypeChange}>
                        <Radio  className='text-left text-[16px]/[19px] tracking-normal text-[#141414] opacity-100' value={createTicketMessages.relatives}>{createTicketMessages.relatives}</Radio>
                        <Radio  className='ml-[130px] text-left text-[16px]/[19px] tracking-normal text-[#141414] opacity-100' value={createTicketMessages.notProvide}>{createTicketMessages.notProvide}</Radio>
                        <Radio  className='mt-4 text-left text-[16px]/[19px] tracking-normal text-[#141414] opacity-100' value={createTicketMessages.rightfullOwner}>{createTicketMessages.rightfullOwner}</Radio>
                    </Radio.Group>
                </FormItem>

                <div className='flex'>
                    <FormItem.FloatLabel<CreateTicketFormType>
                        name="customerRequestName"
                        label={createTicketMessages.fullName}
                        rules={createTicketValidationRules.customerRequestName}
                    >
                        <Input className='w-[300px]'/>
                    </FormItem.FloatLabel>

                    <FormItem.FloatLabel<CreateTicketFormType>
                        className='ml-5'
                        name="customerRequestPhoneNumber"
                        label={createTicketMessages.phoneNumber}
                        rules={createTicketValidationRules.customerRequestPhoneNumber}
                    >
                        <Input className='w-[300px]'/>
                    </FormItem.FloatLabel>
                </div>
                <Space.Compact className='w-[620px]' direction='vertical'>
                    <FormItem.FloatLabel<CreateTicketFormType>
                        className=''
                        name="customerRequestAddress"
                        label={createTicketMessages.address}
                        rules={createTicketValidationRules.customerRequestAddress}
                    >
                        <Input className=''/>
                    </FormItem.FloatLabel>
                    
                    <Space.Compact className='w-[619px]'>
                        <FormItem.FloatLabel
                            style={{width: '50%'}}
                            className=''
                            name="ward"
                            label={createTicketMessages.ward}
                        >
                            <Input/>
                        </FormItem.FloatLabel>
                        <FormItem.FloatLabel
                            style={{width: '50%'}}
                            className=''
                            name="district"
                            label={createTicketMessages.district}
                        >
                            <Input/>
                        </FormItem.FloatLabel>
                    </Space.Compact>
                </Space.Compact>

                <FormItem 
                    className='pt-1'
                    name='newAddress'
                    valuePropName='checked'
                >
                    <Checkbox onChange={onCheckbox}><Typography.Text className='text-left text-[14px]/[19px] tracking-normal text-[#141414] opacity-100'>{createTicketMessages.newAddress}</Typography.Text></Checkbox>    
                </FormItem>

                <Space.Compact className='w-[620px]' direction='vertical'>
                    <Space.Compact className='w-[619px]'>
                        <FormItem.FloatLabel
                            style={{width: '50%'}}
                            className=''
                            name="citizenIdNumber"
                            label={createTicketMessages.citizenIdNumber}
                        >
                            <Input />
                        </FormItem.FloatLabel>
                        <FormItem.FloatLabel
                            style={{width: '50%'}}
                            className=''
                            name="issueDate"
                            label={`${createTicketMessages.issueDate}(dd/mm/yyyy)`}
                        >
                            <Input />
                        </FormItem.FloatLabel>
                    </Space.Compact>

                    <FormItem.FloatLabel
                        className=''
                        name="placeOfIssue"
                        label={createTicketMessages.placeOfIssue}
                    >
                        <Input className=''/>
                    </FormItem.FloatLabel>
                </Space.Compact>

                <Divider style={{borderColor:'#D4D8DE', borderWidth:'1px'}} className='w-full' type='horizontal'></Divider>

                <FormItem<CreateTicketFormType>
                    name='channelId'
                    rules={createTicketValidationRules.channelId}
                >
                    {/* <Select
                        suffixIcon={<ArrowDownIcon className='w-[10px]'></ArrowDownIcon>}
                        placeholder={<Typography.Text className='text-left text-[16px]/[22px] tracking-normal text-[#141414] opacity-100'>{createTicketMessages.selectReceptionChannel}</Typography.Text>}
                        className='w-[310px] h-[56px]'
                        onChange={handleSelect}
                        options={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' }
                        ]}
                    ></Select> */}
                    <SelectChannels className='w-[310px] h-[56px]'/>
                </FormItem>

                <Divider style={{borderColor:'#D4D8DE', borderWidth:'1px'}} className='w-full' type='horizontal'></Divider>

                <Typography.Text className='mt-8 text-left font-semibold text-[18px]/[22px] tracking-normal text-[#141414] opacity-100'>{createTicketMessages.requestInformation}</Typography.Text>

                <div className='flex mt-5'>
                    <FormItem<CreateTicketFormType>
                        name='serviceTypeId'
                        rules={createTicketValidationRules.serviceTypeId}
                    >
                        {/* <Select
                            suffixIcon={<ArrowDownIcon className='w-[10px]'></ArrowDownIcon>}
                            placeholder={<Typography.Text className='text-left text-[16px]/[22px] tracking-normal text-[#141414] opacity-100'>{createTicketMessages.selectServiceType}<span className='text-[#D1131D]'>*</span></Typography.Text>}
                            className='w-[302px] h-[56px]'
                            onChange={handleSelect}
                            options={[
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' }
                            ]}
                        ></Select> */}
                        <SelectServiceTypes className='w-[302px] h-[56px]'/>
                    </FormItem>
                    <FormItem.FloatLabel<CreateTicketFormType>
                        className='ml-4 w-[302px] h-[56px]'
                        name='appointmentDate'
                        label={createTicketMessages.appointmentDate}
                        rules={createTicketValidationRules.appointmentDate}
                    >
                        <DatePicker  className='w-full'/>
                    </FormItem.FloatLabel>
                </div>
                <div className='flex align-baseline gap-80'>
                    <Typography.Text className='text-left text-[16px]/[22px] tracking-normal opacity-100 text-nowrap'>{createTicketMessages.requestContent}<span className='text-[#D1131D]'>*</span></Typography.Text>
                    <div className='flex gap-2'>
                        <Typography.Link className='text-left text-[14px]/[19px] tracking-normal text-[#1564E8] opacity-100 text-nowrap'>{createTicketMessages.sample1}</Typography.Link>
                        <Typography.Link className='text-left text-[14px]/[19px] tracking-normal text-[#1564E8] opacity-100 text-nowrap'>{createTicketMessages.sample2}</Typography.Link>
                        <Typography.Link className='text-left text-[14px]/[19px] tracking-normal text-[#1564E8] opacity-100 text-nowrap'>{createTicketMessages.sample3}</Typography.Link>
                    </div>
                </div>
                <FormItem<CreateTicketFormType> className='pt-2'
                    name='content'
                    rules={createTicketValidationRules.content}
                >
                    <TextArea autoSize className=' h-[106px]'></TextArea>
                </FormItem>

                <FormItem<CreateTicketFormType>
                    className='mt-5 w-[620px]'
                    valuePropName='fileList'
                    name='upLoad'
                    getValueFromEvent={normFile}
                >
                    <Upload style={{backgroundColor:'#FFFFFF'}} className='' listType='text' type='drag'>
                        <div className='flex justify-center gap-2 align-baseline'>
                            <UploadIcon></UploadIcon>
                            <Typography.Text className='text-center text-[16px]/[19px] tracking-normal text-[#141414]'>{createTicketMessages.dragAndDropFilesToUploadOr} <Typography.Link className='text-[#1564E8] text-center font-semibold tracking-normal'>{createTicketMessages.selectFromDevice}</Typography.Link></Typography.Text>
                        </div>
                    </Upload>
                </FormItem>

                <Divider style={{borderColor:'#D4D8DE', borderWidth:'1px'}} className='w-full' type='horizontal'></Divider>

                <FormItem 
                    className='mt-7'
                    name='notMessageSendingRequest'
                    valuePropName='checked'
                >
                    <Checkbox onChange={onCheckbox}>{createTicketMessages.notMessageSendingRequest}</Checkbox>
                </FormItem>

                <FormItem 
                    className='mt-1'
                    name='outgoingCall'
                    valuePropName='checked'
                >
                    <Checkbox onChange={onCheckbox}>{createTicketMessages.outgoingCall}</Checkbox>
                </FormItem>
            

            <Divider   className='w-full mt-[140px]' type='horizontal'></Divider>
            <FormItem className='my-6 flex items-baseline'>
                <Button shape='circle' className='ml-8 hover:bg-[#EBEBED] bg-[#F5F5F7] border-[#F5F5F7] bg-transparent bg-no-repeat bg-clip-padding opacity-100' icon={<TrashBinIcon className='w-4 h-4'/>}></Button>
                <Button htmlType='submit' className='ml-[108px]' type='primary'><Typography.Text className='text-left font-semibold text-[16px]/[20px] tracking-normal text-white opacity-100'>{createTicketMessages.forwardForProcessing}</Typography.Text></Button>
                <Button htmlType='submit' className='ml-3' type='primary' danger><Typography.Text className='text-left font-semibold text-[16px]/[20px] tracking-normal text-white opacity-100'>{createTicketMessages.redirectToTheCenter}</Typography.Text></Button>
            </FormItem>
        </Form>
        </div>
    )
});

export default CreateTicketForm